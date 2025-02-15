// 判断是否为函数组件
export const isFunction = (value: any): value is Function => {
  return typeof value === 'function'
}

// 判断是否为对象
export const isObject = (value: any): value is object => {
  return typeof value === 'object' && value !== null
} 