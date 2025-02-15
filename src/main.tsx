import { createElement, useState, useEffect } from '@/react'
import { render } from '@/react-dom'

// 使用 JSX 语法的函数组件
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>
}

function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log('handleClick', count)
    setCount(count + 1)
  }
  
  useEffect(() => {
    document.title = `Count is ${count}`;
    // 清理函数
    return () => {
      document.title = 'React Mini';
    };
  }, [count]); // 依赖于 count
  
  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}

// 使用 JSX 语法创建根组件
const app = (
  <div className="container">
    <Welcome name="React Mini" />
    <Counter />
    <p>This is a minimal React implementation.</p>
  </div>
)

// 渲染到 DOM
const root = document.getElementById('app')
if (!root) {
  throw new Error('Root element not found')
}
render(app, root) 