# API 文档

欢迎使用我们的 React-like 库的 API 文档。本文档提供了所有主要 API 的详细说明。

## 核心 API

### createElement

用于创建虚拟 DOM 元素。

```typescript
createElement(
  type: string | Function,
  props?: Props | null,
  ...children: Child[]
): VNode
```

#### 参数

- `type`: 元素类型。可以是 HTML 标签名或函数组件
- `props`: 元素属性对象
- `children`: 子元素列表

#### 示例

```typescript
// 创建 DOM 元素
createElement("div", { className: "container" }, "Hello");

// 创建函数组件
createElement(Welcome, { name: "React" });

// 创建嵌套元素
createElement(
  "div",
  { className: "container" },
  createElement(Welcome, { name: "React Mini" }),
  createElement("p", null, "This is a minimal React implementation.")
);
```

### render

将虚拟 DOM 渲染到真实 DOM 容器中，或更新已存在的 DOM。

```typescript
render(vnode: VNode, container: Element, oldDom?: Node): Node
```

#### 参数

- `vnode`: 虚拟 DOM 节点
- `container`: 真实 DOM 容器
- `oldDom`: (可选) 需要更新的已存在 DOM 节点

#### 示例

```typescript
// 首次渲染
const app = createElement("div", null, "Hello World");
render(app, document.getElementById("root"));

// 更新已存在的 DOM
const updatedApp = createElement("div", null, "Updated Content");
render(updatedApp, document.getElementById("root"), existingDom);
```

## 组件

### 函数组件

函数组件是接收 props 并返回 React 元素的函数。

```typescript
interface Props {
  [key: string]: any;
}

function Component(props: Props): VNode;
```

#### 示例

```typescript
function Welcome(props: { name: string }) {
  return createElement("h1", null, `Hello, ${props.name}`);
}
```

## 类型定义

### VNode

虚拟 DOM 节点的类型定义。

```typescript
type VNode = {
  type: string | Function;
  props: Props;
  key: string | null;
  ref: any;
};
```

### Props

组件属性的类型定义。

```typescript
type Props = {
  children?: VNode[];
  [key: string]: any;
};
```

### Child

子节点的类型定义。

```typescript
type Child = VNode | string | number | boolean | null | undefined;
```

## 特殊处理

### 属性处理

render 函数会对以下特殊属性进行处理：

- `className`: 会被转换为 DOM 元素的 `class` 属性
- `style`: 当值为对象时，会被直接应用到元素的 style 属性
- 事件处理器: 以 `on` 开头的属性会被处理为事件监听器（如 `onClick` 会被转换为 `click` 事件）

### 子节点处理

createElement 会对子节点进行标准化处理：

- 字符串和数字会被转换为文本节点
- null、undefined 和 boolean 值会被忽略
- VNode 对象会被直接使用
- 嵌套数组会被自动扁平化（如 `[1, [2, 3], 4]` 会被处理为 `[1, 2, 3, 4]`）

## Hooks

### useState

用于在函数组件中添加状态管理的 Hook。

```typescript
function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
```

#### 参数

- `initialState`: 初始状态值或返回初始状态的函数

#### 返回值

返回一个数组，包含：

- 当前状态值
- 更新状态的函数

#### 示例

```typescript
// 基础用法
function Counter() {
  const [count, setCount] = useState(0);
  return createElement(
    "button",
    { onClick: () => setCount(count + 1) },
    `Count: ${count}`
  );
}

// 使用函数初始化
function ExpensiveInitialState() {
  const [state, setState] = useState(() => expensiveComputation());
  // ...
}

// 使用函数更新
function Counter() {
  const [count, setCount] = useState(0);
  return createElement(
    "button",
    { onClick: () => setCount((prev) => prev + 1) },
    `Count: ${count}`
  );
}
```
