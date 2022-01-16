import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './Legend.module.scss';

/**
 * A JSX component that renders an input to convert
 * Morse code into text and vice versa.
 * @component
 */
const Decoder: FunctionalComponent = () => (
  <aside className={style.container}>
    <table className={style.table}>
      <thead>
        <tr>
          <th>Key</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={style.emphasize}>.</td>
          <td>Dot (or Dit)</td>
        </tr>
        <tr>
          <td className={style.emphasize}>-</td>
          <td>Dash (or Dah)</td>
        </tr>
        <tr>
          <td>Space</td>
          <td>Letter Break</td>
        </tr>
        <tr>
          <td>/</td>
          <td>Word Break</td>
        </tr>
        <tr>
          <td>#</td>
          <td>Untranslatable</td>
        </tr>
      </tbody>
    </table>
  </aside>
);

Decoder.displayName = 'Morse Code Decoder';

export default Decoder;
