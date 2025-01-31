import { VirtualDom } from '@react/types';

function H1() {
  return <h1>Hello, React!</h1>;
}

function H2() {
  return <h2>Hello, Babel!</h2>;
}

export default function App(): VirtualDom {
  return (
    <div id="app">
      <H1 />
      <H2 />
      <div id="test">
        <p>Hello, Test 1!</p>
        <p>Hello, Test 2!</p>
      </div>
    </div>
  );
}
