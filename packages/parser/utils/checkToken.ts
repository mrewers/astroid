import { isVariable } from './keywords';
import type { IToken } from '../lexer/tokenize';

type TPossibleValue = boolean | number | string | null | undefined;

/**
 * Checks whether a provided value matches a desired one.
 * @param desired -
 * @param actual - The provided value.
 */
const checkMatch = (desired: TPossibleValue, actual: TPossibleValue): boolean => desired === actual;

const checkFull = (token: IToken, type: string, value: TPossibleValue): boolean => {
  const typeMatch = checkMatch(token.type, type);
  const valueMatch = checkMatch(token.value, value);

  return typeMatch && valueMatch;
};

/**
 * Check whether the provided token is a keyword with a particular value.
 * @param token - A tokenized code elements.
 * @param value
 */
const checkKeyword = (token: IToken, value: string): boolean => checkFull(token, 'Keyword', value);

const isBlockOpen = (actual: string): boolean => checkMatch('OpenBrace', actual);
const isBlockClose = (actual: string): boolean => checkMatch('ClosingBrace', actual);
const isBlockStatement = (actual: string): boolean => checkMatch('BlockStatement', actual);
const isComment = (actual: string): boolean =>
  checkMatch('BlockComment', actual) || checkMatch('LineComment', actual);
const isIdentifier = (actual: string): boolean => checkMatch('Identifier', actual);
const isParensOpen = (actual: string): boolean => checkMatch('OpenParen', actual);
const isParensClose = (actual: string): boolean => checkMatch('ClosingParen', actual);

const isAsterisk = (token: IToken): boolean => checkFull(token, 'Operator', '*');
const isAsync = (token: IToken): boolean => checkFull(token, 'Identifier', 'async');
const isEquals = (token: IToken): boolean => checkFull(token, 'Operator', '=');

// Keyword checks.
const isFuncDeclaration = (token: IToken): boolean => checkKeyword(token, 'function');
const isVarDeclaration = (token: IToken): boolean => {
  const isKW = checkMatch(token.type, 'Keyword');
  const isVar = typeof token.value === 'string' ? isVariable(token.value) : false;

  return isKW && isVar;
};

const checkToken = {
  isAsterisk,
  isAsync,
  isBlockOpen,
  isBlockClose,
  isBlockStatement,
  isComment,
  isEquals,
  isFuncDeclaration,
  isIdentifier,
  isParensOpen,
  isParensClose,
  isVarDeclaration,
};

export default checkToken;
