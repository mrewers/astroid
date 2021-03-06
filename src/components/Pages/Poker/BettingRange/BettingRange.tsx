import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { pocket } from '@mrewers/poker';

import RangeItem from './RangeItem/RangeItem';
import style from './BettingRange.module.scss';

/**
 * A JSX component that renders a grid indicating possible betting ranges.
 * @component
 */
const BettingRange: FunctionalComponent = () => {
  const rows = pocket.pocketCardsMatrix();

  if (rows.length > 0) {
    return (
      <div className={style.container}>
        {rows.map(row => (
          <div key={row.card} className={style.row}>
            {row.combos.map(item => (
              <RangeItem key={item} item={item} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

BettingRange.displayName = 'Betting Range';

export default BettingRange;
