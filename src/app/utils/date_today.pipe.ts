import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateToday'})
export class DateTodayPipe implements PipeTransform {
	transform(value: Date) {
    if (this.isSameDate(value, new Date())) {
      return 'today';
    } else if (value) {
			return moment(value).format('(YYYY-MM-DD)');
		} else {
			return 'today';
		}
	}

	isSameDate(start: Date, end: Date) {
    let startMoment = moment(start).clone().startOf('day');
    let endMoment = moment(end).clone().startOf('day');
    return moment(startMoment).diff(endMoment) === 0;
  }
}
