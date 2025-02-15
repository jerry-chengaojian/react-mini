import { hookState } from './hookState';
import { Dispatch, SetStateAction } from './types';

export function useState<S>(initialState: S): [S, Dispatch<SetStateAction<S>>] {
  const { hooks, currentHook } = hookState;
  
  // 初始化 hook
  if (currentHook >= hooks.length) {
    hooks[currentHook] = {
      state: typeof initialState === 'function' ? (initialState as Function)() : initialState,
      queue: [],
    };
  }

  const hook = hooks[currentHook];

  // 处理更新队列
  if (hook.queue.length > 0) {
    hook.queue.forEach((action: SetStateAction<S>) => {
      hook.state = typeof action === 'function'
        ? (action as (prev: S) => S)(hook.state)
        : action;
    });
    hook.queue = [];
  }

  // 创建 dispatch 函数
  const setState: Dispatch<SetStateAction<S>> = (action: SetStateAction<S>) => {
    hook.queue.push(action);
  };

  hookState.currentHook++;
  return [hook.state, setState];
} 