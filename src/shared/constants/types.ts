// 虚拟DOM节点类型
export type VNode = {
  type: string | Function
  props: Record<string, any>
  children: VNode[]
}

// 组件Props类型
export type Props = {
  children?: VNode[]
  [key: string]: any
} 