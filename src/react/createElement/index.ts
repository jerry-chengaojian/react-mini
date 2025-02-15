import { VNode, Props, Child } from './types'

function createElement(
  type: string | Function,
  props?: Props | null,
  ...children: Child[]
): VNode {
  const normalizedProps: Props = { ...props }
  
  // 处理 children，添加扁平化处理
  if (children.length > 0) {
    normalizedProps.children = flattenChildren(children)
      .map(child => normalizeChild(child))
      .filter(Boolean) as VNode[]
  }

  return {
    type,
    props: normalizedProps,
    key: props?.key ?? null,
    ref: props?.ref ?? null
  }
}

// 添加扁平化函数
function flattenChildren(children: Child[]): Child[] {
  return children.reduce((flat: Child[], child: Child) => {
    if (Array.isArray(child)) {
      flat.push(...flattenChildren(child))
    } else {
      flat.push(child)
    }
    return flat
  }, [])
}

function normalizeChild(child: Child): VNode | null {
  // 处理原始类型
  if (typeof child === 'string' || typeof child === 'number') {
    return createElement('text', { nodeValue: String(child) })
  }

  // 处理 null、undefined 和 boolean
  if (child == null || typeof child === 'boolean') {
    return null
  }

  // VNode 直接返回
  return child as VNode
}

export default createElement 