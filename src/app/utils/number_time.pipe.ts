import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'numberTime'})
export class NumberTimePipe implements PipeTransform {
  transform(value: number): any {
    value = Math.abs(value) || 0;
    let hour = Math.floor(value);
    let decimal = value % 1;

    return hour + 'h ' + _.round(decimal * 60) + 'min';
  }
}
