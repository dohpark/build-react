import createElement from '@react/createElement';

export function jsx(elementTag: string, props: Record<string, any>) {
  const { children, ...restProps } = props;
  return createElement(elementTag, restProps, children);
}

export function jsxs(elementTag: string, props: Record<string, any>) {
  const { children, ...restProps } = props;
  return createElement(elementTag, restProps, children);
}
