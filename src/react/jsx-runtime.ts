import createElement from '@react/createElement';

export function jsx(type: string | Function, props: Record<string, unknown>) {
  const { children, ...restProps } = props;

  if (typeof type === 'function') {
    return type({ children, ...restProps });
  }
  return createElement(type, restProps, children);
}

export function jsxs(type: string | Function, props: Record<string, unknown>) {
  return jsx(type, props);
}
