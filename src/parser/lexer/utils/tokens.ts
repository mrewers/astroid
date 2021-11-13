import type { IToken } from '../tokenize';

const PAREN_TYPES = [
  'OpenParen',
  'ClosingParen',
  'OpenBracket',
  'ClosingBracket',
  'OpenBrace',
  'ClosingBrace',
];

// Token types that should not include a raw value.
const OMIT_RAW = ['BlockComment', 'Keyword', 'LineComment', 'Operator', ...PAREN_TYPES];

interface IOptionalValues extends IGenerateTokenOpts {
  raw?: string;
}

interface IGenerateTokenOpts {
  bigint?: string;
}

/**
 * Structures the provided data into a token object.
 * @param cursor - The position along input string that the parser is looking at.
 * @param type - The token type that should be constructed.
 * @param raw - The raw value of the extracted from the input string.
 * @param transform - A function to apply to the raw value to transform it into the actual value.
 * @param opts - An object of optional properties that should be appended to the token.
 */
const generateToken = (
  cursor: number,
  type: string,
  raw: string,
  transform: (val: string) => boolean | number | string | null = (val: string): string => val,
  opts: IGenerateTokenOpts = {}
): IToken => {
  // Set the token properties that are common across all token types.
  const common = {
    type,
    value: transform(raw),
    start: cursor,
    end: cursor + raw.length,
  };

  // Add passed options if there are any.
  const optional: IOptionalValues = {
    ...opts,
  };

  // Add the raw values where appropriate.
  if (!OMIT_RAW.includes(type)) {
    optional.raw = raw;
  }

  return {
    ...common,
    ...optional,
  };
};

export default generateToken;
