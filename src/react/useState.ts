import App from '../App';
import { render, resetDom } from './render';
import { currentIndex, stateStore, resetCurrentIndex } from './state';

export function useState(initialValue: any) {
  if (stateStore[currentIndex] === undefined) {
    stateStore[currentIndex] = initialValue; // 현재 인덱스의 상태가 없으면 초기값을 설정
  }

  const capturedIndex = currentIndex;

  const setState = (newValue: any) => {
    stateStore[capturedIndex] = newValue; // 상태 업데이트

    rerenderApp(); // 앱을 전체 렌더링
  };

  const value = stateStore[capturedIndex]; // 현재 상태와 상태 업데이트 함수를 반환
  return [value, setState];
}

function rerenderApp() {
  resetCurrentIndex(); // 렌더링 시작 시 상태 인덱스 초기화
  const vdom = App(); // 루트 컴포넌트 다시 호출
  resetDom();
  render(vdom); // 화면 다시 렌더링
}
