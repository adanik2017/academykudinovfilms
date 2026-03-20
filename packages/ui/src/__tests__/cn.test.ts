import { describe, it, expect } from 'vitest'
import { cn } from '../cn'

describe('cn', () => {
  it('объединяет классы', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('убирает конфликты tailwind', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('поддерживает условия', () => {
    expect(cn('base', false && 'hidden', true && 'visible')).toBe('base visible')
  })

  it('работает с undefined', () => {
    expect(cn('a', undefined, 'b')).toBe('a b')
  })
})
