import { h } from 'preact';
import { useState } from 'preact/hooks';
import selectionSort from '@mrewers/algos/selectionSort';
import type { ISelectionSortYield } from '@mrewers/algos/selectionSort';
import type { FunctionalComponent } from 'preact';

import AlgoControls from './AlgoControls/AlgoControls';
import SelectionSort from './SelectionSort/SelectionSort';
import style from './Algos.module.scss';

/**
 * A JSX component that renders the algorithms visualizer.
 * @component
 */
const Algos: FunctionalComponent = () => {
  const [algo, setAlgo] = useState('');

  const arr = [29, 484, 1, 29, 92, 34];
  const [isDone, setIsDone] = useState(false);
  const [iterator, setIterator] = useState(selectionSort(arr));
  const [previous, setPrevious] = useState([] as ISelectionSortYield[]);
  const [values, setValues] = useState({ index: -1, sorted: arr });

  const handleNext = (): void => {
    const { done, value } = iterator.next();

    if (done === true) {
      setIsDone(true);
    } else if (value) {
      // Limit the number of shown iterations to 5 (including the current one).
      const copy = previous.length > 3 ? previous.slice(0, 3) : previous;

      setPrevious([values, ...copy]);
      setValues(value);
    }
  };

  const handleSort = (): void => {
    const next = (i: number): void => {
      setTimeout(() => {
        handleNext();
      }, 1000 * i);
    };

    for (let i = 0; i < arr.length; i++) {
      next(i);
    }
  };

  // Reset to the original state.
  const reset = (): void => {
    setIsDone(false);
    setIterator(selectionSort(arr));
    setPrevious([]);
    setValues({ index: -1, sorted: arr });
  };

  return (
    <div className={style.container}>
      <AlgoControls
        algo={algo}
        handleNext={handleNext}
        handleReset={reset}
        handleSort={handleSort}
        isDone={isDone}
        setAlgo={setAlgo}
      />
      <div className={style.visualization}>
        {algo === 'selection' && <SelectionSort previous={previous} values={values} />}
      </div>
    </div>
  );
};

Algos.displayName = 'Page - Algorithms';

export default Algos;
