import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import Ast from './AST/AST';
import style from './Astroid.module.scss';

/**
 * A JSX component that renders the AST playground page.
 * @component
 */
const Astroid: FunctionalComponent = () => {
  const [input, setInput] = useState('');

  const handleInput = (e: Event): void => {
    if (e.target instanceof HTMLTextAreaElement) {
      setInput(e.target.value);
    }
  };

  return (
    <div className={style.panes}>
      <div>
        <h2 className={style.title}>Input</h2>
        <textarea value={input} onBlur={(e: Event): void => handleInput(e)} />
      </div>
      <div>
        <h2 className={style.title}>AST</h2>
        <Ast raw={input} />
      </div>
    </div>
  );
};

Astroid.displayName = 'Page - Astroid';

export default Astroid;
