import tokenize from '../tokenize';
import { OPERATORS } from '../operators';

interface IRes {
  readonly type: string;
  readonly value?: boolean | number | string | null;
  readonly start: number;
  readonly end: number;
  raw?: string;
  bigint?: string;
}

const buildResponse = (
  type: string,
  value: boolean | number | string | null,
  pos: number[],
  raw?: string,
  bigint?: string
): IRes => {
  const res = {
    type,
    value,
    start: pos[0],
    end: pos[1],
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

  it('handles comment', () => {
    const { tokens: block } = tokenize('/* Block comment */');
    const { tokens: line } = tokenize('// Line comment');

    expect(block).toHaveLength(1);
    expect(block[0]).toStrictEqual(buildResponse('BlockComment', ' Block comment ', [0, 19]));

    expect(line).toHaveLength(1);
    expect(line[0]).toStrictEqual(buildResponse('LineComment', ' Line comment', [0, 15]));
  });

  it('handles null', () => {
    const { tokens: nulls } = tokenize('null');

    expect(nulls).toHaveLength(1);
    expect(nulls[0]).toStrictEqual(buildResponse('NullLiteral', null, [0, 4], 'null'));
  });

  it('handles booleans', () => {
    const { tokens: bools } = tokenize('true false');

    expect(bools).toHaveLength(2);
    expect(bools[0]).toStrictEqual(buildResponse('BooleanLiteral', true, [0, 4], 'true'));
    expect(bools[1]).toStrictEqual(buildResponse('BooleanLiteral', false, [5, 10], 'false'));
  });

  it('handles numbers, both single and multiple digits', () => {
    const { tokens: numbers } = tokenize('2 189');

    expect(numbers).toHaveLength(2);
    expect(numbers[0]).toStrictEqual(buildResponse('NumericLiteral', 2, [0, 1], '2'));
    expect(numbers[1]).toStrictEqual(buildResponse('NumericLiteral', 189, [2, 5], '189'));
  });

  it('handles floats', () => {
    const { tokens: floats } = tokenize('12.34');

    expect(floats).toHaveLength(1);
    expect(floats[0]).toStrictEqual(buildResponse('NumericLiteral', 12.34, [0, 5], '12.34'));
  });

  it('handles scientific notation', () => {
    const { tokens: exponents } = tokenize('1e2 2E3');

    expect(exponents).toHaveLength(2);
    expect(exponents[0]).toStrictEqual(buildResponse('NumericLiteral', 100, [0, 3], '1e2'));
    expect(exponents[1]).toStrictEqual(buildResponse('NumericLiteral', 2000, [4, 7], '2E3'));
  });

  it('handles BigInts', () => {
    const { tokens: bigints } = tokenize('16n');

    expect(bigints).toHaveLength(1);
    expect(bigints[0]).toStrictEqual(buildResponse('BigIntLiteral', 16, [0, 3], '16n', '16'));
  });

  it('handles identifiers', () => {
    const { tokens: identifiers } = tokenize('a xyz _bar $dollar d1g1t function');

    expect(identifiers).toHaveLength(6);
    expect(identifiers[0]).toStrictEqual(buildResponse('Identifier', 'a', [0, 1], 'a'));
    expect(identifiers[1]).toStrictEqual(buildResponse('Identifier', 'xyz', [2, 5], 'xyz'));
    expect(identifiers[2]).toStrictEqual(buildResponse('Identifier', '_bar', [6, 10], '_bar'));
    expect(identifiers[3]).toStrictEqual(
      buildResponse('Identifier', '$dollar', [11, 18], '$dollar')
    );
    expect(identifiers[4]).toStrictEqual(buildResponse('Identifier', 'd1g1t', [19, 24], 'd1g1t'));
    expect(identifiers[5]).toStrictEqual(buildResponse('Keyword', 'function', [25, 33]));
  });

  it('handles strings', () => {
    /* eslint-disable quotes, no-useless-escape */
    const { tokens: strings } = tokenize('"double quotes" \'single quotes\' `backticks`');

    // prettier-ignore
    const {tokens: escapes} = tokenize('"quotes with \\\"escape\\\""');

    expect(strings).toHaveLength(3);
    expect(strings[0]).toStrictEqual(
      buildResponse('StringLiteral', 'double quotes', [0, 15], `\"double quotes\"`)
    );
    expect(strings[1]).toStrictEqual(
      buildResponse('StringLiteral', 'single quotes', [16, 31], `'single quotes'`)
    );
    expect(strings[2]).toStrictEqual(
      buildResponse('TemplateLiteral', 'backticks', [32, 43], '`backticks`')
    );

    expect(escapes).toHaveLength(1);
    expect(escapes[0]).toStrictEqual(
      buildResponse(
        'StringLiteral',
        `quotes with \"escape\"`,
        [0, 24],
        `"quotes with \\"escape\\\""`
      )
    );
    /* eslint-enable */
  });

  it('handles parenthetical characters', () => {
    const { tokens: parens } = tokenize('({[]})');

    expect(parens).toHaveLength(6);
    expect(parens[0]).toStrictEqual(buildResponse('OpenParen', '(', [0, 1]));
    expect(parens[1]).toStrictEqual(buildResponse('OpenBrace', '{', [1, 2]));
    expect(parens[2]).toStrictEqual(buildResponse('OpenBracket', '[', [2, 3]));
    expect(parens[3]).toStrictEqual(buildResponse('ClosingBracket', ']', [3, 4]));
    expect(parens[4]).toStrictEqual(buildResponse('ClosingBrace', '}', [4, 5]));
    expect(parens[5]).toStrictEqual(buildResponse('ClosingParen', ')', [5, 6]));
  });

  it('handles operators', () => {
    const filteredByLength = [];

    // Filter all operators into groups based on the number of characters per operator.
    for (let i = 1; i < 5; i++) {
      const arr = OPERATORS.filter(op => op.length === i);

      filteredByLength.push(arr);
    }

    // Loop through the list of length-based operator groups.
    filteredByLength.forEach((group, idx) => {
      // The minimum length of an operator is 1.
      const end = idx + 1;

      // Loop through each operator in the current group.
      group.forEach(item => {
        const { tokens } = tokenize(item);

        expect(tokens[0]).toStrictEqual(buildResponse('Operator', item, [0, end]));
      });
    });
  });

  it('bubbles up errors from type operations', () => {
    const { error } = tokenize('2.1n');

    expect(error).toStrictEqual('Invalid BigInt Literal');
  });
});
