import analyzeSyntax from './analyzer/analyzeSyntax';
import tokenize from './lexer/tokenize';
import type { IToken } from './lexer/tokenize';

interface IParsed {
  readonly ast: IToken[];
  readonly error: string;
}

const parse = (input: string): IParsed => {
  let error = '';

  const { error: tokenError, tokens } = tokenize(input);

  if (tokenError) {
    error = tokenError;
  }

  const { tokens: ast, error: syntaxError } = analyzeSyntax(tokens);

  if (syntaxError) {
    error = syntaxError;
  }

  return {
    ast,
    error,
  };
};

export default parse;
