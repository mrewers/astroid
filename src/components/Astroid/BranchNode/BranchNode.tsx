import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import Leaf from '../Leaf/Leaf'; // eslint-disable-line import/no-cycle
import style from './BranchNode.module.scss';
import type { IAstBody } from '../../../parser/analyzer/analyzeSyntax';

interface IBranchNodeProps {
  readonly label: string;
  readonly leaves: IAstBody[];
}

/**
 * A JSX component that renders a node on the Abstract Syntax Tree representation.
 * @component
 * @param props
 * @param props.label - The name of the current node.
 * @param props.leaves - The descendent elements of the current node.
 */
const BranchNode: FunctionalComponent<IBranchNodeProps> = ({ label, leaves }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <button className={style.button} type="button" onClick={(): void => setCollapsed(!collapsed)}>
        {label}
      </button>
      {!collapsed && (
        <ul>
          {leaves.length > 0 &&
            leaves.map(leaf => (
              <li key={leaf.start}>
                <Leaf token={leaf} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

BranchNode.displayName = 'AST BranchNode';

export default BranchNode;
