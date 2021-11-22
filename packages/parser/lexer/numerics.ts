import generateToken from './tokens';
import { isDelimiter, isInitIdentifier, isNumeric } from '../utils/checkChar';
import type { IToken, ISubLoop } from './tokenize';

const ALLOWED_LETTERS = /[e|E|n]/gu;

const containsAllowedLetters = (word: string): boolean => ALLOWED_LETTERS.test(word);

/**
 * Numbers using scientific notation should end in a digit.
 * The checks that they do and if not reports and error.
 * @param num - A string representation of a numeric value.
 */
const checkForValidExponent = (num: string): string => {
  const finalLetter = num.slice(-1);

  if (finalLetter === 'e' || finalLetter === 'E') {
    return `Floating-point numbers require a valid exponent after the '${finalLetter}'`;
  }

  return '';
};

/**
 * Generates a AST node based off of the numeric string.
 * @param num - A string representation of a numeric value.
 * @param current - The character at the cursor's position.
 */
const constructToken = (num: string, cursor: number): IToken => {
  const isBigInt = num.includes('n');

  if (isBigInt) {
    const bigIntVal = (str: string): string => str.slice(0, -1);
    const transform = (str: string): number => Number(bigIntVal(str));

    return generateToken(cursor, 'BigIntLiteral', num, transform, { bigint: bigIntVal(num) });
  }

  return generateToken(cursor, 'NumericLiteral', num, Number);
};

/**
 * Checks the input for Numbers, Floats, Scientific Notation, and BigInts.
 * @param cursor - The position along input string that the parser is looking at.
 * @param current - The character at the cursor's position.
 * @param input - The full text of the provided input.
 */
const findNumerics = (cursor: number, current: string, input: string): ISubLoop | null => {
  let finalPosition = cursor;
  let err = '';
  let num = '';

  if (isNumeric(current)) {
    num = current;

    while (!isDelimiter(input[++finalPosition]) && finalPosition < input.length) {
      // Handles the case when the subsequent character is a digit or period.
      if (isNumeric(input[finalPosition])) {
        if (input[finalPosition - 1] === 'n') {
          // The n denoting bigints must be followed by whitespace.
          err = `Unexpected token ${input[finalPosition]}`;
        } else if (input[finalPosition] === '.' && num.includes('.')) {
          // Cannot have multiple periods or period following an allowed letter.
          err = `Unexpected token ${input[finalPosition]}`;
        } else {
          num += input[finalPosition];
        }
      }

      // Handles the n suffix for bigints and e and E used by scientific notation.
      if (containsAllowedLetters(input[finalPosition])) {
        if (containsAllowedLetters(num)) {
          // The allowed letters should not used more than once or in combination.
          err = `Unexpected token ${input[finalPosition]}`;
        } else if (input[finalPosition] === 'n' && num.includes('.')) {
          // BigInts cannot contain periods.
          err = 'Invalid BigInt Literal';
        } else {
          num += input[finalPosition];
        }
      }

      // Reports an error if an invalid character is encountered.
      if (isInitIdentifier(input[finalPosition]) && !containsAllowedLetters(input[finalPosition])) {
        err = 'Number followed directly by Identifier';
      }
    }

    if (!err) {
      // Ensure that scientific notation numbers are valid.
      err = checkForValidExponent(num);
    }

    return {
      err,
      finalPosition,
      token: constructToken(num, cursor),
    };
  }

  return null;
};

export default findNumerics;
