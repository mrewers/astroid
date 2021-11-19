import chk from '../utils/checkToken';
import { peek, first } from '../../fp/fp';
import type { IBlockStatement } from './blocks';
import type { IToken } from '../lexer/tokenize';
import type { ILoopReturn } from './analyzeSyntax';

interface IFunctionDeclaration {
  readonly type: string;
  readonly id?: IFunctionId;
  readonly start: number;
  readonly end: number;
  readonly params?: IToken[];
  readonly body?: IBlockStatement;
  readonly async: boolean;
  readonly expression: boolean;
  readonly generator: boolean;
}

interface IFunctionId {
  readonly type: string;
  readonly name: string | null;
  readonly start?: number;
  readonly end?: number;
}

/* Adjust the first and peek functions to facilitate typing */
const _first = (ts: Array<IBlockStatement | IToken>): IBlockStatement | IToken =>
  first(ts) as IBlockStatement | IToken;

const _peek = (ts: Array<IBlockStatement | IToken>): IBlockStatement | IToken =>
  peek(ts) as IBlockStatement | IToken;

/**
 * Converts a generic token type into a function id by converting
 * the value into a name and removing unneeded properties.
 * @param token - A tokenized code element.
 */
const convertIdentifier = ({ end, start, type, value }: IToken): IFunctionId => {
  return {
    type,
    name: typeof value === 'string' ? value : null,
    start,
    end,
  };
};

/**
 * Look for function declarations amongst the tokens.
 * @param tokens - A list of tokenized code elements.
 */
const functionDeclarations = (tokens: Array<IBlockStatement | IToken>): ILoopReturn => {
  const token = _first(tokens);

  // The async keyword precedes the function declaration, but can also be an identifier.
  // As such we have to look for it before the function keyword.
  const isAsyncFunc = chk.isAsync(token) && chk.isFuncDeclaration(_peek(tokens));

  if (chk.isFuncDeclaration(token) || isAsyncFunc) {
    // Initial the function properties.
    let async = false;
    let body;
    let { end } = token;
    const expression = false;
    let generator = false;
    let id;
    const params = [];

    // Set the async status if appropriate.
    if (isAsyncFunc) {
      async = true;
      _first(tokens); // Advance to the next token.
    }

    // Check whether the function is a generator.
    if (chk.isAsterisk(_peek(tokens))) {
      generator = true;
      _first(tokens); // Discard the asterisk once the generator property is set.
    }

    // Look for a function name.
    if (chk.isIdentifier(_peek(tokens).type)) {
      id = convertIdentifier(_first(tokens));
    }

    // Check for the presence of parameters.
    if (chk.isParensOpen(_peek(tokens).type)) {
      // Get rid of the opening parenthesis.
      _first(tokens);

      // Add everything within the parens to the parameters list.
      while (!chk.isParensClose(_peek(tokens).type)) {
        params.push(_first(tokens));
      }

      // Get rid of the closing parenthesis.
      _first(tokens);
    }

    // Look for the function block statement and add it to the body of the function declaration.
    if (chk.isBlockStatement(_peek(tokens).type)) {
      const block = _first(tokens) as IBlockStatement;

      const blockBody = [];
      const temp = [...block.body];

      // Recurse through the statement block body to account for nested functions.
      while (temp.length > 0) {
        blockBody.push(functionDeclarations(temp).value);
      }

      // Reassign the block statements body to the transformed values.
      body = {
        ...block,
        body: blockBody,
      };

      // Set the end of the block statement as the end of the function declaration.
      end = body.end;
    }

    const declaration = {
      type: 'FunctionDeclaration',
      id,
      start: token.start,
      end,
      body,
      params,
      async,
      expression,
      generator,
    };

    return { value: declaration, remaining: tokens };
  }

  return { value: token, remaining: tokens };
};

export type { IFunctionDeclaration };

export default functionDeclarations;
