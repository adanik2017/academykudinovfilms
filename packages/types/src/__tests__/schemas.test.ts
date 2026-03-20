import { describe, it, expect } from 'vitest'
import {
  loginSchema, registerSchema, createAcademySchema,
  createTariffSchema, createEventSchema, createPostSchema,
} from '../schemas'

describe('loginSchema', () => {
  it('проходит с валидными данными', () => {
    const result = loginSchema.safeParse({ email: 'test@test.com', password: '123456' })
    expect(result.success).toBe(true)
  })

  it('ошибка при невалидном email', () => {
    const result = loginSchema.safeParse({ email: 'не-email', password: '123456' })
    expect(result.success).toBe(false)
  })

  it('ошибка при коротком пароле', () => {
    const result = loginSchema.safeParse({ email: 'test@test.com', password: '12345' })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  const valid = { name: 'Тест', email: 'a@b.com', password: '12345678', agreeTerms: true as const, agreeData: true as const }

  it('проходит с валидными данными', () => {
    expect(registerSchema.safeParse(valid).success).toBe(true)
  })

  it('ошибка без согласия', () => {
    expect(registerSchema.safeParse({ ...valid, agreeTerms: false }).success).toBe(false)
  })

  it('ошибка при коротком имени', () => {
    expect(registerSchema.safeParse({ ...valid, name: 'A' }).success).toBe(false)
  })
})

describe('createAcademySchema', () => {
  it('проходит с названием', () => {
    expect(createAcademySchema.safeParse({ name: 'Академия' }).success).toBe(true)
  })

  it('ошибка без названия', () => {
    expect(createAcademySchema.safeParse({ name: '' }).success).toBe(false)
  })

  it('ошибка при невалидном цвете', () => {
    expect(createAcademySchema.safeParse({ name: 'Тест', color: 'красный' }).success).toBe(false)
  })

  it('проходит с валидным цветом', () => {
    expect(createAcademySchema.safeParse({ name: 'Тест', color: '#e8924a' }).success).toBe(true)
  })
})

describe('createTariffSchema', () => {
  it('проходит', () => {
    expect(createTariffSchema.safeParse({ name: 'Оператор', price: 34900 }).success).toBe(true)
  })

  it('ошибка при отрицательной цене', () => {
    expect(createTariffSchema.safeParse({ name: 'Тест', price: -100 }).success).toBe(false)
  })
})

describe('createEventSchema', () => {
  it('проходит', () => {
    expect(createEventSchema.safeParse({ title: 'Урок', event_date: '2026-03-20' }).success).toBe(true)
  })

  it('ошибка при невалидной дате', () => {
    expect(createEventSchema.safeParse({ title: 'Урок', event_date: '20.03.2026' }).success).toBe(false)
  })
})

describe('createPostSchema', () => {
  it('проходит', () => {
    expect(createPostSchema.safeParse({ content: 'Мой пост' }).success).toBe(true)
  })

  it('ошибка при пустом content', () => {
    expect(createPostSchema.safeParse({ content: '' }).success).toBe(false)
  })
})
