import { VNode } from '../../react/createElement/types'
import { isFunction } from '../../shared/utils'
import { hookState, createUpdateTrigger } from '../../react/hooks/hookState'

function render(vnode: VNode, container: Element, oldDom?: Node) {
  if (oldDom) {
    // 如果存在旧节点，执行更新
    return updateDom(oldDom, vnode)
  }
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
  let currentDom: Node

  // 创建更新触发器
  hookState.scheduleUpdate = createUpdateTrigger({
    type: component,
    props,
    updateDOM: (newVNode: VNode) => {
      const newDom = createDom(newVNode)
      currentDom.parentNode?.replaceChild(newDom, currentDom)
      currentDom = newDom
      return newDom
    }
  })
  
  const renderedVNode = component(props)
  currentDom = createDom(renderedVNode)
  return currentDom
}

// 添加更新 DOM 的函数
function updateDom(oldDom: Node, newVNode: VNode): Node {
  if (newVNode.type === 'text') {
    if (oldDom.nodeType === Node.TEXT_NODE) {
      if (oldDom.nodeValue !== newVNode.props.nodeValue) {
        oldDom.nodeValue = newVNode.props.nodeValue
      }
      return oldDom
    }
    const newDom = createDom(newVNode)
    oldDom.parentNode?.replaceChild(newDom, oldDom)
    return newDom
  }

  if (isFunction(newVNode.type)) {
    return updateComponent(oldDom, newVNode)
  }

  if (!(oldDom instanceof HTMLElement)) {
    const newDom = createDom(newVNode)
    oldDom.parentNode?.replaceChild(newDom, oldDom)
    return newDom
  }

  // 更新属性
  updateAttributes(oldDom as HTMLElement, newVNode.props)

  // 更新子节点
  updateChildren(oldDom, newVNode.props.children || [])

  return oldDom
}

// 添加更新属性的函数
function updateAttributes(dom: HTMLElement, newProps: Record<string, any>) {
  // 移除所有旧属性
  Array.from(dom.attributes).forEach(attr => {
    if (attr.name === 'class') return // className 特殊处理
    if (!newProps.hasOwnProperty(attr.name) && !attr.name.startsWith('on')) {
      dom.removeAttribute(attr.name)
    }
  })

  // 移除旧的事件监听器
  const oldEventListeners = (dom as any)._eventListeners || {}
  Object.entries(oldEventListeners).forEach(([eventName, listener]) => {
    dom.removeEventListener(eventName, listener as EventListener)
  })
  ;(dom as any)._eventListeners = {}

  // 设置新属性
  Object.entries(newProps).forEach(([key, value]) => {
    if (key === 'children') return
    if (key === 'style' && typeof value === 'object') {
      Object.assign(dom.style, value)
    } else if (key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase()
      const eventListener = value as EventListener
      
      // 移除旧的事件监听器
      const oldListener = (dom as any)._eventListeners?.[eventName]
      if (oldListener) {
        dom.removeEventListener(eventName, oldListener)
      }
      
      // 添加新的事件监听器
      dom.addEventListener(eventName, eventListener)
      ;(dom as any)._eventListeners = {
        ...((dom as any)._eventListeners || {}),
        [eventName]: eventListener
      }
    } else if (key === 'className') {
      dom.setAttribute('class', value)
    } else {
      dom.setAttribute(key, value)
    }
  })
}

// 添加更新子节点的函数
function updateChildren(parentDom: Node, newChildren: VNode[]) {
  const oldChildren = Array.from(parentDom.childNodes)
  
  // 简单的子节点更新策略：逐个更新或替换
  newChildren.forEach((newChild, index) => {
    const oldChild = oldChildren[index]
    if (oldChild) {
      updateDom(oldChild, newChild)
    } else {
      const newDom = createDom(newChild)
      parentDom.appendChild(newDom)
    }
  })

  // 移除多余的旧节点
  while (parentDom.childNodes.length > newChildren.length) {
    parentDom.removeChild(parentDom.lastChild!)
  }
}

function updateComponent(oldDom: Node, newVNode: VNode): Node {
  const component = newVNode.type as Function
  const props = newVNode.props
  const renderedVNode = component(props)
  return updateDom(oldDom, renderedVNode)
}

export default render 