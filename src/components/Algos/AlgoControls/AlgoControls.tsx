import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import Button from '../../Button/Button';
import Select from '../../Select/Select';
import style from './AlgoControls.module.scss';

interface IAlgoControlsProps {
  algo: string;
  handleNext: () => void;
  handleReset: () => void;
  handleSort: () => void;
  isDone: boolean;
  setAlgo: (val: string) => void;
}

/**
 * A JSX component that renders the control panel for the algorithms visualizer.
 * @component
 */
const AlgoControls: FunctionalComponent<IAlgoControlsProps> = ({
  algo,
  isDone,
  handleNext,
  handleReset,
  handleSort,
  setAlgo,
}) => {
  const handleSelection = (e: Event): void => {
    if (e.target instanceof HTMLSelectElement) {
      const { value } = e.target;

      setAlgo(value);
    }
  };

  const algoOptions = [
    { label: 'Select Algorithm', value: '' },
    { label: 'Selection Sort', value: 'selection' },
  ];

  return (
    <div className={style.container}>
      <Select handler={handleSelection} opts={algoOptions} style={{ width: '175px' }} val={algo} />
      {algo !== '' && (
        <div className={style.controls}>
          <Button
            disabled={isDone}
            label="Run Sort"
            type="button"
            variant="secondary"
            onClick={handleSort}
          />
          <Button
            disabled={isDone}
            label="Next Step"
            type="button"
            variant="secondary"
            onClick={handleNext}
          />
          <Button label="Reset" type="button" variant="secondary" onClick={handleReset} />
        </div>
      )}
    </div>
  );
};

AlgoControls.displayName = 'Algorithms Control Panel';

export default AlgoControls;
