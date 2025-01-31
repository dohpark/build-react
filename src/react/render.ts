import { VirtualDom } from './types';
import App from '../App';
import { resetCurrentIndex } from './state';
import {
  eventRegistry,
  Listener,
  registerEvent,
  unregisterEvent,
} from './syntheticEvent';

let previousVDom: VirtualDom | null = null;

export function render(virtualDom: VirtualDom) {
  const app = document.querySelector('#app')!;

  virtualDom.children.forEach((childVDom) => {
    commitDom(childVDom, app as HTMLElement);
  });
}

export function rerender() {
  resetCurrentIndex(); // 상태 인덱스 초기화
  const currentVDom = App(); // 루트 컴포넌트 다시 호출
  const app = document.querySelector('#app')!;

  if (previousVDom) {
    updateChildren(
      app as HTMLElement,
      previousVDom.children,
      currentVDom.children,
    );
  } else {
    resetDom();
    render(currentVDom);
  }

  setPreviousVDom(currentVDom); // 이전 VDOM 저장
}

export function resetDom() {
  const app = document.querySelector('#app')!;
  app.innerHTML = '';
}

export function setPreviousVDom(vDom: VirtualDom) {
  previousVDom = vDom;
}

function commitDom(vdom: VirtualDom, $parent: HTMLElement) {
  const { type, props, children } = vdom;

  if (type === 'TEXT_ELEMENT') {
    const { nodeValue } = props;
    $parent.innerText = nodeValue as string;
    return;
  }

  const $newElement = document.createElement(type);

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      const eventType = key.slice(2).toLowerCase();
      registerEvent(eventType, $newElement, value as Listener);
    } else {
      $newElement.setAttribute(key, value as string);
    }
  });

  $parent.appendChild($newElement);

  children.forEach((childVDom) => {
    commitDom(childVDom, $newElement);
  });
}

function updateDom(
  $parent: HTMLElement,
  prevNode: VirtualDom,
  currentNode: VirtualDom,
  index = 0,
) {
  const existingElement = $parent.childNodes[index] as HTMLElement | null;

  // 1. 새 노드가 추가되었을 경우
  if (!prevNode) {
    commitDom(currentNode, $parent);
    return;
  }

  // 2. 노드가 삭제되었을 경우
  if (!currentNode) {
    if (existingElement) $parent.removeChild(existingElement);
    return;
  }

  // 3. 타입이 다르면 교체
  if (prevNode.type !== currentNode.type) {
    commitDom(currentNode, $parent);
    return;
  }

  // 4. 속성 업데이트
  updateAttributes(existingElement!, prevNode.props, currentNode.props);

  // 5. 자식 요소 업데이트
  updateChildren(existingElement!, prevNode.children, currentNode.children);
}

function updateAttributes(
  element: HTMLElement,
  prevProps: Record<string, unknown>,
  currentProps: Record<string, unknown>,
) {
  // 모든 속성 검사
  const allProps = { ...prevProps, ...currentProps };

  for (const key in allProps) {
    if (currentProps[key] === undefined) {
      if (key.startsWith('on')) {
        unregisterEvent(key.slice(2).toLowerCase(), element);
      } else {
        element.removeAttribute(key);
      }
    } else if (prevProps[key] !== currentProps[key]) {
      if (key === 'nodeValue') {
        // TEXT_ELEMENT 처리
        element.textContent = String(currentProps[key]);
      } else if (key.startsWith('on')) {
        // 이벤트 처리
        registerEvent(key.slice(2).toLowerCase(), element, (event) =>
          (currentProps[key] as EventListener)(event.nativeEvent),
        );
      } else {
        element.setAttribute(key, String(currentProps[key]));
      }
    }
  }
}

function updateChildren(
  $parent: HTMLElement,
  prevChildren: VirtualDom[],
  currentNode: VirtualDom[],
) {
  const maxLen = Math.max(prevChildren.length, currentNode.length);

  for (let i = 0; i < maxLen; i++) {
    updateDom($parent, prevChildren[i], currentNode[i], i);
  }
}
