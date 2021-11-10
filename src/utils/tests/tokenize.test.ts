import tokenize from '../tokenize';

interface IRes {
  readonly type: string;
  readonly value?: boolean | number | string | null;
  raw?: string;
  bigint?: string;
}

const buildResponse = (
  type: string,
  value: boolean | number | string | null,
  raw?: string,
  bigint?: string
): IRes => {
  const res = {
    type,
    value,
  } as IRes;

  if (typeof raw === 'string') {
    res.raw = raw;
  }

  if (typeof bigint === 'string') {
    res.bigint = bigint;
  }

  return res;
};

describe('The tokenization function', () => {
  it('returns an empty array if no input is provided', () => {
    const emptyString = tokenize('').tokens;

    expect(Array.isArray(emptyString)).toStrictEqual(true);
    expect(emptyString).toHaveLength(0);
  });

  it('ignores whitespace', () => {
    const { tokens: whitespaces } = tokenize('                  ');

    expect(whitespaces).toHaveLength(0);
  });

  it('handles null', () => {
    const { tokens: nulls } = tokenize('null');

    expect(nulls[0]).toStrictEqual(buildResponse('Literal', null, 'null'));
  });

  it('handles booleans', () => {
    const { tokens: bools } = tokenize('true false');

    expect(bools[0]).toStrictEqual(buildResponse('Literal', true, 'true'));
    expect(bools[1]).toStrictEqual(buildResponse('Literal', false, 'false'));
  });

  it('handles numbers, both single and multiple digits', () => {
    const { tokens: numbers } = tokenize('2 189');

    expect(numbers[0]).toStrictEqual(buildResponse('Literal', 2, '2'));
    expect(numbers[1]).toStrictEqual(buildResponse('Literal', 189, '189'));
  });

  it('handles floats', () => {
    const { tokens: floats } = tokenize('12.34');

    expect(floats[0]).toStrictEqual(buildResponse('Literal', 12.34, '12.34'));
  });

  it('handles scientific notation', () => {
    const { tokens: exponents } = tokenize('1e2 2E3');

    expect(exponents[0]).toStrictEqual(buildResponse('Literal', 100, '1e2'));
    expect(exponents[1]).toStrictEqual(buildResponse('Literal', 2000, '2E3'));
  });

  it('handles BigInts', () => {
    const { tokens: bigints } = tokenize('16n');

    expect(bigints[0]).toStrictEqual(buildResponse('Literal', 16, '16n', '16'));
  });

  it('reports number-based errors', () => {
    const { tokens: bigints } = tokenize('16n');

    expect(bigints[0]).toStrictEqual(buildResponse('Literal', 16, '16n', '16'));
  });

  it('handles identifiers', () => {
    const { tokens: identifiers } = tokenize('a xyz _bar $dollar d1g1t');

    expect(identifiers[0]).toStrictEqual(buildResponse('Identifier', 'a', 'a'));
    expect(identifiers[1]).toStrictEqual(buildResponse('Identifier', 'xyz', 'xyz'));
    expect(identifiers[2]).toStrictEqual(buildResponse('Identifier', '_bar', '_bar'));
    expect(identifiers[3]).toStrictEqual(buildResponse('Identifier', '$dollar', '$dollar'));
    expect(identifiers[4]).toStrictEqual(buildResponse('Identifier', 'd1g1t', 'd1g1t'));
  });

  it('handles strings', () => {
    /* eslint-disable quotes, no-useless-escape */
    const { tokens: strings } = tokenize('"double quotes" \'single quotes\' `backticks`');

    // prettier-ignore
    const {tokens: escapes} = tokenize('"quotes with \\\"escape\\\""');

    expect(strings[0]).toStrictEqual(
      buildResponse('Literal', 'double quotes', `\"double quotes\"`)
    );
    expect(strings[1]).toStrictEqual(
      buildResponse('Literal', 'single quotes', `\"single quotes\"`)
    );
    expect(strings[2]).toStrictEqual(buildResponse('Literal', 'backticks', `\"backticks\"`));
    expect(escapes[0]).toStrictEqual(
      buildResponse('Literal', `quotes with \"escape\"`, `"quotes with \\"escape\\\""`)
    );
  });

  it('handles operators', () => {
    const operators = ['+', '-', '*', '/', '%', '!', '&', '|', '>', '<'];

    operators.forEach((opt) => {
      const { tokens } = tokenize(opt);

      expect(tokens[0]).toStrictEqual(buildResponse('Operator', opt));
    });
  });
});
