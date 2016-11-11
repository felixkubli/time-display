import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TimeToday } from './time_today.model';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class TimeTodayService {
  url: string = 'https://toggl.com/reports/api/v2/summary?user_agent=time_display&since=2016-11-11&until=2016-11-11&workspace_id=1121133';
  token: string = '*user-token*';

  mock: string = 'assets/time-today.json';

  constructor(private http: Http) { }

  getEntries(): Observable<TimeToday> {
    return this.http.get(this.mock) // this is the mock request
      .map(response => new TimeToday().deserialize(response.json()));
    // return this.http.get(this.url, {headers: this.getHeaders()})
    //   .map(response => new TimeToday().deserialize(response.json()));
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(this.token + ':' + 'api_token'));
    return headers;
  }
}
