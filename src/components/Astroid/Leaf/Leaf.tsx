import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import BranchNode from '../BranchNode/BranchNode'; // eslint-disable-line import/no-cycle
import style from './Leaf.module.scss';
import type { IAstBody } from '../../../parser/analyzer/analyzeSyntax';

interface ILeafProps {
  readonly label?: string;
  readonly token: IAstBody;
}

type TLeaf = IAstBody | boolean | number | string | null;

const isObject = (val: unknown): boolean => val instanceof Object;

const oneLiner = (key: string, val: string): h.JSX.Element => <span>{`${key}: ${val}`}</span>;

/**
 * A JSX component that renders a leaf/terminal node on the Abstract Syntax Tree representation.
 * @component
 * @param props
 * @param props.label - The name of the current leaf.
 * @param props.token - The data pertaining to this leaf.
 */
const Leaf: FunctionalComponent<ILeafProps> = ({ label, token }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [keys, setKeys] = useState([] as string[]);

  // Pull the properties off of the leaf data object
  // so that we can iterate over them.
  useEffect(() => {
    if (isObject(token)) {
      setKeys(Object.keys(token));
    }
  }, [token]);

  // Populate the leaf with the appropriate content depending on the contents of the leaf.
  const parseLeaf = (leaf: TLeaf, key: string): h.JSX.Element => {
    // The the leaf if a primitive value we render it out as is.
    if (leaf === null) {
      return oneLiner(key, 'null');
    }

    if (typeof leaf === 'string') {
      return oneLiner(key, leaf);
    }

    if (typeof leaf === 'boolean' || typeof leaf === 'number') {
      return oneLiner(key, leaf.toString());
    }

    // If the leaf is an array we branch out a new node.
    if (Array.isArray(leaf)) {
      return <BranchNode label={key} leaves={leaf} />;
    }

    // If the leaf is an object, we recursively render another leaf.
    return <Leaf label={key} token={leaf} />;
  };

  return (
    <Fragment>
      <span>
        {typeof label !== 'undefined' ? `${label}: ` : ''}
        <button
          className={style.button}
          type="button"
          onClick={(): void => setCollapsed(!collapsed)}
        >
          {token.type}
        </button>
      </span>
      {!collapsed && (
        <ul>
          {keys.map(key => (
            <li key={key}>{parseLeaf(token[key], key)}</li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

Leaf.displayName = 'AST Leaf Node';

export default Leaf;
