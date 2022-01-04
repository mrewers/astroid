import { h } from 'preact';
import { useState } from 'preact/hooks';
import { getTheDeck } from '@mrewers/poker/constants';
import shuffle from '@mrewers/poker/shuffle';
import type { FunctionalComponent } from 'preact';

import BettingRange from './BettingRange/BettingRange';
import ControlPanel from '../ControlPanel/ControlPanel';
import PlayingCard from './PlayingCard/PlayingCard';
import style from './Poker.module.scss';

const pokerOptions = [
  { label: 'Select Tool', value: '' },
  { label: 'Betting Range', value: 'betting' },
];

/**
 * A JSX component that renders the poker tools page.
 * @component
 */
const Poker: FunctionalComponent = () => {
  const [view, setView] = useState('');

  const deck = shuffle(getTheDeck());

  return (
    <div className={style.container}>
      <ControlPanel current={view} opts={pokerOptions} switcher={setView} />
      {view === '' && (
        <div className={style.cards}>
          {deck.map(card => (
            <PlayingCard
              key={`${card.suit}-${card.rank}`}
              flip
              suit={card.suit}
              value={card.value}
            />
          ))}
        </div>
      )}
      {view === 'betting' && (
        <div className={style.range}>
          <BettingRange />
        </div>
      )}
    </div>
  );
};

Poker.displayName = 'Page - Poker';

export default Poker;
