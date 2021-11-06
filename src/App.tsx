import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

const App: FunctionalComponent = () => (
  <div>
    <header>Hello AST</header>
    <main>Hello</main>
  </div>
);

App.displayName = 'App';

export default App;
