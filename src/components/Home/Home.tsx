import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './Home.module.scss';

/**
 * A JSX component that renders the Astroid homepage.
 * @component
 */
const Home: FunctionalComponent = () => <div className={style.container} />;

Home.displayName = 'Page - Home';

export default Home;
