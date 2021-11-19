import type { IToken } from '../lexer/tokenize';

const checkFull = (token: IToken, type: string, value: string): boolean =>
  token.type === type && token.value === value;

const checkType = (desired: string, actual: string): boolean => desired === actual;

const checkKeyword = (token: IToken, value: string): boolean => checkFull(token, 'Keyword', value);

export const isBlockOpen = (actual: string): boolean => checkType('OpenBrace', actual);
export const isBlockClose = (actual: string): boolean => checkType('ClosingBrace', actual);
const isBlockStatement = (actual: string): boolean => checkType('BlockStatement', actual);
const isComment = (actual: string): boolean =>
  checkType('BlockComment', actual) || checkType('LineComment', actual);
const isIdentifier = (actual: string): boolean => checkType('Identifier', actual);
const isParensOpen = (actual: string): boolean => checkType('OpenParen', actual);
const isParensClose = (actual: string): boolean => checkType('ClosingParen', actual);

const isAsterisk = (token: IToken): boolean => checkFull(token, 'Operator', '*');
const isAsync = (token: IToken): boolean => checkFull(token, 'Identifier', 'async');

// Keyword checks.
const isFuncDeclaration = (token: IToken): boolean => checkKeyword(token, 'function');

const checkToken = {
  isAsterisk,
  isAsync,
  isBlockStatement,
  isComment,
  isFuncDeclaration,
  isIdentifier,
  isParensOpen,
  isParensClose,
};

export default checkToken;
