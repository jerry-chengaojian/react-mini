export type Props = {
  [key: string]: any
  children?: VNode[]
}

export type VNode = {
  type: string | Function
  props: Props
  key: string | null
  ref: any
}

export type Child = VNode | string | number | boolean | null | undefined 