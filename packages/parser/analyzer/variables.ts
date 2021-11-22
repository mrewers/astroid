import { first, peek } from '@mrewers/fp';

import chk from '../utils/checkToken';
import { transformIdentifier } from '../utils/transforms';
import type { IIdentifier } from '../utils/transforms';
import type { ILoopReturn } from './analyzeSyntax';
import type { IToken } from '../lexer/tokenize';

interface IVariableDeclaration {
  readonly type: string;
  readonly start: number;
  readonly end: number;
  readonly declarations: IVariableDeclarator[];
  readonly kind: 'const' | 'let' | 'var';
}

interface IVariableDeclarator {
  readonly type: string;
  readonly id?: IIdentifier;
  readonly start?: number;
  readonly end?: number;
  init: IToken | null;
}

/* Adjust the first and peek functions to facilitate typing */
const _first = (ts: IToken[]): IToken | IVariableDeclaration =>
  first(ts) as IToken | IVariableDeclaration;

const _peek = (ts: IToken[]): IToken | IVariableDeclaration =>
  peek(ts) as IToken | IVariableDeclaration;

const reTypeFunctionExpression = (token: IToken): IToken => {
  if (token.type === 'FunctionDeclaration') {
    return { ...token, type: 'FunctionExpression' };
  }

  return token;
};

/**
 * Look for variable declarations amongst the tokens.
 * @param tokens - A list of tokenized code elements.
 */
const variableDeclarations = (tokens: IToken[]): ILoopReturn => {
  const token = _first(tokens);

  if (chk.isVarDeclaration(token)) {
    const declarations = [] as IVariableDeclarator[];
    let { end } = token;
    let id;

    // Look for a function name.
    if (chk.isIdentifier(_peek(tokens).type)) {
      id = transformIdentifier(_first(tokens));

      const declarator = {
        type: 'VariableDeclarator',
        id,
        end: id.end,
        start: id.start,
        init: null,
      } as IVariableDeclarator;

      if (chk.isEquals(_peek(tokens))) {
        _first(tokens); // Skip the equals operator.

        declarator.init = reTypeFunctionExpression(_first(tokens));
      }

      declarations.push(declarator);
      end = id.end;
    }

    const declaration = {
      type: 'VariableDeclaration',
      start: token.start,
      end,
      declarations,
    };

    return { value: declaration, remaining: tokens };
  }

  return { value: token, remaining: tokens };
};

export type { IVariableDeclaration };

export default variableDeclarations;
