/* eslint-disable no-plusplus */
import { isLetter, isNumber, isOperator, isWhiteSpace } from './checkChar';

interface INode {
  readonly type: string;
  readonly value?: number | string;
  readonly raw?: string;
}

const tokenize = (input: string): INode[] => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const current = input[cursor];

    if (isWhiteSpace(current)) {
      cursor += 1;
      continue;
    }

    if (isOperator(current)) {
      tokens.push({
        type: 'Operator',
        value: current,
      });

      cursor += 1;
      continue;
    }

    if (isLetter(current)) {
      let word = current;

      while (isLetter(input[++cursor])) {
        word += input[cursor];
      }

      tokens.push({
        type: 'Identifier',
        value: word,
        raw: word,
      });

      continue;
    }

    if (isNumber(current)) {
      let num = current;

      while (isNumber(input[++cursor])) {
        num += input[cursor];
      }

      tokens.push({
        type: 'Literal',
        value: parseInt(num, 10),
        raw: num,
      });

      continue;
    }

    // Throw new Error(`Error: ${current} is an invalid character.`);
    cursor += 1;
  }

  return tokens;
};

export type { INode };

export default tokenize;
