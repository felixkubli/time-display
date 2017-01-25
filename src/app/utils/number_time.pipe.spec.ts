import { NumberTimePipe } from './number_time.pipe';

describe('NumberTimePipe', () => {
  let numberTime: NumberTimePipe;
  beforeEach(() => {
    numberTime = new NumberTimePipe();
  });

  it('returns a customized string', () => {
    expect(numberTime.transform(4)).toMatch(/[0-9]h [0-9]min/);
  });

  it('returns hours and minutes', () => {
    expect(numberTime.transform(4.5)).toEqual('4h 30min');
    expect(numberTime.transform(1.25)).toEqual('1h 15min');
  });

  it('responds to negative value', () => {
    expect(numberTime.transform(-2.25)).toEqual('2h 15min');
  });
});
