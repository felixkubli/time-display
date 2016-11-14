import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TimeToday } from './time_today.model';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class TimeTodayService {
  token: string = 'user-token';
  today: string = '';
  url: string = '';
  workspace_id: string = '';

  mock: string = 'assets/time-today.json';

  constructor(private http: Http) {
    this.workspace_id = localStorage.getItem('workspace_id');
    this.token = localStorage.getItem('token');
  }

  getEntries(): Observable<TimeToday> {
    this.today = new Date().toJSON().slice(0, 10);
    this.setUrl();
    // return this.http.get(this.mock) // this is the mock request
    //   .map(response => new TimeToday().deserialize(response.json()));
    return this.http.get(this.url, {headers: this.getHeaders()})
      .map(response => new TimeToday().deserialize(response.json()));
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(this.token + ':' + 'api_token'));
    return headers;
  }

  private setUrl(): string {
    return this.url = 'https://toggl.com/reports/api/v2/summary?user_agent=time_display&since=' +
      this.today + '&until=' +
      this.today + '&workspace_id=' +
      this.workspace_id + '';
  }
}
