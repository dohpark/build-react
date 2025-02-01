// effect.ts
type Effect = {
  effectFn: () => void | (() => void);
  deps: any[];
  cleanup?: () => void;
};

let effects: Effect[] = [];
let currentEffectIndex = 0;

export function useEffect(effectFn: () => void | (() => void), deps: any[]) {
  const prevEffect = effects[currentEffectIndex];

  if (!prevEffect) {
    // 첫 실행: effect 저장
    effects[currentEffectIndex] = { effectFn, deps };
  } else {
    // 의존성 비교
    if (!areDepsEqual(prevEffect.deps, deps)) {
      // 기존 cleanup 실행
      if (prevEffect.cleanup) prevEffect.cleanup();

      // 새로운 effect 저장
      effects[currentEffectIndex] = { effectFn, deps };
    }
  }

  currentEffectIndex++;
}

// 의존성 배열 비교 함수
function areDepsEqual(deps1: any[], deps2: any[]) {
  return (
    deps1.length === deps2.length && deps1.every((dep, i) => dep === deps2[i])
  );
}

// 렌더링 후 실행
export function commitEffects() {
  effects.forEach((effect) => {
    const cleanup = effect.effectFn();

    if (cleanup) effect.cleanup = cleanup;
  });
}

// Effect 초기화
export function resetEffectsCurrentIndex() {
  currentEffectIndex = 0;
}

// 컴포넌트 언마운트 시 cleanup 실행
export function cleanupEffects() {
  effects.forEach((effect) => {
    if (effect.cleanup) effect.cleanup();
  });
  effects = [];
}
