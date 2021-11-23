import { h, render } from 'preact';

import 'preact/devtools';
import App from './components/App';

import './style/global.scss';

const root = document.getElementById('astroid');

if (root) {
  render(<App />, root);
}
