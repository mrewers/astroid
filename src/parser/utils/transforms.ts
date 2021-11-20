import type { IToken } from '../lexer/tokenize';

interface IIdentifier {
  readonly type: string;
  readonly name: string | null;
  readonly start?: number;
  readonly end?: number;
}

/**
 * Converts a generic token type into a function id by converting
 * the value into a name and removing unneeded properties.
 * @param token - A tokenized code element.
 */
export const transformIdentifier = ({ end, start, type, value }: IToken): IIdentifier => {
  return {
    type,
    name: typeof value === 'string' ? value : null,
    start,
    end,
  };
};

export type { IIdentifier };
