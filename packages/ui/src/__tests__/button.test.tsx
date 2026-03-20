import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('рендерит текст', () => {
    render(<Button>Нажми</Button>)
    expect(screen.getByText('Нажми')).toBeDefined()
  })

  it('применяет variant primary по умолчанию', () => {
    render(<Button>Тест</Button>)
    const btn = screen.getByText('Тест')
    expect(btn.className).toContain('bg-amber')
  })

  it('применяет variant secondary', () => {
    render(<Button variant="secondary">Тест</Button>)
    const btn = screen.getByText('Тест')
    expect(btn.className).toContain('bg-white/5')
  })

  it('применяет variant danger', () => {
    render(<Button variant="danger">Удалить</Button>)
    const btn = screen.getByText('Удалить')
    expect(btn.className).toContain('text-red')
  })

  it('disabled', () => {
    render(<Button disabled>Отключён</Button>)
    const btn = screen.getByText('Отключён') as HTMLButtonElement
    expect(btn.disabled).toBe(true)
  })
})
