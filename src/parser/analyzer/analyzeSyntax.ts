import blockStatements from './blocks';
import functionDeclarations from './functions';
import type { IBlockStatement } from './blocks';
import type { IFunctionDeclaration } from './functions';
import type { IToken } from '../lexer/tokenize';
import type { IParsed } from '../parser';

type IValue = IBlockStatement | IFunctionDeclaration | IToken;
interface ILoopReturn {
  readonly value: IValue;
  readonly remaining: IValue[];
}

const recurse = (
  arr: IValue[],
  func: (a: IValue[]) => { value: IValue; remaining: IValue[] },
  final: IValue[] = []
): IValue[] => {
  if (arr.length) {
    const { value, remaining } = func(arr);

    final.push(value);

    recurse(remaining, func, final);
  }

  return final;
};

/**
 * Loops through a list of tokens interpreting their syntactical meaning.
 * @param tokens - A list of lexical tokens.
 */
const analyzeSyntax = (tokens: IToken[]): IParsed => {
  let ast = [] as IValue[];

  // Look for block statements.
  if (tokens.length > 0) {
    ast = recurse(tokens, blockStatements);
  }

  // Look for function declarations.
  if (ast.length > 0) {
    ast = recurse(ast, functionDeclarations);
  }

  return {
    ast,
    error: '',
  };
};

export type { ILoopReturn };

export default analyzeSyntax;
