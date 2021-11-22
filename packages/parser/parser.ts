import analyzeSyntax from './analyzer/analyzeSyntax';
import tokenize from './lexer/tokenize';
import type { IToken } from './lexer/tokenize';
import type { IAstBody } from './analyzer/analyzeSyntax';

interface IParsed {
  readonly ast: {
    comments: IToken[];
    body: IAstBody[];
  };
  readonly error: string;
}

const parse = (input: string): IParsed => {
  let error = '';

  const { error: tokenError, tokens } = tokenize(input);

  if (tokenError) {
    error = tokenError;
  }

  const { ast, error: syntaxError } = analyzeSyntax(tokens);

  if (syntaxError) {
    error = syntaxError;
  }

  return {
    ast,
    error,
  };
};

export type { IParsed };

export default parse;
