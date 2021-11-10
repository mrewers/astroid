/* eslint-disable no-plusplus */
import { isQuote } from './checkChar';
import type { ISubLoop } from './tokenize';

/**
 * Ensure that the provided string ends in the expected quotation type.
 * @param closing - The final element of a string.
 * @param expected - The expected quotation character.
 */
const checkForUnterminatedString = (closing: string, expected: string): string => {
  if (closing !== expected) {
    return `Unterminated string. Expected: ${expected}`;
  }

  return '';
};

/**
 * Checks the input for strings wrapped in "", '', and ``.
 * Accounts for escaped instances of the wrapping quotation marks.
 * @param cursor - The position along input string that the parser is looking at.
 * @param current - The character at the cursor's position.
 * @param input - The full text of the provided input.
 */
const findStrings = (cursor: number, current: string, input: string): ISubLoop | null => {
  let finalPosition = cursor;
  let err = '';

  if (isQuote(current)) {
    let string = '';
    let previous = '';

    while (
      // Check for backslashes preceding quotation marks indicating they
      // are being escaped and should not considered the end of the string.
      (input[++finalPosition] !== current || previous === '\\') &&
      finalPosition < input.length
    ) {
      const char = input[finalPosition];

      string += char;
      previous = char; // Keep track of the previous character to help account for escape sequences
    }

    // We remove all escape characters since all items are
    // stringified on output. If we omit this step the
    // resulting text will have lots of extra backslashes.
    const unescaped = string.replace(/\\/gu, '');

    const token = {
      type: 'StringLiteral',
      value: unescaped,
      raw: JSON.stringify(unescaped),
    };

    err = checkForUnterminatedString(input[finalPosition], current);

    finalPosition += 1; // Advance cursor by one character to omit closing quotation mark.

    return {
      err,
      finalPosition,
      token,
    };
  }

  return null;
};

export default findStrings;
