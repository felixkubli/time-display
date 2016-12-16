
import { NumberDiffPipe } from './number_diff.pipe';

describe('NumberDiffPipe', () => {
  let numberDiff: NumberDiffPipe;
  beforeEach(() => {
    numberDiff = new NumberDiffPipe();
  });

  it('transforms positive value', () => {
    expect(numberDiff.transform(5)).toEqual('+5');
  });

  it('transforms negative value', () => {
    expect(numberDiff.transform(-5)).toEqual('-5');
  });

  it('returns default', () => {
    expect(numberDiff.transform(undefined)).toEqual('0');
  });
});
