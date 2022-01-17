import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import Button from 'components/Button/Button';
import style from './AlgoControls.module.scss';

interface IAlgoControlsProps {
  algo: string;
  handleNext: () => void;
  handleReset: () => void;
  handleSort: () => void;
  isDone: boolean;
  isRunning: boolean;
}

/**
 * A JSX component that renders the control panel contents for the algorithms visualizer.
 * @component
 */
const AlgoControls: FunctionalComponent<IAlgoControlsProps> = ({
  algo,
  handleNext,
  handleReset,
  handleSort,
  isDone,
  isRunning,
}) => (
  <div>
    {algo !== '' && (
      <div className={style.controls}>
        <Button
          disabled={isDone || isRunning}
          label="Run Sort"
          type="button"
          variant="secondary"
          onClick={handleSort}
        />
        <Button
          disabled={isDone || isRunning}
          label="Next Step"
          type="button"
          variant="secondary"
          onClick={handleNext}
        />
        <Button
          disabled={isRunning}
          label="Reset"
          type="button"
          variant="secondary"
          onClick={handleReset}
        />
      </div>
    )}
  </div>
);

AlgoControls.displayName = 'Algorithms Control Panel';

export default AlgoControls;
