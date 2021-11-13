import type { IToken, ILexed } from '../lexer/tokenize';

/**
 * Loops through a list of tokens interpreting their syntactical meaning.
 * @param tokens - A list of lexical tokens.
 */
const analyzeSyntax = (tokens: IToken[]): ILexed => {
  return {
    error: '',
    tokens,
  };
};

export default analyzeSyntax;
