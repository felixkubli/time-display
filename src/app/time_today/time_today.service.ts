import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { TimeToday } from './time_today.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class TimeTodayService {

  constructor(private http: Http) { }

  getEntries(): Observable<TimeToday[]> {
    return this.http.get('assets/time-today.json')
      .map(response => <TimeToday[]>response.json().timeToday);
  }
}
