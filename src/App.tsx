import { VirtualDom } from '@react/types';
import { useState } from '@react/useState';

function H1() {
  return <h1>Hello, React!</h1>;
}

function H2() {
  return <h2>Hello, Babel!</h2>;
}

function PositiveCounter() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  return (
    <div>
      <div>{countA}</div>
      <button onClick={() => setCountA(countA + 1)}>+</button>
      <button onClick={() => setCountA(countA - 1)}>-</button>
      <div>{countB}</div>
      <button onClick={() => setCountB(countB + 1)}>+</button>
      <button onClick={() => setCountB(countB - 1)}>-</button>
    </div>
  );
}

function NegativeCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
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
      <PositiveCounter />
      <NegativeCounter />
    </div>
  );
}
