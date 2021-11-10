import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import tokenize from '../utils/tokenize';

import './App.css';

const populateAST = (input: string): h.JSX.Element => {
  const parsed = tokenize(input);

  if (parsed.error !== '') {
    return <p>{`Error: ${parsed.error}`}</p>;
  }

  return <code>{JSON.stringify(parsed.tokens, null, 2)}</code>;
};

const App: FunctionalComponent = () => {
  const [input, setInput] = useState('');

  const handleInput = (e: Event): void => {
    if (e.target instanceof HTMLTextAreaElement) {
      setInput(e.target.value);
    }
  };

  return (
    <div>
      <header>
        <h1 className="title">ASTroid</h1>
      </header>
      <main>
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
      </main>
    </div>
  );
};

App.displayName = 'App';

export default App;
