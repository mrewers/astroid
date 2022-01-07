import { h } from 'preact';
import { Link } from 'preact-router/match';
import type { FunctionalComponent } from 'preact';

import style from './Nav.module.scss';

const Nav: FunctionalComponent = () => (
  <nav className={style.container}>
    <ul className={style.list}>
      <li>
        <Link activeClassName={style.active} href="/">
          Home
        </Link>
      </li>
      <li>
        <Link activeClassName={style.active} href="/ast">
          AST
        </Link>
      </li>
      <li>
        <Link activeClassName={style.active} href="/algos">
          Algos
        </Link>
      </li>
      <li>
        <Link activeClassName={style.active} href="/poker">
          Poker
        </Link>
      </li>
    </ul>
  </nav>
);

Nav.displayName = 'Navigation';

export default Nav;
