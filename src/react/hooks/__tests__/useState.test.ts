import { describe, it, expect, beforeEach } from 'vitest';
import { useState } from '../useState';
import { hookState } from '../hookState';

describe('useState', () => {
  beforeEach(() => {
    hookState.hooks = [];
    hookState.currentHook = 0;
    hookState.currentComponent = null;
  });

  it('should initialize with the given value', () => {
    const [state] = useState(10);
    expect(state).toBe(10);
  });

  it('should handle function as initial state', () => {
    const [state] = useState(() => 20);
    expect(state).toBe(20);
  });

  it('should update state with new value', () => {
    const [_, setState] = useState(0);
    setState(1);
    hookState.currentHook = 0;
    const [newState] = useState(0);
    expect(newState).toBe(1);
  });

  it('should update state with function', () => {
    const [_, setState] = useState(0);
    setState(prev => prev + 1);
    hookState.currentHook = 0;
    const [newState] = useState(0);
    expect(newState).toBe(1);
  });

  it('should handle multiple state updates', () => {
    const [_, setState] = useState(0);
    setState(1);
    setState(2);
    setState(prev => prev + 1);
    hookState.currentHook = 0;
    const [newState] = useState(0);
    expect(newState).toBe(3);
  });
}); 