import createElement from '@react/createElement';
import { increaseCurrentIndex } from './state';

export function jsx(type: string | Function, props: Record<string, unknown>) {
  const { children, ...restProps } = props;

  if (typeof type === 'function') {
    increaseCurrentIndex();
    return type();
  }
  return createElement(type, restProps, children);
}

export function jsxs(type: string | Function, props: Record<string, unknown>) {
  return jsx(type, props);
}
