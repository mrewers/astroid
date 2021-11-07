import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import tokenize from '../utils/tokenize';

import './App.css';

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
            <pre>
              <code>{JSON.stringify(tokenize(input), null, 2)}</code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

App.displayName = 'App';

export default App;
