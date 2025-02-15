import { VNode } from '../../react/createElement/types'
import { isFunction } from '../../shared/utils'

function render(vnode: VNode, container: Element) {
  const dom = createDom(vnode)
  container.appendChild(dom)
  return dom
}

function createDom(vnode: VNode): Node {
  // 处理文本节点
  if (vnode.type === 'text') {
    return document.createTextNode(vnode.props.nodeValue)
  }

  // 处理函数组件
  if (isFunction(vnode.type)) {
    return createComponent(vnode)
  }

  // 处理普通 DOM 元素
  const dom = document.createElement(vnode.type as string)
  
  // 设置属性
  Object.entries(vnode.props).forEach(([key, value]) => {
    if (key === 'children') return
    if (key === 'style' && typeof value === 'object') {
      Object.assign(dom.style, value)
    } else if (key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase()
      dom.addEventListener(eventName, value)
    } else if (key === 'className') {
      dom.setAttribute('class', value)
    } else {
      dom.setAttribute(key, value)
    }
  })

  // 递归处理子节点
  if (vnode.props.children) {
    vnode.props.children.forEach(child => {
      render(child, dom)
    })
  }

  return dom
}

function createComponent(vnode: VNode): Node {
  const component = vnode.type as Function
  const props = vnode.props
  const renderedVNode = component(props)
  return createDom(renderedVNode)
}

export default render 