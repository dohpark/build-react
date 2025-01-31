export interface VirtualDom {
  type: string;
  props?: Record<string, unknown>;
  children: VirtualDom[];
}
