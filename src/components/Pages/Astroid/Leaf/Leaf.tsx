import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import isObject from '@mrewers/fp/isObject';
import type { IAstBody } from '@mrewers/parser/analyzer/analyzeSyntax';

import BranchNode from '../BranchNode/BranchNode'; // eslint-disable-line import/no-cycle
import style from './Leaf.module.scss';

interface ILeafProps {
  readonly label?: string;
  readonly token: IAstBody;
}

type TLeaf = IAstBody | boolean | number | string | null;

/**
 * Returns a span displaying the given key-value pair.
 * Used for rendering out primitive leaf values.
 * @param key - The property key name.
 * @param val - The property value.
 */
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

  // Only way I could find to get around the "no index signature with
  // a parameter type of string" error when calling parseLeaf with the token.
  const tokenCopy = { ...token } as Record<string, TLeaf>;

  // Pull the properties off of the leaf data object
  // so that we can iterate over them.
  useEffect(() => {
    if (isObject(token)) {
      setKeys(Object.keys(token));
    }
  }, [token]);

  /**
   * Populate the leaf with the appropriate content depending on the contents of the leaf.
   * @param leaf - The node leaf to be rendered.
   * @param key - The name of the property in question.
   */
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
      <span className={collapsed ? style.closed : style.open}>
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
        <ul className={style.list}>
          {keys.map(key => (
            <li key={key}>{parseLeaf(tokenCopy[key], key)}</li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

Leaf.displayName = 'AST Leaf Node';

export default Leaf;
