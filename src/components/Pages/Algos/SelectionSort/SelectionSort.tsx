import { h } from 'preact';
import type { ISelectionSortYield } from '@mrewers/algos/selectionSort';
import type { FunctionalComponent } from 'preact';

import SortedArray from './SortedArray';
import style from './SelectionSort.module.scss';

interface ISelectionSortProps {
  values: ISelectionSortYield;
}

/**
 * A JSX component that renders a visualization of the selection sort algorithm.
 * @component
 */
const SelectionSort: FunctionalComponent<ISelectionSortProps> = ({ values }) => {
  const trimmed = values.previous.length > 4 ? values.previous.slice(0, 4) : values.previous;

  return (
    <div className={style.container}>
      <SortedArray currentIndex={values.index} numbers={values.sorted} />
      {trimmed.map((prev, i) => (
        <SortedArray
          key={prev.index}
          currentIndex={prev.index}
          inlineStyle={{ opacity: `calc(1 - (0.15 * ${i}) - 0.15)` }}
          numbers={prev.values}
        />
      ))}
    </div>
  );
};

SelectionSort.displayName = 'Selection Sort';

export default SelectionSort;
