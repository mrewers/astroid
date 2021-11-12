import { isAsterisk, isSlash } from './checkChar';
import type { ISubLoop } from './tokenize';

/**
 * Ensure that the provided string ends in the expected quotation type.
 * @param comment - A block type comment.
 */
const checkForUnterminatedComment = (comment: string): string => {
  if (!comment.endsWith('*/')) {
    return 'Unterminated block comment. Expected: */';
  }

  return '';
};

/**
 * Checks the input for comment delimiters, namely // and /*.
 * Captures all subsequent characters until it encounters a closing comment
 * delimiter or new line break depending on whether it is a block or line comment.
 * @param cursor - The position along input string that the parser is looking at.
 * @param current - The character at the cursor's position.
 * @param input - The full text of the provided input.
 */
const findComments = (cursor: number, current: string, input: string): ISubLoop | null => {
  let finalPosition = cursor;
  let err = '';
  let comment = '';

  // Identify block comments.
  if (isSlash(current) && isAsterisk(input[cursor + 1])) {
    while (finalPosition < input.length) {
      const char = input[finalPosition];

      // Identify closing delimiter.
      if (char === '/' && comment.endsWith('*')) {
        comment += char;
        break;
      }

      comment += char;
      finalPosition++;
    }

    err = checkForUnterminatedComment(comment);

    return {
      err,
      finalPosition: finalPosition + 1, // Advance cursor past closing comment delimiter.
      token: {
        type: 'BlockComment',
        value: comment.substring(2, comment.length - 2), // Trim the comment delimiters.
      },
    };
  }

  // Identify line comments.
  if (isSlash(current) && isSlash(input[cursor + 1])) {
    while (input[++finalPosition] !== '\n' && finalPosition < input.length) {
      const char = input[finalPosition];

      comment += char;
    }

    return {
      err,
      finalPosition,
      token: {
        type: 'LineComment',
        value: comment.substring(1), // Trim the comment delimiters.
      },
    };
  }

  return null;
};

export default findComments;
