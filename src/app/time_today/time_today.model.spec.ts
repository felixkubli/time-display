import { TimeToday } from './time_today.model';

describe('TimeToday', () => {
  let model: TimeToday;

  beforeEach(() => {
    model = new TimeToday();
  });

  describe('millisToHours', () => {
    it('calls method', () => {
      expect(model.millisToHours(3600000)).toBeTruthy();
    });

    it('returns converts millis to Hours', () => {
      expect(model.millisToHours(3600000)).toEqual(1);
    });

    it('returns decimal number', () => {
      expect(model.millisToHours(8280000)).toEqual(2.3);
    });
  });

  describe('deserialize', () => {
    let validParameters
    beforeEach(() => {
      validParameters = {
        total_grand: 23040000,
        data: [
          {
            id: 1,
            time: 23040000,
            items: [
              {
                title: {time_entry: '6124 Investment Time'},
                time: 8640000
              },
              {
                title: {time_entry: '7000 Test Entry'},
                time: 14400000
              }
            ]
          }
        ]
      };
    });

    it('returns instance of an object', () => {
      let value = model.deserialize(validParameters);
      expect(typeof(value)).toEqual('object');
    });

    it('assigns instance variables', () => {
      model.deserialize(validParameters);
      expect(model.total_grand).toEqual(6.4);
      expect(model.data[0].items[0].time).toEqual(2.4);
    });

    it('returns object', () => {
      let object = model.deserialize(validParameters);
      expect(object.total_grand).toEqual(6.4);
      expect(object.data[0].time).toEqual(6.4);
      expect(object.data[0].items[0].time).toEqual(2.4);
      expect(object).toEqual(model);
    });
  });
});
