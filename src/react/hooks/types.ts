export type Dispatch<A> = (value: A) => void;
export type SetStateAction<S> = S | ((prevState: S) => S);

export interface Hook {
  state: any;
  queue: any[];
}

export type HookState = {
  hooks: Hook[];
  currentHook: number;
  currentComponent: Function | null;
};

export interface Effect {
  deps?: any[];
  cleanup?: void | (() => void);
  hasRun: boolean;
} 