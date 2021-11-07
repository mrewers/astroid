import tokenize from '../tokenize';

interface IRes {
  readonly type: string;
  readonly value?: boolean | number | string | null;
  raw?: string;
}

const buildResponse = (
  type: string,
  value: boolean | number | string | null,
  raw?: string
): IRes => {
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
  it('returns an empty array if no input is provided', () => {
    const emptyString = tokenize('');

    expect(Array.isArray(emptyString)).toStrictEqual(true);
    expect(emptyString).toHaveLength(0);
  });

  it('ignores whitespace', () => {
    const whitespaceTokens = tokenize('                  ');

    expect(whitespaceTokens).toHaveLength(0);
  });

  it('handles null', () => {
    const nullTokens = tokenize('null');

    expect(nullTokens[0]).toStrictEqual(buildResponse('Literal', null, 'null'));
  });

  it('handles booleans', () => {
    const boolTokens = tokenize('true false');

    expect(boolTokens[0]).toStrictEqual(buildResponse('Literal', true, 'true'));
    expect(boolTokens[1]).toStrictEqual(buildResponse('Literal', false, 'false'));
  });

  it('handles numbers, both single and multiple digits', () => {
    const numbersTokens = tokenize('2 189');

    expect(numbersTokens[0]).toStrictEqual(buildResponse('Literal', 2, '2'));
    expect(numbersTokens[1]).toStrictEqual(buildResponse('Literal', 189, '189'));
  });

  it('handles floats', () => {
    const floatTokens = tokenize('12.34');

    expect(floatTokens[0]).toStrictEqual(buildResponse('Literal', 12.34, '12.34'));
  });

  it('handles identifiers', () => {
    const identifierTokens = tokenize('a xyz');

    expect(identifierTokens[0]).toStrictEqual(buildResponse('Identifier', 'a', 'a'));
    expect(identifierTokens[1]).toStrictEqual(buildResponse('Identifier', 'xyz', 'xyz'));
  });

  it('handles operators', () => {
    const operators = ['+', '-', '*', '/', '%', '!', '&', '|', '>', '<'];

    operators.forEach((opt) => {
      const tokens = tokenize(opt);

      expect(tokens[0]).toStrictEqual(buildResponse('Operator', opt));
    });
  });
});
