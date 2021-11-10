/* eslint-disable no-plusplus */
import findNumerics from './numerics';
import { isBoolean, isNull } from './keywords';
import { isIdentifier, isInitIdentifier, isOperator, isQuote, isWhiteSpace } from './checkChar';

interface INode {
  readonly type: string;
  readonly value?: boolean | number | string | null;
  readonly raw?: string;
  readonly bigint?: string;
}

const parseWord = (str: string): INode => {
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

  return {
    type,
    value,
    raw: str,
  };
};

interface IParsed {
  readonly error: string;
  readonly tokens: INode[];
}

const tokenize = (input: string): IParsed => {
  let error = '';
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

    // Check for numbers, floats, and bigints.
    const numerics = findNumerics(cursor, current, input);

    if (numerics) {
      cursor = numerics.finalPosition;
      error = numerics.err;
      tokens.push(numerics.token);

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
        type: 'StringLiteral',
        value: unescaped,
        raw: JSON.stringify(unescaped),
      });

      cursor += 1;
      continue;
    }

    cursor += 1;
  }

  return {
    error,
    tokens,
  };
};

export type { INode };

export default tokenize;
