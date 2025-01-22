import { VirtualDom } from './types';

export function render(virtualDom: VirtualDom) {
  const app = document.querySelector('#app')!;

  commitDom(virtualDom, app as HTMLElement);
}

export function resetDom() {
  const app = document.querySelector('#app')!;
  app.innerHTML = '';
}

function commitDom(vdom: VirtualDom, $parentElement: HTMLElement) {
  const { type, props, children } = vdom;

  if (type === 'TEXT_ELEMENT') {
    const { nodeValue } = props;
    $parentElement.innerText = nodeValue as string;
    return;
  }

  const $newElement = document.createElement(type);

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'onClick') {
      $newElement.addEventListener('click', value);
    } else {
      $newElement.setAttribute(key, value as string);
    }
  });

  $parentElement.appendChild($newElement);

  children.forEach((childVDom) => {
    commitDom(childVDom, $newElement);
  });
}
