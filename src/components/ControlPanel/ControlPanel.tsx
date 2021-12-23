import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import Select from '../Select/Select';
import type { IOption } from '../Select/Select';
import style from './ControlPanel.module.scss';

interface IControlPanelProps {
  current: string;
  switcher: (str: string) => void;
  opts: IOption[];
}

/**
 * A JSX component that renders a generic control panel for sidebar.
 * This component handles switching views on a given page.
 * @component
 */
const ControlPanel: FunctionalComponent<IControlPanelProps> = ({
  children,
  current,
  switcher,
  opts,
}) => {
  const handleSelection = (e: Event): void => {
    if (e.target instanceof HTMLSelectElement) {
      const { value } = e.target;

      switcher(value);
    }
  };

  return (
    <div className={style.container}>
      <Select handler={handleSelection} opts={opts} style={{ width: '175px' }} val={current} />
      {children}
    </div>
  );
};

ControlPanel.displayName = 'Control Panel';

export default ControlPanel;
