import blockStatements from './blocks';
import type { IBlockStatement } from './blocks';
import type { IToken } from '../lexer/tokenize';
import type { IParsed } from '../parser';

/* eslint-disable @typescript-eslint/no-explicit-any */
const recurse = (
  arr: unknown[],
  final: unknown[],
  func: (a: any[]) => { value: unknown; remaining: unknown[] }
): void => {
  if (arr.length) {
    const { value, remaining } = func(arr);

    final.push(value);

    recurse(remaining, final, func);
  }
};
/* eslint-enable */

/**
 * Loops through a list of tokens interpreting their syntactical meaning.
 * @param tokens - A list of lexical tokens.
 */
const analyzeSyntax = (tokens: IToken[]): IParsed => {
  let ast = [] as Array<IBlockStatement | IToken>;

  if (tokens.length > 0) {
    const final = [] as Array<IBlockStatement | IToken>;

    recurse(tokens, final, blockStatements);

    ast = final;
  }

  return {
    ast,
    error: '',
  };
};

export default analyzeSyntax;
