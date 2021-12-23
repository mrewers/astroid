import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './Select.module.scss';

interface IOption {
  label: string;
  value: string;
}

interface ISelectProps {
  handler: (e: Event) => void;
  opts: IOption[];
  style?: Record<string, string>;
  val: string;
}

/**
 * A JSX component that renders a customized select element.
 * @component
 */
const Select: FunctionalComponent<ISelectProps> = ({ handler, opts, style: inlineStyle, val }) => (
  <select className={style.select} style={inlineStyle} value={val} onChange={handler}>
    {opts.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

Select.displayName = 'Select';

export type { IOption, ISelectProps };

export default Select;
