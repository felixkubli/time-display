import { Week } from './week.model';
import {WeekMock} from '../mock/week.mock';


describe('Week Model', () => {
  let model: Week;
  let mock: WeekMock;

  beforeEach(() => {
    model = new Week();
    mock = new WeekMock();
  });

  describe('#millisToHours', () => {
    it('converts millis to Hours', () => {
      expect(model.millisToHours(3600000)).toEqual(1);
    });

    it('returns decimal number', () => {
      expect(model.millisToHours(8280000)).toEqual(2.3);
    });
  });

  describe('#deserialize', () => {
    it('returns data', () => {
      expect(model.deserialize(mock.data)).toBeTruthy();
    });

    it('assigns instance variables', () => {
      model.deserialize(mock.data);
      expect(model.total_grand).toEqual(39.42);
      expect(model.week_totals.length).toBe(7);
    });

    it('returns Week object with values', () => {
      let week = model.deserialize(mock.data);
      expect(week.total_grand).toEqual(39.42);
      expect(week.week_totals.length).toBe(7);
    });

    it('calculates separate week days', () => {
      model.deserialize(mock.data);
      expect(model.week_totals[0]).toEqual(8.2);
      expect(model.week_totals[2]).toEqual(8.91);
      expect(model.week_totals[6]).toBe(null);
    });
  });
});

