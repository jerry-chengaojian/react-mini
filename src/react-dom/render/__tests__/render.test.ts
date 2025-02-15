import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import render from '../index'
import createElement from '@/react/createElement'

describe('render', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (container.parentNode === document.body) {
      document.body.removeChild(container)
    }
    container.innerHTML = ''
  })

  it('should render simple DOM element', () => {
    const vnode = createElement('div')
    render(vnode, container)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('should render text node', () => {
    const vnode = createElement('div', null, 'Hello')
    render(vnode, container)
    expect(container.firstChild?.textContent).toBe('Hello')
  })

  it('should render element with props', () => {
    const vnode = createElement('div', { className: 'test', id: 'myDiv' })
    render(vnode, container)
    const element = container.firstChild as HTMLDivElement
    expect(element.className).toBe('test')
    expect(element.id).toBe('myDiv')
  })

  it('should render element with style', () => {
    const vnode = createElement('div', { 
      style: { color: 'red', fontSize: '14px' } 
    })
    render(vnode, container)
    const element = container.firstChild as HTMLDivElement
    expect(element.style.color).toBe('red')
    expect(element.style.fontSize).toBe('14px')
  })

  it('should render element with event listener', () => {
    let clicked = false
    const handleClick = () => { clicked = true }
    const vnode = createElement('button', { onClick: handleClick })
    render(vnode, container)
    const button = container.firstChild as HTMLButtonElement
    button.click()
    expect(clicked).toBe(true)
  })

  it('should render nested children', () => {
    const vnode = createElement('div', null,
      createElement('span', null, 'Hello'),
      createElement('span', null, 'World')
    )
    render(vnode, container)
    expect(container.firstChild?.childNodes.length).toBe(2)
    expect(container.firstChild?.childNodes[0].textContent).toBe('Hello')
    expect(container.firstChild?.childNodes[1].textContent).toBe('World')
  })

  it('should render function component', () => {
    function Welcome(props: { name: string }) {
      return createElement('h1', null, `Hello, ${props.name}`)
    }
    const vnode = createElement(Welcome, { name: 'World' })
    render(vnode, container)
    expect(container.firstChild).toBeInstanceOf(HTMLHeadingElement)
    expect(container.firstChild?.textContent).toBe('Hello, World')
  })
}) 