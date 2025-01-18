import createElement from '@react/createElement';

export function jsx(type: string | Function, props: Record<string, unknown>) {
  const { children, ...restProps } = props;

  if (typeof type === 'string') {
    return createElement(type, restProps, children);
  }

  return type();
}

export function jsxs(type: string | Function, props: Record<string, unknown>) {
  const { children, ...restProps } = props;

  if (typeof type === 'string') {
    return createElement(type, restProps, children);
  }

  return type();
}
