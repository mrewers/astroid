import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import { chen, pocket } from '@mrewers/poker';

import style from './RangeItem.module.scss';

interface IRangeItemProps {
  readonly item: string;
}

/**
 * A JSX component that renders an individual card pairing within the betting range grid.
 * @component
 * @param props
 * @param props.item - A representation of any two-card combination.
 */
const RangeItem: FunctionalComponent<IRangeItemProps> = ({ item }) => {
  const [chenScore, setChenScore] = useState(0);

  useEffect(() => {
    const data = pocket.getDataFromShorthand(item);

    setChenScore(chen.calculateChenFromData(data));
  }, [item]);

  return (
    <div className={style.item} data-chen={chenScore}>
      {item}
    </div>
  );
};

RangeItem.displayName = 'Betting Range - Item';

export default RangeItem;
