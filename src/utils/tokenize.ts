/* eslint-disable no-plusplus */
import findComments from './comments';
import findNumerics from './numerics';
import findOperators from './operators';
import findStrings from './strings';
import { isBoolean, isNull } from './keywords';
import { isIdentifier, isInitIdentifier, isWhiteSpace } from './checkChar';

interface INode {
  readonly type: string;
  readonly value?: boolean | number | string | null;
  readonly raw?: string;
  readonly bigint?: string;
}

interface ISubLoop {
  readonly err: string;
  readonly finalPosition: number;
  readonly token: INode;
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

  // Update the list of tokens, the position of the cursor, and the
  // error state based on the response from a sub-loop operation.
  const updateState = (found: ISubLoop): void => {
    cursor = found.finalPosition;

    if (found.err) {
      error = found.err;
    }

    tokens.push(found.token);
  };

  while (cursor < input.length) {
    const current = input[cursor];

    // Skip over whitespace.
    if (isWhiteSpace(current)) {
      cursor += 1;
      continue;
    }

    // Check for comments.
    const comments = findComments(cursor, current, input);

    if (comments) {
      updateState(comments);

      continue;
    }

    // Check for operators.
    const operators = findOperators(cursor, current, input);

    if (operators) {
      updateState(operators);

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
      updateState(numerics);

      continue;
    }

    // Check for strings.
    const strings = findStrings(cursor, current, input);

    if (strings) {
      updateState(strings);

      continue;
    }

    cursor += 1;
  }

  return {
    error,
    tokens,
  };
};

export type { INode, ISubLoop };

export default tokenize;
