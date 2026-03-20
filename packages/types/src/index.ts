// Общие типы — НЕ для данных из БД (те генерируются в @kf/db)
// Здесь — только бизнес-логика, формы, UI

export type ActionResult<T> =
  | { data: T; error: null }
  | { data: null; error: string }

export type Role = 'superadmin' | 'tenant_admin' | 'curator' | 'mentor' | 'student'

export type TariffName = 'operator' | 'director' | 'studio'

export type LessonType = 'video' | 'practice' | 'project' | 'test'

export type PostType = 'homework' | 'film' | 'creative'

export type EventType = 'lesson' | 'deadline' | 'call' | 'webinar' | 'quest'

export * from './schemas'
