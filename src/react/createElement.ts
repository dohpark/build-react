type ChildNode = ElementNode | null;

interface ElementNode {
  type: string;
  props?: Record<string, unknown>;
  children: ChildNode[];
}

function createElement(
  type: string,
  props?: Record<string, unknown>,
  ...children: ChildNode[]
) {
  const childNodes = children.flat().map((child) => {
    if (typeof child === 'string') {
      return {
        type: 'TEXT_ELEMENT',
        props: { nodeValue: child },
        children: [],
      };
    }
    return child;
  });

  return {
    type,
    props,
    children: childNodes,
  };
}

export default createElement;
