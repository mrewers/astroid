import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import SelectionSort from './SelectionSort/SelectionSort';
import style from './Algos.module.scss';

/**
 * A JSX component that renders the algorithms visualizer.
 * @component
 */
const Algos: FunctionalComponent = () => {
  const [algo, setAlgo] = useState('');

  const handleSelection = (e: Event): void => {
    if (e.target instanceof HTMLSelectElement) {
      const { value } = e.target;

      setAlgo(value);
    }
  };

  return (
    <div className={style.container}>
      <select value={algo} onChange={handleSelection}>
        <option value="">Select Algorithm</option>
        <option value="selection">Selection Sort</option>
      </select>
      {algo === 'selection' && <SelectionSort />}
    </div>
  );
};

Algos.displayName = 'Page - Algorithms';

export default Algos;
