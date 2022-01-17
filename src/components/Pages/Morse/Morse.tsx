import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import Alphabet from './Alphabet/Alphabet';
import ControlPanel from 'components/ControlPanel/ControlPanel';
import Decoder from './Decoder/Decoder';
import Legend from './Legend/Legend';
import style from './Morse.module.scss';

const pokerOptions = [
  { label: 'Decoder', value: '' },
  { label: 'The Alphabet', value: 'alpha' },
];

/**
 * A JSX component that renders the Morse code page.
 * @component
 */
const Morse: FunctionalComponent = () => {
  const [view, setView] = useState('');

  return (
    <div className={style.container}>
      <ControlPanel current={view} opts={pokerOptions} switcher={setView}>
        <Legend />
      </ControlPanel>
      {view === '' && <Decoder mode="text" />}
      {view === 'alpha' && <Alphabet />}
    </div>
  );
};

Morse.displayName = 'Page - Morse Code';

export default Morse;
