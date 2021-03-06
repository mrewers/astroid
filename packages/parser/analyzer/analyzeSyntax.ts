// Import arrowFunctions from './arrowFunctions';
import blockStatements from './blocks';
import chk from '../utils/checkToken';
import expressions from './expressions';
import functionDeclarations from './functions';
import recurse from '../utils/recursion';
import variableDeclarations from './variables';
import type { IBlockStatement } from './blocks';
import type { IExpressionStatement } from './expressions';
import type { IFunctionDeclaration } from './functions';
import type { IToken } from '../lexer/tokenize';
import type { IParsed } from '../parser';
import type { IVariableDeclaration } from './variables';

type IAstBody =
  | IBlockStatement
  | IExpressionStatement
  | IFunctionDeclaration
  | IToken
  | IVariableDeclaration;
interface ILoopReturn {
  readonly value: IAstBody;
  readonly remaining: IAstBody[];
}

/**
 * Loops through a list of tokens interpreting their syntactical meaning.
 * @param tokens - A list of lexical tokens.
 */
const analyzeSyntax = (tokens: IToken[]): IParsed => {
  // Extract the comments from the list of tokens.
  const comments = [] as IToken[];
  const nonComments = tokens.filter(ts => {
    if (chk.isComment(ts.type)) {
      comments.push(ts);
    }

    return !chk.isComment(ts.type);
  });

  // Initialize the AST body.
  let body = [] as IAstBody[];

  // Look for block statements.
  if (nonComments.length > 0) {
    body = recurse(nonComments, blockStatements);
  }

  // Look for function declarations.
  if (body.length > 0) {
    body = recurse(body, functionDeclarations);
  }

  // If (body.length > 0) {
  //   body = recurse(body, arrowFunctions);
  // }

  // Look for variable declarations.
  if (body.length > 0) {
    body = recurse(body, variableDeclarations);
  }

  // Look for expression statements.
  if (body.length > 0) {
    body = recurse(body, expressions);
  }

  return {
    ast: {
      comments,
      body,
    },
    error: '',
  };
};

export type { IAstBody, ILoopReturn };

export default analyzeSyntax;
