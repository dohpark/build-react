export const stateStore: Record<number, unknown> = {}; // 상태 저장소
export let currentIndex = 0; // 현재 컴포넌트의 상태 인덱스

export function increaseCurrentIndex() {
  currentIndex += 1;
}

export function resetCurrentIndex() {
  currentIndex = 0;
}
