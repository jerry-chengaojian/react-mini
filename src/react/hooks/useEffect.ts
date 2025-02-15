import { hookState } from './hookState';
import { Effect } from './types';

export function useEffect(callback: () => void | (() => void), deps?: any[]) {
  const { hooks, currentHook } = hookState;
  
  // 初始化 effect hook
  if (currentHook >= hooks.length) {
    hooks[currentHook] = {
      state: {
        deps,
        cleanup: undefined,
        hasRun: false
      },
      queue: [],
    };
  }

  const hook = hooks[currentHook];
  const effect = hook.state as Effect;
  
  // 检查依赖项是否变化
  const depsChanged = !deps || !effect.deps || 
    deps.length !== effect.deps.length ||
    deps.some((dep, i) => dep !== effect.deps[i]);

  if (depsChanged || !effect.hasRun) {
    // 执行清理函数
    if (effect.cleanup) {
      effect.cleanup();
    }
    
    // 执行 effect 并保存清理函数
    const cleanup = callback();
    effect.cleanup = cleanup;
    effect.deps = deps;
    effect.hasRun = true;
  }

  hookState.currentHook++;
} 