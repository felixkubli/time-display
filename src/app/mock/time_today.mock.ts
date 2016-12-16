import { TimeToday } from '../time_today/time_today.model';

export class TimeTodayMock {
  data: any = {
    total_grand: 23040000,
    data: [
      {
        id: 1,
        time: 23040000,
        items: [
          {
            title: { time_entry: '6124 Investment Time' },
            time: 8640000
          },
          {
            title: { time_entry: '7000 Test Entry' },
            time: 14400000
          }
        ]
      }
    ]
  };

  getEntrys() {
    return new TimeToday().deserialize(this.data);
  }
}
