import * as _ from 'lodash';

export class TimeToday {
  total_grand: any;
  data: any[];

  deserialize(data: any) {
    this.total_grand = this.millisToHours(data.total_grand);
    this.data = data.data;
    this.data.forEach((entry) => {
      entry.time = this.millisToHours(entry.time);
      entry.items.forEach((item) => {
        item.time = this.millisToHours(item.time);
      });
    });
    return this;
  }

  millisToHours(millis) {
    return _.round(millis / (1000 * 60 * 60), 1);
  }
}
