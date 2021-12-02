import { first, peek } from '@mrewers/fp';

import chk from '../utils/checkToken';
import { symbols } from '../utils/operators';
import { transformIdentifier } from '../utils/transforms';
import type { IBlockStatement } from './blocks';
import type { IIdentifier } from '../utils/transforms';
import type { ILoopReturn } from './analyzeSyntax';
import type { IToken } from '../lexer/tokenize';
import type { IVariableDeclaration } from './variables';

type TPossibleValues = IBlockStatement | IToken | IVariableDeclaration;

interface ISequenceExpression {
  readonly type: string;
  readonly start: number;
  readonly end: number;
  readonly expressions: Array<IIdentifier | IToken>;
}

interface IExpressionStatement {
  readonly type: string;
  readonly start: number;
  readonly end: number;
  readonly expression: IIdentifier | ISequenceExpression;
}

/* Adjust the first and peek functions to facilitate typing */
const _first = (ts: TPossibleValues[]): TPossibleValues => first(ts) as TPossibleValues;
const _peek = (ts: TPossibleValues[]): TPossibleValues => peek(ts) as TPossibleValues;

/**
 * Compile the list of tokens into a sequence expression.
 * @param tokens - A list of tokenized code elements.
 */
const sequenceExpression = (tokens: Array<IIdentifier | IToken>): ISequenceExpression => {
  return {
    type: 'SequenceExpression',
    start: tokens[0].start ?? 0,
    end: tokens[tokens.length - 1].end ?? 0,
    expressions: tokens,
  };
};

const transformForExpression = (token: TPossibleValues): TPossibleValues => {
  if (chk.isIdentifier(token.type)) {
    // Add identifiers to the list of elements.
    return transformIdentifier(token);
  } else if (token.type === 'FunctionDeclaration') {
    // Rewrite the type on function declarations when adding to expression statements.
    return { ...token, type: 'FunctionExpression' };
  }

  // Add anything else unchanged.
  return token;
};

/**
 * Look for expression statements amongst the tokens.
 * @param tokens - A list of tokenized code elements.
 */
const expressions = (tokens: TPossibleValues[]): ILoopReturn => {
  const token = _first(tokens);

  // Check for the presence of expression elements.
  if (chk.isParensOpen(token.type)) {
    const elements = [];

    // Add everything within the parens to the elements list.
    while (!chk.isParensClose(_peek(tokens).type)) {
      const param = transformForExpression(_first(tokens));

      elements.push(param);
    }

    const expression = elements.length > 1 ? sequenceExpression(elements) : elements[0];

    // Get rid of the closing parenthesis.
    const closing = _first(tokens);

    const statement = {
      type: 'ExpressionStatement',
      start: token.start,
      end: closing.end,
      expression,
    };

    return { value: statement, remaining: tokens };
  }

  // A lonesome identifier can also serve as an expression statement.
  if (token.type === 'Identifier') {
    let expression;

    const { value } = _peek(tokens) as IToken;

    if (typeof value === 'string' && symbols.assignment.includes(value)) {
      const operator = _first(tokens) as IToken;

      expression = {
        type: 'AssignmentExpression',
        operator: operator.value,
        left: transformIdentifier(token),
        right: transformForExpression(_first(tokens)),
      };
    } else {
      expression = transformIdentifier(token);
    }

    const statement = {
      type: 'ExpressionStatement',
      start: token.start,
      end: token.end,
      expression,
    };

    return { value: statement, remaining: tokens };
  }

  return { value: token, remaining: tokens };
};

export type { IExpressionStatement };

export default expressions;
