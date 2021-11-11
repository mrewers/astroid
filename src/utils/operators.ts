/* eslint-disable no-plusplus */
import { isOperator, SINGULAR_OPERATORS } from './checkChar';
import type { ISubLoop } from './tokenize';

const combos = ['%=', '/=', '^='];
const amps = ['&&', '&&=', '&='];
const bangs = ['!=', '!=='];
const equals = ['==', '==='];
const greater = ['>=', '>>', '>>>', '>>==', '>>>='];
const hyphens = ['-=', '--'];
const less = ['<=', '<<'];
const pipes = ['||', '|=', '||='];
const plus = ['++', '+='];
const questions = ['??', '??='];
const stars = ['**', '*==', '**='];

const COMBO_OPERATORS = [
  ...combos,
  ...amps,
  ...bangs,
  ...equals,
  ...greater,
  ...hyphens,
  ...less,
  ...pipes,
  ...plus,
  ...questions,
  ...stars,
];

const findOperators = (cursor: number, current: string, input: string): ISubLoop | null => {
  let finalPosition = cursor;
  let err = '';
  let op = '';

  if (isOperator(current)) {
    op = current;

    while (isOperator(input[++finalPosition]) && finalPosition < input.length) {
      op += input[finalPosition];
    }

    if (op.length > 1 && !COMBO_OPERATORS.includes(op)) {
      err = `Invalid operator ${op}`;
    }

    const token = {
      type: 'Operator',
      value: op,
    };

    return {
      err,
      finalPosition,
      token,
    };
  }

  return null;
};

// Make the full list of operators generally available.
export const OPERATORS = [...SINGULAR_OPERATORS, ...COMBO_OPERATORS];

export default findOperators;
