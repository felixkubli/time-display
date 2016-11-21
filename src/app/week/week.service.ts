import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Week } from './week.model';
import * as moment from 'moment';

import 'rxjs/add/operator/map';

@Injectable()
export class WeekService {
  mock: string = 'assets/week-time.json';
  url: string = '';
  date: string;

  constructor(private http: Http) { }

  getEntrys() {
    this.date = moment(new Date()).format('YYYY-MM-DD');
    this.setUrl();

    return this.http.get(this.mock)
      .map(response => new Week().deserialize(response.json()));
    // return this.http.get(this.url, { headers: this.getHeaders() })
    //   .map(response => new Week().deserialize(response.json()));
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + 'api_token'));
    return headers;
  }

  private setUrl(): string {
    return this.url = 'https://toggl.com/reports/api/v2/weekly?user_agent=time_display&since=' +
      this.date + '&workspace_id=' +
      localStorage.getItem('workspace_id') + '';
  }
}
