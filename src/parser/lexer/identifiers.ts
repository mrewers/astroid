import generateToken from './tokens';
import { isIdentifier, isInitIdentifier } from '../utils/checkChar';
import { isBoolean, isKeyword, isNull } from '../utils/keywords';
import type { IToken, ISubLoop } from './tokenize';

/**
 * Identifies what sort of word is provided and returns an appropriate token.
 * @param str - The found word.
 * @param cursor - The position along input string that the parser is looking at.
 */
const categorizeWord = (str: string, cursor: number): IToken => {
  if (isBoolean(str)) {
    return generateToken(cursor, 'BooleanLiteral', str, val => val === 'true');
  }

  if (isNull(str)) {
    return generateToken(cursor, 'NullLiteral', str, () => null);
  }

  if (isKeyword(str)) {
    return generateToken(cursor, 'Keyword', str);
  }

  return generateToken(cursor, 'Identifier', str);
};

/**
 * Checks the input for identifiers and keywords.
 * @param cursor - The position along input string that the parser is looking at.
 * @param current - The character at the cursor's position.
 * @param input - The full text of the provided input.
 */
const findIdentifiers = (cursor: number, current: string, input: string): ISubLoop | null => {
  if (isInitIdentifier(current)) {
    let finalPosition = cursor;
    let word = current;

    // Need the extra check for input length here, otherwise
    // it starts to infinitely loop over instances of undefined
    while (isIdentifier(input[++finalPosition]) && finalPosition < input.length) {
      word += input[finalPosition];
    }

    return {
      err: '',
      finalPosition,
      token: categorizeWord(word, cursor),
    };
  }

  return null;
};

export default findIdentifiers;
