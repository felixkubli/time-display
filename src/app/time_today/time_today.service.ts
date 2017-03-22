import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TimeToday } from './time_today.model';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import 'rxjs/add/operator/map';

@Injectable()
export class TimeTodayService {
  token: string = 'user-token';
  today: string;
  url: string = '';
  workspace_id: string = '';

  mock: string = 'assets/time-today.json';

  constructor(private http: Http) { }

  getEntries(date?: Date): Observable<TimeToday> {
    if (!date) {
      date = new Date();
    }
    this.today = moment(date).format('YYYY-MM-DD');

    this.generateUrl();
    // return this.http.get(this.mock) // this is the mock request
    //   .map(response => new TimeToday().deserialize(response.json()));
    return this.http.get(this.url, {headers: this.getHeaders()})
      .map(response => new TimeToday().deserialize(response.json()));
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + 'api_token'));
    return headers;
  }

  private generateUrl(): string {
    return this.url = 'https://toggl.com/reports/api/v2/summary?user_agent=time_display&since=' +
      this.today + '&until=' +
      this.today + '&workspace_id=' +
      localStorage.getItem('workspace_id') + '';
  }
}
