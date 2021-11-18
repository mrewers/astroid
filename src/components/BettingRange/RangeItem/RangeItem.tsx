import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './RangeItem.module.scss';

interface IRangeItemProps {
  readonly item: string;
}

const RangeItem: FunctionalComponent<IRangeItemProps> = ({ item }) => (
  <div className={style.item}>{item}</div>
);

RangeItem.displayName = 'Betting Range - Item';

export default RangeItem;
