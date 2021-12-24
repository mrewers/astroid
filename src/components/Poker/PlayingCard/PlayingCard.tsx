import { h } from 'preact';
import { getRankFromValue } from '@mrewers/poker/constants';
import type { TCardSuit, TCardValue } from '@mrewers/poker/constants';
import type { FunctionalComponent } from 'preact';

import style from './PlayingCard.module.scss';

interface IPlayingCardProps {
  readonly suit: TCardSuit;
  readonly value: TCardValue;
}

/**
 * Renders the rank and suit indicators for a given card.
 * @param suit - Which of the four suits the given card belongs to.
 * @param value - The numeric value (1-13) of the given card.
 * @param inverted - Whether it appears at the base of the card and hence should be upside down.
 */
const displayMarkings = (suit: string, value: number, inverted = false): h.JSX.Element => (
  <div className={style.rank} style={inverted ? { transform: 'rotate(180deg)' } : {}}>
    <span>{getRankFromValue(value)}</span>
    <span>{suit}</span>
  </div>
);

/**
 * Sets the color style property accordingly depending on the suit.
 *  - red for hearts and diamonds
 *  - black for clubs and spades
 * @param suit - Which of the four suits the given card belongs to.
 */
const determineColor = (suit: TCardSuit): Record<'color', string> => {
  if (suit === 'hearts' || suit === 'diamonds') {
    return { color: 'var(--red)' };
  }

  return { color: 'var(--black)' };
};

/**
 * A JSX component that renders a representation of a playing card.
 * @component
 * @param props
 * @param props.suit - Which of the four suits the given card belongs to.
 * @param props.value - The numeric value (1-13) of the given card.
 */
const PlayingCard: FunctionalComponent<IPlayingCardProps> = ({ suit, value }) => (
  <div className={style.card} style={{ '--aspect-ratio': '89/64' }}>
    <div className={style.contents} style={determineColor(suit)}>
      {displayMarkings(suit, value)}
      {displayMarkings(suit, value, true)}
    </div>
  </div>
);

PlayingCard.displayName = 'Playing Card';

export default PlayingCard;
