import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useEffect } from '../useEffect';
import { hookState } from '../hookState';

describe('useEffect', () => {
  beforeEach(() => {
    hookState.hooks = [];
    hookState.currentHook = 0;
    hookState.currentComponent = null;
  });

  it('should run effect on mount', () => {
    const effect = vi.fn();
    useEffect(effect);
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should run cleanup before re-running effect', () => {
    const cleanup = vi.fn();
    const effect = vi.fn(() => cleanup);
    
    // 首次运行
    useEffect(effect, [1]);
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(0);
    
    // 依赖项改变，重新运行
    hookState.currentHook = 0;
    useEffect(effect, [2]);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('should not re-run effect if deps have not changed', () => {
    const effect = vi.fn();
    const deps = [1, 2, 3];
    
    // 首次运行
    useEffect(effect, deps);
    expect(effect).toHaveBeenCalledTimes(1);
    
    // 依赖项未改变
    hookState.currentHook = 0;
    useEffect(effect, deps);
    expect(effect).toHaveBeenCalledTimes(1);
  });
}); 