import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './Poker.module.scss';

const Poker: FunctionalComponent = () => <div className={style.container}>Poker</div>;

Poker.displayName = 'Page - Poker';

export default Poker;
