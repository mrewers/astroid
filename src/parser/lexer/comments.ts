import generateToken from './tokens';
import { isAsterisk, isSlash } from '../utils/checkChar';
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

  /**
   * Iterates over each character in the input string until it encounters the end of the comment.
   * @param condition - Checks the current character against the closing condition.
   */
  const iterate = (condition: (char: string) => boolean): void => {
    while (finalPosition < input.length) {
      const char = input[finalPosition];

      // Identify closing delimiter.
      if (condition(char)) {
        comment += char;
        break;
      }

      comment += char;
      finalPosition += 1;
    }
  };

  // Identify block comments.
  if (isSlash(current) && isAsterisk(input[cursor + 1])) {
    // Define the closing delimiter.
    const condition = (char: string): boolean => char === '/' && comment.endsWith('*');

    iterate(condition);

    // Block comments must end in */
    err = checkForUnterminatedComment(comment);

    // Trim the comment delimiters.
    const blockCommentTransform = (str: string): string => str.substring(2, str.length - 2);

    return {
      err,
      finalPosition: finalPosition + 1, // Advance cursor past closing comment delimiter.
      token: generateToken(cursor, 'BlockComment', comment, blockCommentTransform),
    };
  }

  // Identify line comments.
  if (isSlash(current) && isSlash(input[cursor + 1])) {
    // Define the closing delimiter.
    const condition = (char: string): boolean => char === '\n';

    iterate(condition);

    // Trim the comment delimiters.
    const lineCommentTransform = (str: string): string => str.substring(2, str.length - 1);

    return {
      err,
      finalPosition,
      token: generateToken(cursor, 'LineComment', comment, lineCommentTransform),
    };
  }

  return null;
};

export default findComments;
