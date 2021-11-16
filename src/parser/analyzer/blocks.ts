import { isBlockOpen, isBlockClose } from '../utils/checkToken';
import { peek, pop } from '../../fp/fp';
import type { IToken } from '../lexer/tokenize';

interface IBlockStatement {
  readonly type: string;
  readonly start: number;
  readonly end: number;
  readonly body: IBlockStatement[] | IToken[];
}

interface ILoopInfo {
  readonly value: IBlockStatement | IToken;
  readonly remaining: IBlockStatement[] | IToken[];
}

const blockStatements = (tokens: IToken[]): ILoopInfo => {
  const token = pop(tokens) as IToken;

  if (isBlockOpen(token.type)) {
    let { end } = token;
    const body = [];

    while (!isBlockClose((peek(tokens) as IToken).type)) {
      body.push(blockStatements(tokens).value);
      end = (peek(tokens) as IToken).end;
    }

    pop(tokens);

    const statement = {
      type: 'BlockStatement',
      start: token.start,
      end,
      body,
    };

    return { value: statement, remaining: tokens };
  }

  return { value: token, remaining: tokens };
};

export type { IBlockStatement };

export default blockStatements;
