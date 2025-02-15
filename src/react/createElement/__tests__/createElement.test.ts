import { describe, it, expect } from 'vitest'
import createElement from '../index'

describe('createElement', () => {
  it('should create element with tag name', () => {
    const element = createElement('div')
    expect(element.type).toBe('div')
    expect(element.props).toEqual({})
  })

  it('should create element with props', () => {
    const element = createElement('div', { className: 'test' })
    expect(element.props.className).toBe('test')
  })

  it('should handle children', () => {
    const element = createElement('div', null, 'Hello')
    expect(element.props.children?.[0].type).toBe('text')
    expect(element.props.children?.[0].props.nodeValue).toBe('Hello')
  })

  it('should handle null and boolean children', () => {
    const element = createElement('div', null, null, true, false)
    expect(element.props.children).toEqual([])
  })
}) 