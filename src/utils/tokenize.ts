/* eslint-disable no-plusplus */
import { isBoolean, isNull } from './keywords';
import {
  isIdentifier,
  isInitIdentifier,
  isNumeric,
  isOperator,
  isQuote,
  isWhiteSpace,
} from './checkChar';

interface INode {
  readonly type: string;
  readonly value?: boolean | number | string | null;
  readonly raw?: string;
}

const parseWord = (str: string): INode => {
  let type = 'Identifier';
  let value: boolean | string | null = str;

  if (isBoolean(str)) {
    type = 'Literal';
    value = str === 'true';
  }

  if (isNull(str)) {
    type = 'Literal';
    value = null;
  }

  return {
    type,
    value,
    raw: str,
  };
};

const tokenize = (input: string): INode[] => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const current = input[cursor];

    // Skip over whitespace.
    if (isWhiteSpace(current)) {
      cursor += 1;
      continue;
    }

    // Check for operators.
    if (isOperator(current)) {
      tokens.push({
        type: 'Operator',
        value: current,
      });

      cursor += 1;
      continue;
    }

    // Check for identifiers (i.e.) words
    // and word-like primitives.
    if (isInitIdentifier(current)) {
      let word = current;

      // Need the extra check for input length here, otherwise
      // it starts to infinitely loop over instances of undefined
      while (isIdentifier(input[++cursor]) && cursor < input.length) {
        word += input[cursor];
      }

      tokens.push(parseWord(word));

      continue;
    }

    // Check for numbers and floats.
    if (isNumeric(current)) {
      let num = current;

      while (isNumeric(input[++cursor])) {
        num += input[cursor];
      }

      tokens.push({
        type: 'Literal',
        value: num.includes('.') ? parseFloat(num) : parseInt(num, 10),
        raw: num,
      });

      continue;
    }

    // Check for strings.
    if (isQuote(current)) {
      let string = '';
      let previous = '';

      while ((input[++cursor] !== current || previous === '\\') && cursor < input.length) {
        const char = input[cursor];

        string += char;
        previous = char;
      }

      // We remove all escape characters since all items are
      // stringified on output. If we omit this step we'll
      // have lots of extra backslashes.
      const unescaped = string.replace(/\\/gu, '');

      tokens.push({
        type: 'Literal',
        value: unescaped,
        raw: JSON.stringify(unescaped),
      });

      cursor += 1;
      continue;
    }

    // Throw new Error(`Error: ${current} is an invalid character.`);
    cursor += 1;
  }

  return tokens;
};

export type { INode };

export default tokenize;
