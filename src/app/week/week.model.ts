import * as _ from 'lodash';

export class Week {
  total_grand: number;
  week_totals: any[];

  deserialize(data: any) {
    this.total_grand = this.millisToHours(data.total_grand);
    this.week_totals = data.week_totals;
    this.week_totals.forEach((total, index, array) => {
      if (total != null) {
        array[index] = this.millisToHours(total);
      }
    });
    this.week_totals.pop();
    return this;
  }

  millisToHours(millis) {
    return _.round(millis / (1000 * 60 * 60), 1);
  }
}

