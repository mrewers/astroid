import generateToken from './tokens';
import { isQuote } from '../utils/checkChar';
import type { ISubLoop } from './tokenize';

/**
 * Checks whether the given character is a backtick.
 * If not it assumes the it is a single or double quote.
 * @param mark - A quotation type character.
 */
const stringType = (mark: string): string => (mark === '`' ? 'template' : 'string');

/**
 * Returns a string's token type based on the quotation mark type that wraps it.
 * @param mark - A quotation type character.
 */
const tokenType = (mark: string): string => {
  switch (stringType(mark)) {
    case 'template':
      return 'TemplateLiteral';
    case 'string':
      return 'StringLiteral';
    default:
      throw new Error('Not a quotation mark character.'); // This line should be unreachable.
  }
};

/**
 * Ensure that the provided string ends in the expected quotation type.
 * @param closing - The final element of a string.
 * @param expected - The expected quotation character.
 */
const checkForUnterminatedString = (closing: string, expected: string): string => {
  if (closing !== expected) {
    return `Unterminated ${stringType(expected)}. Expected: ${expected}`;
  }

  return '';
};

/**
 * We remove all escape characters since all items are
 * stringified on output. If we omit this step the
 * resulting text will have lots of extra backslashes.
 * @param str - Any string.
 */
const unescaped = (str: string): string => str.replace(/\\/gu, '');

/**
 * Removes the first and last character of a string.
 * @param str - Any string.
 */
const trimQuotes = (str: string): string => str.substring(1, str.length - 1);

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

    err = checkForUnterminatedString(input[finalPosition], current);

    finalPosition += 1; // Advance cursor by one character to omit closing quotation mark.

    // The string value wrapped in the appropriate quote character.
    const full = `${current}${string}${current}`;

    const removeQuotes = (str: string): string => trimQuotes(unescaped(str));

    return {
      err,
      finalPosition,
      token: generateToken(cursor, tokenType(current), full, removeQuotes),
    };
  }

  return null;
};

export default findStrings;
