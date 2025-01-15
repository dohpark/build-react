type ChildNode = ElementNode | null;

interface ElementNode {
  type: string;
  props: Record<string, any>;
  children: ChildNode[];
}

function createElement(
  type: string,
  props: Record<string, any>,
  ...children: ChildNode[]
) {
  const childNodes = children.map((child) => {
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
    props: {
      ...props,
      children: childNodes,
    },
  };
}

export default createElement;
