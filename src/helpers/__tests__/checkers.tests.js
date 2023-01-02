import { isValidPostcode } from '../checkers';

describe('isValidPostcode', () => {
  test('check if code is formatted correctly', () => {
    expect(isValidPostcode('AA9A 9AA')).toBe(true);
    expect(isValidPostcode('A9A 9AA')).toBe(true);
    expect(isValidPostcode('A9 9AA')).toBe(true);
    expect(isValidPostcode('A99 9AA')).toBe(true);
    expect(isValidPostcode('AA9 9AA')).toBe(true);
    expect(isValidPostcode('AA99 9AA')).toBe(true);
  });

  test('check if code is formatted incorrectly', () => {
    expect(isValidPostcode('123 456')).toBe(false);
    expect(isValidPostcode('ND1 TTT')).toBe(false);
    expect(isValidPostcode('AAAAAA')).toBe(false);
  });
});
