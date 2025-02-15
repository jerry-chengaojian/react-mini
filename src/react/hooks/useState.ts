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

  // 创建更新函数
  const setState = (action: SetStateAction<S>) => {
    hook.queue.push(action);
    // 触发更新
    if (hookState.scheduleUpdate) {
      hookState.scheduleUpdate();
    }
  };

  hookState.currentHook++;
  return [hook.state, setState];
} 