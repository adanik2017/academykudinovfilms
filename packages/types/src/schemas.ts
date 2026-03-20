import { z } from 'zod'

// Схемы валидации форм

export const loginSchema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
  referral: z.string().optional(),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: 'Примите условия' }) }),
  agreeData: z.literal(true, { errorMap: () => ({ message: 'Дайте согласие на обработку ПД' }) }),
})

export const createAcademySchema = z.object({
  name: z.string().min(1, 'Введите название'),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Неверный цвет').optional(),
})

export const createModuleSchema = z.object({
  academy_id: z.string().uuid('Неверный ID академии'),
  title: z.string().min(1, 'Введите название'),
})

export const createLessonSchema = z.object({
  module_id: z.string().uuid('Неверный ID модуля'),
  title: z.string().min(1, 'Введите название'),
  type: z.enum(['video', 'practice', 'project', 'test']).optional(),
})

export const createTariffSchema = z.object({
  name: z.string().min(1, 'Введите название'),
  price: z.number().min(0, 'Цена не может быть отрицательной'),
  features: z.array(z.string()).optional(),
  accent: z.string().optional(),
})

export const createEventSchema = z.object({
  title: z.string().min(1, 'Введите название'),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Формат: YYYY-MM-DD'),
  event_time: z.string().optional(),
  type: z.enum(['lesson', 'deadline', 'call', 'webinar', 'quest']).optional(),
  description: z.string().optional(),
})

export const createPostSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, 'Напишите что-нибудь'),
  type: z.enum(['homework', 'film', 'creative']).optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreateAcademyInput = z.infer<typeof createAcademySchema>
export type CreateModuleInput = z.infer<typeof createModuleSchema>
export type CreateLessonInput = z.infer<typeof createLessonSchema>
export type CreateTariffInput = z.infer<typeof createTariffSchema>
export type CreateEventInput = z.infer<typeof createEventSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
