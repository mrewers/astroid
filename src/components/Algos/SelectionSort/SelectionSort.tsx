import { h } from 'preact';
import { useState } from 'preact/hooks';
import selectionSort from '@mrewers/algos/selectionSort';
import type { FunctionalComponent } from 'preact';

import style from './SelectionSort.module.scss';

/**
 * A JSX component that renders the algorithms visualizer.
 * @component
 */
const SelectionSort: FunctionalComponent = () => {
  const arr = [29, 484, 1, 29, 92, 34];
  const [iterator, setIterator] = useState(selectionSort(arr));
  const [isDone, setIsDone] = useState(false);
  const [values, setValues] = useState({ index: -1, sorted: arr });

  const handleSort = (): void => {
    const { done, value } = iterator.next();

    if (done === true) {
      setIsDone(true);
    } else if (value) {
      setValues(value);
    }
  };

  const reset = (): void => {
    setValues({ index: -1, sorted: arr });
    setIterator(selectionSort(arr));
  };

  return (
    <div>
      <div className={style.array}>
        {values.sorted.map((num, idx) => (
          <div
            key={num}
            className={idx <= values.index ? `${style.item} ${style.sorted}` : style.item}
          >
            {num}
          </div>
        ))}
      </div>
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
