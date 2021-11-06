import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import './App.css';

const App: FunctionalComponent = () => {
  const [input, setInput] = useState('');

  return (
    <div>
      <header>
        <h1 className="title">ASTroid</h1>
      </header>
      <main>
        <div className="container panes">
          <div>
            <h2 className="pane-title">Input</h2>
            <textarea value={input} onChange={(e): void => setInput(e.target.value)} />
          </div>
          <div>
            <h2 className="pane-title">AST</h2>
            <code>{input}</code>
          </div>
        </div>
      </main>
    </div>
  );
};

App.displayName = 'App';

export default App;
