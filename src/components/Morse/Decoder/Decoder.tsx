import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import { parseMorse, parseText } from '@mrewers/morse/parser';

import style from './Decoder.module.scss';

interface IDecoderProps {
  mode: 'morse' | 'text';
}

const placeholder = (encode: boolean): string => {
  const text = 'The quick brown fox jumps over the lazy dog';

  return encode ? parseText(text) : text;
};

/**
 * A JSX component that renders an input to convert
 * Morse code into text and vice versa.
 * @component
 */
const Decoder: FunctionalComponent<IDecoderProps> = ({ mode }) => {
  const [input, setInput] = useState('');

  const handleInput = (e: Event): void => {
    if (e.target instanceof HTMLTextAreaElement) {
      setInput(e.target.value);
    }
  };

  return (
    <div className={style.container}>
      <textarea
        className={mode === 'morse' ? `${style.textarea} ${style.morse}` : style.textarea}
        placeholder={placeholder(mode === 'morse')}
        value={input}
        onInput={(e: Event): void => handleInput(e)}
      />
      <textarea
        className={mode === 'morse' ? style.textarea : `${style.textarea} ${style.morse}`}
        placeholder={placeholder(mode !== 'morse')}
        readOnly
        value={mode === 'morse' ? parseMorse(input) : parseText(input)}
      />
    </div>
  );
};

Decoder.displayName = 'Morse Code Decoder';

export default Decoder;
