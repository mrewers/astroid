/* eslint-disable no-plusplus */
import { isIdentifier, isInitIdentifier } from './checkChar';
import { isBoolean, isKeyword, isNull } from './keywords';
import type { INode, ISubLoop } from './tokenize';

const categorizeWord = (str: string): INode => {
  let type = 'Identifier';
  let value: boolean | string | null = str;

  if (isBoolean(str)) {
    type = 'BooleanLiteral';
    value = str === 'true';
  }

  if (isNull(str)) {
    type = 'NullLiteral';
    value = null;
  }

  if (isKeyword(str)) {
    type = 'Keyword';
  }

  return {
    type,
    value,
    raw: str,
  };
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
    const err = '';
    let word = current;

    // Need the extra check for input length here, otherwise
    // it starts to infinitely loop over instances of undefined
    while (isIdentifier(input[++finalPosition]) && finalPosition < input.length) {
      word += input[finalPosition];
    }

    return {
      err,
      finalPosition,
      token: categorizeWord(word),
    };
  }

  return null;
};

export default findIdentifiers;
