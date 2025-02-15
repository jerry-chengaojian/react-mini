import { createElement } from '@/react'
import { render } from '@/react-dom'

// 使用 JSX 语法的函数组件
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>
}

// 使用 JSX 语法创建根组件
const app = (
  <div className="container">
    <Welcome name="React Mini" />
    <p>This is a minimal React implementation.</p>
  </div>
)

// 渲染到 DOM
const container = document.getElementById('app')
if (container) {
  render(app, container)
} 