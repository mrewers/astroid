import randomNumberArray from '../randomizer';

describe('Random array generator', () => {
  it('creates an array of number with the specified length', () => {
    const arrLength = 10;
    const maxValue = 100;

    const arr = randomNumberArray(arrLength, maxValue);

    expect(arr).toHaveLength(arrLength);
    arr.forEach(num => {
      expect(typeof num).toStrictEqual('number');
      expect(num < maxValue).toStrictEqual(true);
    });
  });
});
