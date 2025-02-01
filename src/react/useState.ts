import { rerender } from './render';
import { currentIndex, stateStore, increaseCurrentIndex } from './state';

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  if (stateStore[currentIndex] === undefined) {
    stateStore[currentIndex] = initialValue; // 현재 인덱스의 상태가 없으면 초기값을 설정
  }

  const capturedIndex = currentIndex;

  const setState = (newValue: T) => {
    if (stateStore[capturedIndex] !== newValue) {
      stateStore[capturedIndex] = newValue;
      rerender();
    }
  };

  const value = stateStore[capturedIndex] as T; // 현재 상태와 상태 업데이트 함수를 반환
  increaseCurrentIndex();

  return [value, setState];
}
