import { isBlockOpen, isBlockClose } from '../utils/checkToken';
import { first, peek } from '../../fp/fp';
import type { IFunctionDeclaration } from './functions';
import type { IToken } from '../lexer/tokenize';
import type { ILoopReturn } from './analyzeSyntax';

interface IBlockStatement {
  readonly type: string;
  readonly start: number;
  readonly end: number;
  readonly body: Array<IBlockStatement | IFunctionDeclaration | IToken>;
}

/* Adjust the first and peek functions to facilitate typing */
const _first = (ts: IToken[]): IBlockStatement | IToken => first(ts) as IBlockStatement | IToken;
const _peek = (ts: IToken[]): IBlockStatement | IToken => peek(ts) as IBlockStatement | IToken;

/**
 * Look for block statements (i.e. content wrapped in curly braces) amongst the tokens.
 * @param tokens - A list of tokenized code elements.
 */
const blockStatements = (tokens: IToken[]): ILoopReturn => {
  const token = _first(tokens);

  if (isBlockOpen(token.type)) {
    const body = [];
    let { end } = token;

    // Populate the block body with it's tokens.
    // We do so recursively to account for nested blocks.
    while (!isBlockClose(_peek(tokens).type)) {
      body.push(blockStatements(tokens).value);

      // Set the block end to the position of the closing brace.
      end = _peek(tokens).end;
    }

    // Discard the closing bracket.
    first(tokens);

    const statement = {
      type: 'BlockStatement',
      start: token.start,
      end,
      body,
    };

    return { value: statement, remaining: tokens };
  }

  return { value: token, remaining: tokens };
};

export type { IBlockStatement };

export default blockStatements;
