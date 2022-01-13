import CHARS from '../constants';

describe('Mapping of letters', () => {
  it('returns the correct encoded value for letters', () => {
    expect(CHARS.get('a')).toStrictEqual('01');
    expect(CHARS.get('o')).toStrictEqual('111');
    expect(CHARS.get('z')).toStrictEqual('1100');
  });
});
