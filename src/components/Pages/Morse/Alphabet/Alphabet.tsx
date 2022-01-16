import { h } from 'preact';
import CHARS from '@mrewers/morse/constants';
import { translate } from '@mrewers/morse';
import type { FunctionalComponent } from 'preact';

import style from './Alphabet.module.scss';

interface ICharData {
  readonly binary: string;
  readonly char: string;
  readonly morse: string;
}

const getCharValues = (map: Map<string, string>): ICharData[] => {
  const values = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of map) {
    values.push({ binary: value, char: key, morse: translate.convertBinaryToMorse(value) });
  }

  return values;
};

/**
 * A JSX component that displays the Morse code equivalents of all characters.
 * @component
 */
const Alphabet: FunctionalComponent = () => {
  const chars = getCharValues(CHARS);

  return (
    <div className={style.container}>
      <div className={style.grid}>
        {chars.map(char => (
          <div key={char.binary} className={style.cell}>
            <span>{`${char.char.toUpperCase()}`}</span>
            <span>{`${char.morse}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

Alphabet.displayName = 'Morse Code Alphabet';

export default Alphabet;
