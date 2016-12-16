
import { DateTodayPipe } from './date_today.pipe';

describe('DateTodayPipe', () => {
  let dateToday: DateTodayPipe;
  beforeEach(() => {
    dateToday = new DateTodayPipe();
  });

  it('returns default value', () => {
    expect(dateToday.transform(new Date())).toEqual('today');
  });

  it('returns date as formatted string', () => {
    let date = new Date(2015, 11, 31);
    console.log(date);
    expect(dateToday.transform(date)).toEqual('(2015-12-31)');
  });
});
