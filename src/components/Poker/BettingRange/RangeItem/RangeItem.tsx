import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import { getDataFromShorthand } from '@mrewers/poker/pocketCards';
import { calculateChenFromData } from '@mrewers/poker/chen';

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
  const [chen, setChen] = useState(0);

  useEffect(() => {
    const data = getDataFromShorthand(item);

    setChen(calculateChenFromData(data));
  }, [item]);

  return (
    <div className={style.item} data-chen={chen}>
      {item}
    </div>
  );
};

RangeItem.displayName = 'Betting Range - Item';

export default RangeItem;
