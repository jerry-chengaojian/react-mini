import { createElement } from '@/react'
import { render } from '@/react-dom'

// 创建一个简单的函数组件
function Welcome(props: { name: string }) {
  return createElement('h1', null, `Hello, ${props.name}`)
}

// 创建根组件
const app = createElement(
  'div',
  { className: 'container' },
  createElement(Welcome, { name: 'React Mini' }),
  createElement('p', null, 'This is a minimal React implementation.')
)

// 渲染到 DOM
const container = document.getElementById('app')
if (container) {
  render(app, container)
}
