import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { pocketCardsMatrix } from '@mrewers/poker/pocketCards';

import RangeItem from './RangeItem/RangeItem';
import style from './BettingRange.module.scss';

const BettingRange: FunctionalComponent = () => {
  const rows = pocketCardsMatrix();

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
