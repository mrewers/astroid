import generateToken from './utils/tokens';
import { isParenthetical } from './checkChar';
import type { ISubLoop } from './tokenize';

/**
 * Identifies which type of parenthetical character the provided token is.
 * @param char - The current parenthetical character.
 */
const getGroupingType = (char: string): string => {
  switch (char) {
    case '(':
      return 'OpenParen';
    case ')':
      return 'ClosingParen';
    case '[':
      return 'OpenBracket';
    case ']':
      return 'ClosingBracket';
    case '{':
      return 'OpenBrace';
    case '}':
      return 'ClosingBrace';
    default:
      return '';
  }
};

/**
 * Checks the input for comment delimiters, namely // and /*.
 * Captures all subsequent characters until it encounters a closing comment
 * delimiter or new line break depending on whether it is a block or line comment.
 * @param cursor - The position along input string that the parser is looking at.
 * @param current - The character at the cursor's position.
 * @param input - The full text of the provided input.
 */
const findGroupings = (cursor: number, current: string): ISubLoop | null => {
  if (isParenthetical(current)) {
    return {
      err: '',
      finalPosition: cursor + 1,
      token: generateToken(cursor, getGroupingType(current), current),
    };
  }

  return null;
};

export default findGroupings;
