import { VirtualDom } from './types';

export function render(virtualDom: VirtualDom) {
  const app = document.querySelector('#app')!;

  commitDom(virtualDom, app as HTMLElement);
}

function commitDom(vdom: VirtualDom, $parentElement: HTMLElement) {
  const { type, props, children } = vdom;

  if (type === 'TEXT_ELEMENT' && props) {
    const { nodeValue } = props;
    $parentElement.innerText = nodeValue as string;
    return;
  }

  const $newElement = document.createElement(type);

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      $newElement.setAttribute(key, value as string);
    });
  }

  $parentElement.appendChild($newElement);

  children.forEach((childVDom) => {
    commitDom(childVDom, $newElement);
  });
}
