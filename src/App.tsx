import { VirtualDom } from '@react/types';
import { useEffect } from '@react/useEffect';
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
  const [message, setMessage] = useState('is below three');

  useEffect(() => {
    const newMessage =
      countA < 3
        ? 'is below three'
        : countA < 5
          ? 'is below five'
          : 'is equal or above five';

    if (message !== newMessage) {
      setMessage(newMessage);
    }
  }, [countA]);

  return (
    <div>
      <div>{message}</div>
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
