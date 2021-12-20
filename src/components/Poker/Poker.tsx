import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import BettingRange from './BettingRange/BettingRange';
import style from './Poker.module.scss';

/**
 * A JSX component that renders the poker tools page.
 * @component
 */
const Poker: FunctionalComponent = () => (
  <div className={style.container}>
    <div className={style.range}>
      <BettingRange />
    </div>
  </div>
);

Poker.displayName = 'Page - Poker';

export default Poker;
