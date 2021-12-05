import { h } from 'preact';
import { useState } from 'preact/hooks';
import selectionSort from '@mrewers/algos/selectionSort';
import type { ISelectionSortYield } from '@mrewers/algos/selectionSort';
import type { FunctionalComponent } from 'preact';

import SortedArray from './SortedArray';

/**
 * A JSX component that renders a visualization of the selection sort algorithm.
 * @component
 */
const SelectionSort: FunctionalComponent = () => {
  const arr = [29, 484, 1, 29, 92, 34];
  const [isDone, setIsDone] = useState(false);
  const [iterator, setIterator] = useState(selectionSort(arr));
  const [previous, setPrevious] = useState([] as ISelectionSortYield[]);
  const [values, setValues] = useState({ index: -1, sorted: arr });

  const handleSort = (): void => {
    const { done, value } = iterator.next();

    if (done === true) {
      setIsDone(true);
    } else if (value) {
      const copy = previous.length > 3 ? previous.slice(0, 3) : previous;

      setPrevious([values, ...copy]);
      setValues(value);
    }
  };

  const reset = (): void => {
    setIterator(selectionSort(arr));
    setPrevious([]);
    setValues({ index: -1, sorted: arr });
  };

  return (
    <div>
      <SortedArray currentIndex={values.index} numbers={values.sorted} />
      {previous.map((prev, i) => (
        <SortedArray
          key={prev.index}
          currentIndex={prev.index}
          inlineStyle={{ opacity: `calc(1 - (0.15 * ${i}) - 0.15)` }}
          numbers={prev.sorted}
        />
      ))}
      <button disabled={isDone} type="button" onClick={handleSort}>
        Sort
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

SelectionSort.displayName = 'Selection Sort';

export default SelectionSort;
