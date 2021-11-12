/* eslint-disable no-plusplus */
import findComments from './comments';
import findNumerics from './numerics';
import findOperators from './operators';
import findIdentifiers from './identifiers';
import findStrings from './strings';
import { isWhiteSpace } from './checkChar';

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

interface IParsed {
  readonly error: string;
  readonly tokens: INode[];
}

const tokenize = (input: string): IParsed => {
  let error = '';
  const tokens: INode[] = [];
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

    // Check for identifiers and reserved keywords.
    // Also finds word-like primitives (such as null or true).
    const identifiers = findIdentifiers(cursor, current, input);

    if (identifiers) {
      updateState(identifiers);

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
