import tokenize from '../tokenize';

interface IRes {
  readonly type: string;
  readonly value?: number | string;
  raw?: string;
}

const buildResponse = (type: string, value: number | string, raw?: string): IRes => {
  const res = {
    type,
    value,
  } as IRes;

  if (typeof raw === 'string') {
    res.raw = raw;
  }

  return res;
};

describe('The tokenization function', () => {
  it('returns an array', () => {
    const emptyString = tokenize('');

    expect(Array.isArray(emptyString)).toStrictEqual(true);
  });

  it('handles numbers', () => {
    const singleDigit = tokenize('2');
    const multipleDigits = tokenize('189');

    expect(singleDigit[0]).toStrictEqual(buildResponse('Literal', 2, '2'));
    expect(multipleDigits[0]).toStrictEqual(buildResponse('Literal', 189, '189'));
  });

  it('handles identifiers', () => {
    const singleChar = tokenize('a ');
    const multipleChars = tokenize('xyz ');

    expect(singleChar[0]).toStrictEqual(buildResponse('Identifier', 'a', 'a'));
    expect(multipleChars[0]).toStrictEqual(buildResponse('Identifier', 'xyz', 'xyz'));
  });

  it('handles operators', () => {
    const operators = ['+', '-', '*', '/', '%', '!', '&', '|', '>', '<'];

    operators.forEach((opt) => {
      const tokens = tokenize(opt);

      expect(tokens[0]).toStrictEqual(buildResponse('Operator', opt));
    });
  });
});
