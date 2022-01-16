import { h } from 'preact';
import { useState } from 'preact/hooks';
import selectionSort from '@mrewers/algos/selectionSort';
import type { TPrevious } from '@mrewers/algos/selectionSort';
import type { FunctionalComponent } from 'preact';

import AlgoControls from './AlgoControls/AlgoControls';
import ControlPanel from '../../ControlPanel/ControlPanel';
import SelectionSort from './SelectionSort/SelectionSort';
import style from './Algos.module.scss';

/**
 * A JSX component that renders the algorithms visualizer.
 * @component
 */
const Algos: FunctionalComponent = () => {
  const [algo, setAlgo] = useState('');
  const arr = [29, 484, 1, 29, 92, 34];

  const initialState = {
    index: -1,
    previous: [] as TPrevious,
    sorted: arr,
  };

  const [isDone, setIsDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [iterator, setIterator] = useState(selectionSort(arr));
  const [values, setValues] = useState(initialState);

  const handleNext = (): void => {
    const { done, value } = iterator.next();

    if (done === true) {
      setIsDone(true);
    } else if (value) {
      setValues(value);
    }
  };

  const handleSort = (): void => {
    let running = true;

    const next = (i: number): void => {
      window.setTimeout(() => {
        if (i === arr.length) {
          running = false;
        }

        handleNext();
        setIsRunning(running);
      }, 1000 * i);
    };

    for (let i = 0; i <= arr.length; i++) {
      next(i);
    }
  };

  // Reset to the original state.
  const reset = (): void => {
    setIsDone(false);
    setIterator(selectionSort(arr));
    setValues(initialState);
  };

  const algoOptions = [
    { label: 'Select Algorithm', value: '' },
    { label: 'Selection Sort', value: 'selection' },
  ];

  return (
    <div className={style.container}>
      <ControlPanel current={algo} opts={algoOptions} switcher={setAlgo}>
        <AlgoControls
          algo={algo}
          handleNext={handleNext}
          handleReset={reset}
          handleSort={handleSort}
          isDone={isDone}
          isRunning={isRunning}
        />
      </ControlPanel>
      <div className={style.visualization}>
        {algo === 'selection' && <SelectionSort values={values} />}
      </div>
    </div>
  );
};

Algos.displayName = 'Page - Algorithms';

export default Algos;
