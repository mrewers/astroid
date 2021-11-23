import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './Nav.module.scss';

const Nav: FunctionalComponent = () => (
  <nav className={style.container}>
    <ul className={style.list}>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/poker">Poker</a>
      </li>
    </ul>
  </nav>
);

Nav.displayName = 'Navigation';

export default Nav;
