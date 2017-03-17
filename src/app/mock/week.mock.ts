import { Week } from '../week/week.model';

export class WeekMock {
  data: any = {
    total_grand: 141907000,
    total_billable: null, total_currencies: [{ currency: null, amount: null }], data: [{
      title: { client: null, project: null, color: 0, hex_color: null },
      pid: null,
      totals: [29522000, 32327000, null, null, 32087000, 19624000, 28347000, 141907000],
      details: [{
        uid: 2383490,
        title: { user: 'Felix Kubli' },
        totals: [29522000, 32327000, 32087000, 19624000, 28347000, null, null, 141907000]
      }]
    }],
    week_totals: [29522000, 32327000, 32087000, 19624000, 28347000, null, null, 141907000]
  };

  getEntrys() {
    return new Week().deserialize(this.data);
  }
}
