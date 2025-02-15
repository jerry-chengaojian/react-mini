import { HookState } from './types';

// Add this type definition at the top of the file
type UpdateTrigger = {
  type: Function;
  props: any;
  updateDOM: (vnode: any) => void;
};

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

export function createUpdateTrigger({ type, props, updateDOM }: UpdateTrigger) {
  return () => {
    // 重置 hook 索引
    hookState.currentHook = 0;
    
    // 处理所有 hooks 中的更新队列
    hookState.hooks.forEach(hook => {
      if (hook.queue && hook.queue.length > 0) {
        // 处理队列中的所有更新
        hook.queue.forEach(action => {
          hook.state = typeof action === 'function'
            ? (action as Function)(hook.state)
            : action;
        });
        // 清空队列
        hook.queue = [];
      }
    });

    // 使用更新后的状态重新渲染
    const newVNode = type(props);
    updateDOM(newVNode);
  };
} 