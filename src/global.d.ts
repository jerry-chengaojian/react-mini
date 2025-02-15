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
  const useState: <S>(initialState: S) => [S, (action: S | ((prev: S) => S)) => void];
  const useEffect: (callback: () => void | (() => void), deps?: any[]) => void;
  export { createElement, useState, useEffect };
} 