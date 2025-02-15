import { HookState } from './types';

export const hookState: HookState = {
  hooks: [],
  currentHook: 0,
  currentComponent: null,
  scheduleUpdate: null
};

export function resetHookState(component: Function) {
  hookState.currentHook = 0;
  hookState.currentComponent = component;
}

export function createUpdateTrigger(fiber: any) {
  return () => {
    hookState.currentHook = 0;
    // 触发组件重新渲染
    requestAnimationFrame(() => {
      const newVNode = fiber.type(fiber.props);
      fiber.updateDOM(newVNode);
    });
  };
} 