import {Injectable} from '@angular/core';

@Injectable()
export class TimeToday {
  goal: number = 8.4;
  tickets: any[] = [{
    message: '6124 Investment Time',
    duration: 2.4
  }, {
    message: '7000 Test Entry',
    duration: 3
  }];
}
