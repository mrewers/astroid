const LETTER = /[a-zA-Z]/u;
const WHITESPACE = /\s+/u;
const NUMBER = /^[0-9]+$/u;
const OPERATORS = ['+', '-', '*', '/', '%', '!', '&', '|', '>', '<'];

// Basic character types
export const isLetter = (char: string): boolean => LETTER.test(char);
export const isNumber = (char: string): boolean => NUMBER.test(char);
export const isOperator = (char: string): boolean => OPERATORS.includes(char);
export const isWhiteSpace = (char: string): boolean => WHITESPACE.test(char);

// Parenthetical characters
export const isBracesOpen = (char: string): boolean => char === '{';
export const isBracesClose = (char: string): boolean => char === '}';

export const isBracketOpen = (char: string): boolean => char === '[';
export const isBracketClose = (char: string): boolean => char === ']';

export const isParenOpen = (char: string): boolean => char === '(';
export const isParenClose = (char: string): boolean => char === ')';

// Quotation characters
export const isBacktick = (char: string): boolean => char === '`';
export const isDoubleQuote = (char: string): boolean => char === '"';
export const isSingleQuote = (char: string): boolean => char === "'";
export const isQuote = (char: string): boolean =>
  isBacktick(char) || isDoubleQuote(char) || isSingleQuote(char);

export const checkChar = {
  isBacktick,
  isBracesClose,
  isBracesOpen,
  isBracketClose,
  isBracketOpen,
  isDoubleQuote,
  isLetter,
  isNumber,
  isOperator,
  isParenClose,
  isParenOpen,
  isQuote,
  isSingleQuote,
  isWhiteSpace,
};
