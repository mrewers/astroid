const LETTER = /[a-zA-Z]/u;
const WHITESPACE = /\s+/u;
const NUMBER = /^[0-9]+$/u;

export const SINGULAR_OPERATORS = ['+', '-', '*', '/', '%', '!', '&', '?', '|', '>', '<', '^', '='];

// Basic character types
export const isLetter = (char: string): boolean => LETTER.test(char);
export const isNumber = (char: string): boolean => NUMBER.test(char);
export const isOperator = (char: string): boolean => SINGULAR_OPERATORS.includes(char);
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

// Punctuation
export const isComma = (char: string): boolean => char === ',';
export const isColon = (char: string): boolean => char === ':';
export const isExclamation = (char: string): boolean => char === '!';
export const isPeriod = (char: string): boolean => char === '.';
export const isQuestion = (char: string): boolean => char === '?';
export const isSemicolon = (char: string): boolean => char === ';';

// Special characters
export const isDollar = (char: string): boolean => char === '$';
export const isUnderscore = (char: string): boolean => char === '_';

// Combined checks
export const isDelimiter = (char: string): boolean => isWhiteSpace(char) || isOperator(char);
export const isNumeric = (char: string): boolean => isNumber(char) || isPeriod(char);
export const isInitIdentifier = (char: string): boolean =>
  isLetter(char) || isDollar(char) || isUnderscore(char);
export const isIdentifier = (char: string): boolean => isInitIdentifier(char) || isNumber(char);

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
