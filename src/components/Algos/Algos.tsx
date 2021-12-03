import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

import style from './Algos.module.scss';

/**
 * A JSX component that renders the algorithms visualizer.
 * @component
 */
const Algos: FunctionalComponent = () => {
  const [algo, setAlgo] = useState('');

  return <div className={style.container} />;
};

Algos.displayName = 'Page - Algorithms';

export default Algos;
