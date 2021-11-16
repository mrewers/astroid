import { h } from 'preact';
import { Router } from 'preact-router';
import type { FunctionalComponent } from 'preact';

import Astroid from './Astroid/Astroid';
import Nav from './Nav/Nav';
import Poker from './Poker/Poker';
import style from './App.module.scss';

const App: FunctionalComponent = () => (
  <div>
    <header>
      <h1 className={style.title}>ASTroid</h1>
    </header>
    <Nav />
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
