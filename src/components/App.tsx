import { h } from 'preact';
import { Router } from 'preact-router';
import type { FunctionalComponent } from 'preact';

import Astroid from './Astroid/Astroid';
import Poker from './Poker/Poker';

import './App.css';

const App: FunctionalComponent = () => (
  <div>
    <header>
      <h1 className="title">ASTroid</h1>
    </header>
    <nav>
      <ul className="nav">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/poker">Poker</a>
        </li>
      </ul>
    </nav>
    <main>
      <Router>
        <Astroid path="/" />
        <Poker path="/poker" />
      </Router>
    </main>
  </div>
);

App.displayName = 'App';

export default App;
