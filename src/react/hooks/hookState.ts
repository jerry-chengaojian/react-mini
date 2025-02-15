import { HookState } from './types';

export const hookState: HookState = {
  hooks: [],
  currentHook: 0,
  currentComponent: null,
};

export function resetHookState(component: Function) {
  hookState.currentHook = 0;
  hookState.currentComponent = component;
} 