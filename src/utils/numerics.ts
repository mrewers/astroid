/* eslint-disable no-plusplus */
import { isDelimiter, isInitIdentifier, isNumeric } from './checkChar';
import type { INode } from './tokenize';

interface ISubLoop {
  readonly err: string;
  readonly finalPosition: number;
  readonly token: INode;
}

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
 */
const constructToken = (num: string): INode => {
  let token;

  if (num.includes('n')) {
    token = {
      type: 'Literal',
      value: Number(num.slice(0, -1)),
      raw: num,
      bigint: num.slice(0, -1),
    };
  } else {
    token = {
      type: 'Literal',
      value: Number(num),
      raw: num,
    };
  }

  return token;
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
      token: constructToken(num),
    };
  }

  return null;
};

export default findNumerics;
