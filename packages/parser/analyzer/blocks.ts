import { first, peek } from '@mrewers/fp';

import chk from '../utils/checkToken';
import expressions from './expressions';
import functionDeclarations from './functions';
import variableDeclarations from './variables';
import recurse from '../utils/recursion';
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

  if (chk.isBlockOpen(token.type)) {
    let body = [];

    // Populate the block body with it's tokens.
    // We do so recursively to account for nested blocks.
    while (!chk.isBlockClose(_peek(tokens).type)) {
      body.push(blockStatements(tokens).value);
    }

    // Look for function declarations in the body of the block statement.
    if (body.length > 0) {
      body = recurse(body, functionDeclarations);
    }

    // Look for variable declarations in the body of the block statement.
    if (body.length > 0) {
      body = recurse(body, variableDeclarations);
    }

    // Look for expression statements.
    if (body.length > 0) {
      body = recurse(body, expressions);
    }

    // Discard the closing bracket.
    const closing = _first(tokens);

    const statement = {
      type: 'BlockStatement',
      start: token.start,
      end: closing.end,
      body,
    };

    return { value: statement, remaining: tokens };
  }

  return { value: token, remaining: tokens };
};

export type { IBlockStatement };

export default blockStatements;
