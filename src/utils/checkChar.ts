const LETTER = /[a-zA-Z]/u;
const WHITESPACE = /\s+/u;
const NUMBER = /^[0-9]+$/u;
const OPERATORS = ['+', '-', '*', '/', '%', '=', '!', '&', '|', '>', '<'];

const isLetter = (char: string): boolean => LETTER.test(char);
const isNumber = (char: string): boolean => NUMBER.test(char);
const isOperator = (char: string): boolean => OPERATORS.includes(char);
const isWhiteSpace = (char: string): boolean => WHITESPACE.test(char);

const isBracesOpen = (char: string): boolean => char === '{';
const isBracesClose = (char: string): boolean => char === '}';

const isBracketOpen = (char: string): boolean => char === '[';
const isBracketClose = (char: string): boolean => char === ']';

const isParenOpen = (char: string): boolean => char === '(';
const isParenClose = (char: string): boolean => char === ')';

const checkChar = {
  isBracesClose,
  isBracesOpen,
  isBracketClose,
  isBracketOpen,
  isLetter,
  isNumber,
  isOperator,
  isParenClose,
  isParenOpen,
  isWhiteSpace,
};

export default checkChar;
