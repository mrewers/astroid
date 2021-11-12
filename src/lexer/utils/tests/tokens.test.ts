import generateToken from '../tokens';

describe('The generateToken function', () => {
  const cursor = 0;
  const type = 'TestType';
  const raw = 'test raw value';
  const transform = (val: string): string => val.toUpperCase();

  const expected = {
    type,
    value: 'TEST RAW VALUE',
    start: 0,
    end: 14,
    raw,
  };

  it('returns the expected token', () => {
    const token = generateToken(cursor, type, raw, transform);

    expect(token).toStrictEqual(expected);
  });
});
