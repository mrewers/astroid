import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './SelectionSort.module.scss';

interface ISortedArrayProps {
  numbers: number[];
  currentIndex: number;
  inlineStyle?: Record<string, string>;
}

/**
 * A JSX component that renders a partially/fully sorted array of numbers.
 * @component
 */
const SortedArray: FunctionalComponent<ISortedArrayProps> = ({
  numbers,
  currentIndex,
  inlineStyle,
}) => (
  <div className={style.array} style={inlineStyle}>
    {numbers.map((num, idx) => (
      <div key={num} className={idx <= currentIndex ? `${style.item} ${style.sorted}` : style.item}>
        {num}
      </div>
    ))}
  </div>
);

SortedArray.displayName = 'Partially Sorted Array';

export default SortedArray;
