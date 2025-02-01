export type Listener = (event: SyntheticEvent) => void;

type SyntheticEvent = {
  nativeEvent: Event;
  type: string;
  target: EventTarget | null;
  currentTarget: EventTarget | null;
  isPropagationStopped: boolean;
  stopPropagation: () => void;
  preventDefault: () => void;
};

const createSyntheticEvent = (nativeEvent: Event): SyntheticEvent => {
  let isPropagationStopped = false;

  return {
    nativeEvent,
    type: nativeEvent.type,
    target: nativeEvent.target,
    currentTarget: nativeEvent.currentTarget,
    isPropagationStopped,
    stopPropagation: () => {
      isPropagationStopped = true;
    },
    preventDefault: () => {
      nativeEvent.preventDefault();
    },
  };
};

// 이벤트 관리 객체
export const eventRegistry = new Map<string, Map<Element, Listener>>();

export const registerEvent = (
  eventType: string,
  element: Element,
  listener: Listener,
) => {
  if (!eventRegistry.has(eventType)) {
    eventRegistry.set(eventType, new Map());
    document.addEventListener(eventType, dispatchEvent);
  }
  eventRegistry.get(eventType)!.set(element, listener);
};

export const unregisterEvent = (eventType: string, element: Element) => {
  eventRegistry.get(eventType)?.delete(element);
};

// 이벤트 실행 (루트에서 처리)
const dispatchEvent = (nativeEvent: Event) => {
  const syntheticEvent = createSyntheticEvent(nativeEvent);
  let currentTarget = nativeEvent.target as HTMLElement | null;

  while (currentTarget && !syntheticEvent.isPropagationStopped) {
    const listeners = eventRegistry.get(nativeEvent.type);
    if (listeners?.has(currentTarget)) {
      syntheticEvent.currentTarget = currentTarget;
      listeners.get(currentTarget)!(syntheticEvent);
    }
    currentTarget = currentTarget.parentElement;
  }
};
