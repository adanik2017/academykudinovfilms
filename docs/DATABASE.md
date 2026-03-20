# База данных

> База данных уже развёрнута и работает на сервере через Docker.
> **НЕ переустанавливать, НЕ пересоздавать таблицы, НЕ трогать Docker Compose Supabase.**
> Новый проект просто подключается к существующей БД с теми же ключами.

---

## Supabase (уже работает на сервере)

| Что | Где |
|-----|-----|
| Studio (управление БД) | http://5.129.203.13:3333 |
| API | http://5.129.203.13:8000 |
| Логин/пароль Studio | см. ACCESS.md |
| Ключи API | см. ACCESS.md |

Файл с доступами: `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/docs/ACCESS.md`

---

## 25 таблиц

| Группа | Таблицы |
|--------|---------|
| Контент | `academies`, `modules`, `lessons`, `lesson_content`, `lesson_materials` |
| Пользователи | `users`, `user_progress`, `user_gamification`, `user_achievements` |
| Геймификация | `achievements`, `quests`, `certificates`, `portfolio_items` |
| Социальное | `posts`, `likes`, `comments`, `notifications` |
| Финансы | `payments`, `refunds`, `subscriptions`, `tariffs` |
| Платформа | `tenants`, `calendar_events`, `analytics_events` |
| Лендинг | `landing_tool_categories`, `landing_tools` |

SQL схема: `../platform/supabase/migrations/001_schema.sql` → скопировать в `packages/db/supabase/migrations/`

---

## Как правильно подключаться (НОВЫЙ подход)

В старом проекте был один клиент для всего. В новом — три разных.

> Переменные `env.NEXT_PUBLIC_SUPABASE_URL` и т.д. берутся из `@t3-oss/env-nextjs` (валидация через zod), а не из `process.env` напрямую. См. `docs/RULES.md` → Переменные окружения.

### 1. Серверный клиент (для страниц и Server Actions)

Используется в Server Components и Server Actions. Работает с cookies для авторизации.

```tsx
// packages/db/src/client.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabase() {
  const cookieStore = cookies()
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

### 2. Браузерный клиент (для интерактивных компонентов)

Используется в `'use client'` компонентах (подписки в реальном времени, формы).

```tsx
// packages/db/src/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createBrowserSupabase() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
```

### 3. Service Role клиент (для админских операций)

Имеет полный доступ, обходит RLS. Только на сервере, только для admin-операций.

```tsx
import { createClient } from '@supabase/supabase-js'

export function createServiceSupabase() {
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
  )
}
```

---

## Типизация (автоматическая)

Типы генерируются из реальной БД:

```bash
pnpm db:types
# Это запустит: supabase gen types typescript > packages/db/src/schema.ts
```

Результат — файл `schema.ts` с типами всех таблиц:
- `Database['public']['Tables']['users']['Row']` — тип строки из таблицы users
- `Database['public']['Tables']['users']['Insert']` — тип для вставки
- `Database['public']['Tables']['users']['Update']` — тип для обновления

**НЕ писать типы вручную** для данных из БД. Только генерировать.

---

## Организация запросов

```
packages/db/src/queries/
├── academies.ts      # getAcademies, getAcademyById, createAcademy, updateAcademy, deleteAcademy
├── modules.ts        # getModulesByAcademy, createModule, deleteModule
├── lessons.ts        # getLessonsByModule, getLessonById, createLesson, updateLesson
├── users.ts          # getUserProfile, updateUserProfile
├── posts.ts          # getPosts, createPost, toggleLike
├── tariffs.ts        # getTariffs, createTariff, updateTariff, deleteTariff
├── calendar.ts       # getCalendarEvents, createCalendarEvent
├── subscriptions.ts  # getUserSubscription, getUserAccess
├── gamification.ts   # getUserGamification, getUserProgress
└── landing.ts        # getLandingToolCategories, createLandingTool...
```

Каждая функция:
1. Создаёт серверный клиент Supabase
2. Делает типизированный запрос
3. Возвращает `{ data, error }` с автоматическими типами

---

## Ключевые паттерны в БД

- **Soft delete**: колонка `deleted_at`. Запросы фильтруют `.is('deleted_at', null)`
- **Timestamps**: `created_at`, `updated_at` на всех таблицах
- **Auth связка**: `users.auth_id` → ID из Supabase Auth
- **RLS**: 65 политик. Студент видит только своё, админ — всё
- **is_admin()**: SQL функция для проверки роли в RLS

### Роли

```
superadmin     — владелец платформы (полный доступ)
tenant_admin   — учитель (своя академия)
curator        — куратор (проверка работ)
mentor         — ментор (помощь студентам)
student        — студент
```

---

## Переменные окружения для Supabase

```env
# .env.local (НЕ коммитить!)
NEXT_PUBLIC_SUPABASE_URL=http://5.129.203.13:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=<из ACCESS.md>
SUPABASE_SERVICE_ROLE_KEY=<из ACCESS.md>
```

Значения ключей → `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/docs/ACCESS.md`
