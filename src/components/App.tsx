import { h } from 'preact';
import { Router } from 'preact-router';
import type { FunctionalComponent } from 'preact';

import Algos from './Algos/Algos';
import Astroid from './Astroid/Astroid';
import Nav from './Nav/Nav';
import Poker from './Poker/Poker';
import style from './App.module.scss';

/**
 * A JSX component that renders the application.
 * @component
 */
const App: FunctionalComponent = () => (
  <div>
    <header>
      <h1 className={style.title}>ASTroid</h1>
      <Nav />
    </header>
    <main>
      <Router>
        <Astroid path="/" />
        <Algos path="/algos" />
        <Poker path="/poker" />
      </Router>
    </main>
  </div>
);

App.displayName = 'App';

export default App;
