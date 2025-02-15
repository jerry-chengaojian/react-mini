declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element {
    type: string | Function;
    props: any;
    key: string | null;
    ref: any;
  }
}

declare function createElement(
  type: string | Function,
  props?: any,
  ...children: any[]
): JSX.Element;

declare module '@/react' {
  const createElement: typeof globalThis.createElement;
  export { createElement };
} 