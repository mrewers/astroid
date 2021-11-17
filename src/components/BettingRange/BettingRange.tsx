import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import pocketCardsMatrix from '../../poker/pocketCards';
import style from './BettingRange.module.scss';

const BettingRange: FunctionalComponent = () => {
  const rows = pocketCardsMatrix();

  if (rows.length > 0) {
    return (
      <div className={style.container}>
        {rows.map(row => (
          <div key={row.card} className={style.row}>
            {row.combos.map(item => (
              <div key={item} className={style.item}>
                {item}
              </div>
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
