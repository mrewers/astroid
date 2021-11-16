import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import parse from '../../parser/parser';

import './Astroid.css';

const populateAST = (input: string): h.JSX.Element => {
  const parsed = parse(input);

  if (parsed.error !== '') {
    return <p>{`Error: ${parsed.error}`}</p>;
  }

  return <code>{JSON.stringify(parsed.ast, null, 2)}</code>;
};

const Astroid: FunctionalComponent = () => {
  const [input, setInput] = useState('');

  const handleInput = (e: Event): void => {
    if (e.target instanceof HTMLTextAreaElement) {
      setInput(e.target.value);
    }
  };

  return (
    <div className="container panes">
      <div>
        <h2 className="pane-title">Input</h2>
        <textarea value={input} onBlur={(e: Event): void => handleInput(e)} />
      </div>
      <div>
        <h2 className="pane-title">AST</h2>
        <pre>{populateAST(input)}</pre>
      </div>
    </div>
  );
};

Astroid.displayName = 'Page - Astroid';

export default Astroid;
