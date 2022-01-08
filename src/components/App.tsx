import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Router } from 'preact-router';
import type { FunctionalComponent } from 'preact';
import type { RouterOnChangeArgs } from 'preact-router';

import Algos from './Algos/Algos';
import Astroid from './Astroid/Astroid';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import Poker from './Poker/Poker';
import style from './App.module.scss';

/**
 * A JSX component that renders the application.
 * @component
 */
const App: FunctionalComponent = () => {
  const [title, setTitle] = useState('ASTroid');

  /**
   * Update the page and document title when the user navigates to a new page.
   * @param e - An on change event emitted by the Preact router.
   */
  const updateTitle = (e: RouterOnChangeArgs): void => {
    const setNewTitle = (value: string): void => {
      setTitle(value);
      document.title = value.toLocaleLowerCase() === 'astroid' ? value : `${value} | Astroid`;
    };

    switch (e.url) {
      case '/algos':
        setNewTitle('Algorithms');
        break;
      case '/ast':
        setNewTitle('AST');
        break;
      case '/poker':
        setNewTitle('Poker');
        break;
      default:
        setNewTitle('ASTroid');
    }
  };

  return (
    <div>
      <header>
        <h1 className={style.title}>{title}</h1>
        <Nav />
      </header>
      <main>
        <Router onChange={(e): void => updateTitle(e)}>
          <Home path="/" />
          <Astroid path="/ast" />
          <Algos path="/algos" />
          <Poker path="/poker" />
        </Router>
      </main>
    </div>
  );
};

App.displayName = 'App';

export default App;
