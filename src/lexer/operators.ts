import generateToken from './utils/tokens';
import { isCommentDelimiter, isOperator, isSlash, SINGULAR_OPERATORS } from './checkChar';
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

/**
 * Comment delimiters are mde up of operators. As such, we must identify them
 * and exit the function to avoid them being identified as invalid operators.
 * @param current - The current character in the iteration.
 * @param next - The next character in the iteration sequence.
 * @param previous - The previous character in the iteration sequence.
 */
const abortIfComment = (current: string, next: string, previous: string): boolean => {
  let isComment = false;

  // Look forward to next character for comment
  // delimiter if the current character is a slash.
  if (isSlash(current) && isCommentDelimiter(next)) {
    isComment = true;
  }

  // Look back to previous character for a slash if
  // the current character is a comment delimiter.
  if (isCommentDelimiter(current) && isSlash(previous)) {
    isComment = true;
  }

  return isComment;
};

/**
 * Checks the input for operators.
 * @param cursor - The position along input string that the parser is looking at.
 * @param current - The character at the cursor's position.
 * @param input - The full text of the provided input.
 */
const findOperators = (cursor: number, current: string, input: string): ISubLoop | null => {
  let finalPosition = cursor;
  let err = '';
  let op = '';

  // Short circuit the function if the operators are part of a comment delimiter.
  if (abortIfComment(current, input[cursor + 1], input[cursor - 1])) {
    return null;
  }

  if (isOperator(current)) {
    op = current;

    while (isOperator(input[++finalPosition]) && finalPosition < input.length) {
      op += input[finalPosition];
    }

    // Check that multi-character operators are valid.
    if (op.length > 1 && !COMBO_OPERATORS.includes(op)) {
      err = `Invalid operator ${op}`;
    }

    return {
      err,
      finalPosition,
      token: generateToken(cursor, 'Operator', op),
    };
  }

  return null;
};

// Make the full list of operators generally available.
export const OPERATORS = [...SINGULAR_OPERATORS, ...COMBO_OPERATORS];

export default findOperators;
