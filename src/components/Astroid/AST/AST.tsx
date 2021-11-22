import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import parse from '@mrewers/parser';
import type { IAstBody } from '@mrewers/parser/analyzer/analyzeSyntax';
import type { IToken } from '@mrewers/parser/lexer/tokenize';

import BranchNode from '../BranchNode/BranchNode';
import style from './AST.module.scss';

interface IAstProps {
  readonly raw: string;
}

/**
 * A JSX component that renders the Abstract Syntax Tree representation.
 * @component
 * @param props
 * @param props.raw - The un-parse stringified code input by the user.
 */
const Ast: FunctionalComponent<IAstProps> = ({ raw }) => {
  const [error, setError] = useState('');
  const [ast, setAst] = useState({ body: [] as IAstBody[], comments: [] as IToken[] });

  // Parse the raw input on initial load.
  useEffect(() => {
    const parsed = parse(raw);

    if (parsed.error !== '') {
      setError(parsed.error);
    }

    setAst(parsed.ast);
  }, [raw]);

  if (error) {
    return <p>{`Error: ${error}`}</p>;
  }

  return (
    <div className={style.container}>
      {ast.comments.length > 0 && <BranchNode label="comments" leaves={ast.comments} />}
      {ast.body.length > 0 && <BranchNode label="body" leaves={ast.body} />}
    </div>
  );
};

Ast.displayName = 'Abstract Syntax Tree';

export default Ast;
