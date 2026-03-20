# Стандарты кода

> Эти правила заменяют СТАРЫЕ правила из `../docs/RULES.md`.
> Старые правила привели к плохому проекту. Эти — правильные.

---

## TypeScript

- `strict: true` — всегда
- `any` — **ЗАПРЕЩЁН**. Нет `any`, `as any`, `@ts-ignore`
- `unknown` для ошибок: `catch (error: unknown)`
- Все функции и props — типизированы
- Типы для данных из БД — **ТОЛЬКО** автосгенерированные (`pnpm db:types`)
- `Record<string, unknown>` в аргументах — **ЗАПРЕЩЁН** (всегда конкретный тип)

---

## React — Server First

### По умолчанию — серверный компонент
- Каждый компонент — серверный, пока не нужен `'use client'`
- `'use client'` только для: `useState`, `useEffect`, `onClick`, `onChange`
- Данные грузятся на сервере (в page.tsx)

```tsx
// НЕПРАВИЛЬНО ❌
'use client'
export default function Page() {
  const [data, setData] = useState(null)
  useEffect(() => { fetchData().then(setData) }, [])
  return <List data={data} />
}

// ПРАВИЛЬНО ✅
export default async function Page() {
  const data = await fetchData()
  return <List data={data} />
}
```

### Размеры
- Максимум 300 строк на файл
- Максимум 5 useState в одном компоненте
- Максимум 8 props у компонента

### Мутации (создание, обновление, удаление)
- Только через Server Actions (`'use server'`)
- Возвращают `{ data, error }` с типами
- После мутации — `revalidatePath()` для обновления страницы

---

## Стили — Tailwind CSS

### ЗАПРЕЩЕНО
- `style={{ }}` в JSX — **НОЛЬ исключений**
- Кастомные CSS файлы (`.css`)
- `!important`
- Глобальные CSS классы

### КАК ПРАВИЛЬНО
```tsx
// Базовые стили
<button className="rounded-lg px-4 py-2 bg-amber text-black hover:bg-amber/90">

// Условные стили через cn()
import { cn } from '@kf/ui'
<div className={cn(
  'rounded-lg p-4',
  isActive && 'border-amber',
  isDisabled && 'opacity-50',
)} />

// Responsive (mobile first)
<div className="text-sm md:text-base lg:text-lg">
```

### Единственное исключение для style={}
CSS переменные для динамических значений:
```tsx
<div style={{ '--progress': `${percent}%` } as React.CSSProperties}>
```

---

## Именование

| Тип | Как | Пример |
|-----|-----|--------|
| Компоненты | PascalCase | `StudentCard.tsx` |
| Хуки | useCamelCase | `useStudentFilters.ts` |
| Утилиты | camelCase | `formatDate.ts` |
| Константы | UPPER_SNAKE | `MAX_FILE_SIZE` |
| Пакеты | @kf/kebab | `@kf/ui`, `@kf/db` |
| Папки | kebab-case | `landing-editor/` |
| Обработчики | handle* | `handleSubmit` |
| Callback props | on* | `onSubmit` |
| Boolean | is*/has* | `isLoading`, `hasAccess` |

---

## Компоненты — когда и как разбивать

### Один компонент = одна задача

Компонент делает **одну вещь**. Если не можешь описать его назначение одним предложением — разбивай.

### Когда НУЖНО разбивать (независимо от размера)

- Компонент содержит и UI, и загрузку данных, и бизнес-логику → разнеси
- Больше 8 props → слишком много ответственностей
- Больше 5 useState → вынеси логику в хук
- Один блок UI повторяется 2+ раз → отдельный компонент
- Изменение одной части ломает другую → разделяй
- Можно выделить чисто серверную и чисто клиентскую часть → обязательно разделяй

### Когда НЕ НУЖНО разбивать

- Компонент-оркестратор (собирает несколько частей) — координация это его задача
- Контентные страницы (юридические документы) — длинные из-за текста, не из-за логики
- Разделение создаст circular dependencies или prop drilling через 5 уровней
- Файл < 150 строк с одной ответственностью — не дроби искусственно

### Паттерн: Серверная страница + Клиентские островки

```tsx
// page.tsx — СЕРВЕРНЫЙ (загружает данные)
export default async function StudentsPage() {
  const students = await getStudents()
  const stats = await getStudentStats()

  return (
    <div>
      <h1>Студенты</h1>
      <StatsCards stats={stats} />           {/* серверный — просто отображает */}
      <StudentsTable students={students} />  {/* клиентский — сортировка, фильтры */}
    </div>
  )
}

// _components/StudentsTable.tsx — КЛИЕНТСКИЙ (интерактив)
'use client'
export function StudentsTable({ students }: Props) {
  const [sort, setSort] = useState('name')
  const [filter, setFilter] = useState('')
  // ... интерактивная логика
}
```

### Паттерн: Хук = одна область логики

```tsx
// Один хук — одна задача
useStudentFilters()    // фильтрация и сортировка
useStudentForm()       // форма создания/редактирования
useStudentExport()     // экспорт в CSV

// НЕ ДЕЛАТЬ: один хук на всё
useStudents()          // фильтрация + форма + экспорт + валидация + ...
```

### Лимиты

| Тип файла | Максимум строк | Если больше |
|-----------|---------------|-------------|
| Компонент (UI) | 300 | Разбивай на подкомпоненты |
| Хук | 200 | Разбивай по ответственности |
| Server Action | 100 | Одна функция — один файл не нужен, но функция не должна быть огромной |
| Страница (page.tsx) | 150 | Логику в _components/, данные в queries/ |
| Утилита | 200 | Разбивай по домену |

---

## Структура файлов

### Страница (обязательный набор)
```
app/students/
├── page.tsx              # Данные (серверный). ОБЯЗАТЕЛЬНО
├── loading.tsx           # Скелетон загрузки. ОБЯЗАТЕЛЬНО
├── error.tsx             # Обработка ошибки. ОБЯЗАТЕЛЬНО
└── _components/          # Клиентские интерактивные части
    ├── StudentsTable.tsx
    └── StudentFilters.tsx
```

### Фича (для админки)
```
features/students/
├── components/           # UI компоненты этой фичи
│   ├── StudentsTable.tsx
│   ├── StudentCard.tsx
│   └── StudentFilters.tsx
├── hooks/                # Логика (хуки)
│   └── useStudentFilters.ts
└── actions.ts            # Server Actions (CRUD)
```

### Shared UI компонент (в packages/ui)
```tsx
// Каждый компонент — отдельный файл
// Props интерфейс — рядом с компонентом, НЕ в отдельном types файле

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  // ...
}
```

### Импорты — порядок

```tsx
// 1. React / Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. Внешние библиотеки
import { z } from 'zod'

// 3. Внутренние пакеты (@kf/*)
import { Button, Card } from '@kf/ui'
import { getStudents } from '@kf/db'

// 4. Локальные импорты
import { StudentsTable } from './_components/StudentsTable'
```

### Запрещено
- Файлы больше 300 строк
- Barrel exports (`index.ts`) с 20+ реэкспортами
- Circular dependencies между пакетами
- Относительные импорты за пределы текущего пакета — только `@kf/*`
- Дублирование кода — если повторяется 2+ раз, выноси

---

## Документация проекта

### Обязательные файлы
- `README.md` в корне — как установить, запустить, что это за проект
- `docs/ARCHITECTURE.md` — обновлять при добавлении нового пакета или приложения
- `.env.example` — все переменные окружения (без секретов)

### Правила ведения
- Добавил новый пакет → обнови `docs/ARCHITECTURE.md`
- Добавил новую страницу/роут → обнови README если это важный роут
- Изменил схему БД → обнови `docs/DATABASE.md`
- Комментарии в коде — только где логика неочевидна. Не комментировать очевидное
- Комментарии — на русском, кратко

### НЕ нужно
- Отдельный STRUCTURE.md с деревом каждого файла (это видно в IDE)
- STATUS.md (это видно в git log и issues)
- Комментарии над каждой функцией ("эта функция делает X" — видно из названия)

---

## Обработка ошибок

### Server Actions
```tsx
type ActionResult<T> =
  | { data: T; error: null }
  | { data: null; error: string }

export async function createStudent(input: Input): Promise<ActionResult<Student>> {
  try {
    // ...
    return { data: student, error: null }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка'
    return { data: null, error: message }
  }
}
```

### Обязательно для каждого роута
- `loading.tsx` — скелетон (не спиннер)
- `error.tsx` — страница ошибки с кнопкой "Повторить"
- Сообщения пользователю — на русском

---

## Формы

react-hook-form + zod:

```tsx
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  email: z.string().email('Неверный email'),
})

type FormData = z.infer<typeof schema>
```

---

## Переменные окружения

Валидация через t3-env + zod. НЕ использовать `process.env.SOMETHING!` напрямую.

---

## Accessibility (доступность)

Доступность — не опция, а стандарт. Сайтом пользуются люди с разными возможностями.

### Обязательно
- **Семантический HTML**: `<button>` для действий, `<a>` для навигации, `<nav>`, `<main>`, `<section>`, `<article>` — НЕ `<div onClick>`
- **Атрибут `alt`** на всех `<Image>` — описание изображения. Декоративные: `alt=""`
- **Labels** на всех полях ввода — `<label htmlFor>` или `aria-label`
- **Фокус** — все интерактивные элементы доступны с клавиатуры (Tab, Enter, Escape)
- **Контраст текста** — минимум 4.5:1 для обычного текста, 3:1 для крупного
- **aria-атрибуты** для кастомных компонентов: `aria-expanded`, `aria-hidden`, `role`
- **Escape** закрывает модалки и дропдауны
- **Focus trap** в модальных окнах — Tab не уходит за пределы модалки

### Запрещено
- `<div onClick>` вместо `<button>` — div не фокусируется, не работает с клавиатурой
- Иконки без текста и без `aria-label`
- `outline: none` без замены (убирает видимость фокуса)
- Только цветом обозначать статус (дальтоники не увидят) — добавляй текст или иконку

```tsx
// НЕПРАВИЛЬНО ❌
<div onClick={handleClick} className="cursor-pointer">Удалить</div>

// ПРАВИЛЬНО ✅
<button onClick={handleClick} type="button">Удалить</button>

// НЕПРАВИЛЬНО ❌
<img src="/photo.jpg" />

// ПРАВИЛЬНО ✅
<Image src="/photo.jpg" alt="Студент на площадке" width={400} height={300} />
```

---

## Безопасность

Старый проект блокировал Ctrl+U в браузере. Это не безопасность. Вот реальная:

### Серверная защита (обязательно)
- **Валидация на сервере** — каждый Server Action валидирует входные данные через zod
- **Авторизация в Server Actions** — проверяй сессию в КАЖДОМ action, не полагайся только на middleware
- **Service Role Key** — НИКОГДА на клиенте. Только в серверном коде
- **RLS в Supabase** — включён на всех таблицах (уже есть 65 политик)
- **Rate limiting** — на сервере (middleware или edge function), НЕ на клиенте

```tsx
// Каждый Server Action начинается с проверки авторизации
'use server'
export async function deleteStudent(id: string) {
  const session = await getSession()
  if (!session) throw new Error('Не авторизован')
  if (session.role !== 'superadmin') throw new Error('Нет доступа')

  const input = deleteSchema.parse({ id }) // валидация через zod
  // ... удаление
}
```

### Защита от типичных атак
- **XSS**: React экранирует по умолчанию. НЕ использовать `dangerouslySetInnerHTML`
- **CSRF**: Next.js Server Actions имеют встроенную защиту
- **SQL injection**: Supabase клиент параметризует запросы автоматически
- **Секреты**: только в `.env.local`, файл в `.gitignore`. `NEXT_PUBLIC_` — только для ключей безопасных для клиента

### Запрещено
- Клиентский "rate limiter" (бесполезен — обнуляется при перезагрузке)
- Блокировка Ctrl+U, PrintScreen и т.д. (не работает, раздражает пользователей)
- `dangerouslySetInnerHTML` без санитизации
- Хранение токенов в localStorage (только httpOnly cookies)

---

## Тестирование

### Что тестировать

| Уровень | Инструмент | Что покрывает | Сколько |
|---------|-----------|---------------|---------|
| Unit | Vitest | Утилиты, хуки, zod-схемы, Server Actions | Много |
| Component | Vitest + Testing Library | UI-компоненты из packages/ui | Ключевые |
| E2E | Playwright | Основные пользовательские сценарии | Критические пути |

### Unit-тесты (обязательно для)
- Все zod-схемы валидации
- Все утилитарные функции
- Server Actions (мокаем Supabase)
- Хуки с логикой (не тривиальные useState-обёртки)

### E2E-тесты (обязательно для)
- Регистрация → вход → выход
- Просмотр урока
- CRUD в админке (создать академию → модуль → урок)
- Оплата (когда подключится)

### Где лежат тесты
```
packages/ui/src/__tests__/button.test.tsx      # Рядом с компонентом
packages/db/src/queries/__tests__/users.test.ts
apps/web/tests/e2e/auth.spec.ts               # E2E — в папке tests
apps/admin/tests/e2e/content-crud.spec.ts
```

### Правила
- Тест описывает поведение, не реализацию: `it('показывает ошибку при пустом email')`, НЕ `it('вызывает setError')`
- Один тест = один сценарий
- Не мокать всё подряд — мокай только внешние зависимости (Supabase, fetch)

---

## Управление состоянием

Не всё нужно пихать в useState. Выбирай подходящее место:

| Тип данных | Где хранить | Пример |
|-----------|------------|--------|
| Данные из БД | Server Components (RSC) | Список студентов, уроки, тарифы |
| Фильтры, пагинация | URL searchParams | `?page=2&sort=name&status=active` |
| UI-состояние компонента | useState | Открыт/закрыт dropdown, активная вкладка |
| Глобальный UI (админка) | zustand | Sidebar open/close, текущий фильтр |
| Данные формы | react-hook-form | Поля формы, валидация, dirty state |

### Правила
- **НЕ** хранить в useState то, что можно получить из URL — фильтры, сортировка, пагинация, активная вкладка
- **НЕ** хранить в zustand данные из БД — для этого есть RSC и Server Actions
- **НЕ** дублировать серверные данные в клиентском состоянии — используй `revalidatePath()`
- zustand — **только в админке**, только для UI state. В landing и web — не нужен

```tsx
// Фильтры через URL (ПРАВИЛЬНО ✅)
// URL: /students?status=active&sort=name
export default async function StudentsPage({ searchParams }: { searchParams: { status?: string; sort?: string } }) {
  const students = await getStudents({ status: searchParams.status, sort: searchParams.sort })
  return <StudentsView students={students} />
}

// Фильтры через useState (НЕПРАВИЛЬНО ❌ — теряются при обновлении страницы)
const [status, setStatus] = useState('active')
```

---

## Производительность

### Изображения
- **ВСЕГДА** `next/image` вместо `<img>` — автоматическая оптимизация, lazy loading, responsive
- Указывать `width` и `height` (или `fill`) — предотвращает layout shift
- Формат: WebP/AVIF (Next.js конвертирует автоматически)

```tsx
import Image from 'next/image'

// ПРАВИЛЬНО
<Image src="/hero.jpg" alt="Описание" width={1200} height={600} priority />  // priority для above-the-fold
<Image src="/avatar.jpg" alt="Имя" width={48} height={48} className="rounded-full" />
```

### Шрифты
- `next/font` вместо Google Fonts через `<link>` — нет layout shift, self-hosted
```tsx
import { Oswald, Inter } from 'next/font/google'
const oswald = Oswald({ subsets: ['cyrillic'], variable: '--font-display' })
const inter = Inter({ subsets: ['cyrillic'], variable: '--font-body' })
```

### Загрузка
- `loading.tsx` — скелетоны на каждом route segment
- `dynamic(() => import(...))` для тяжёлых компонентов (графики, редакторы)
- НЕ грузить лишнее — если компонент нужен только на одной странице, не тащи его в shared

### Мемоизация
- `React.memo` — только если компонент рендерится часто с теми же props (списки)
- `useMemo` / `useCallback` — только при реальной проблеме производительности
- НЕ мемоизировать всё подряд "на всякий случай" — это усложняет код без пользы

---

## SEO (для лендинга)

### Метаданные
```tsx
// app/layout.tsx или page.tsx
export const metadata: Metadata = {
  title: 'KUDINOV FILMS — Создавай кино с помощью ИИ',
  description: 'Онлайн-академия ИИ-кинопроизводства...',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og-image.jpg'],
  },
}
```

### Обязательно для лендинга
- `generateMetadata()` для динамических страниц
- `sitemap.ts` — автогенерация sitemap.xml
- `robots.ts` — правила индексации
- Семантическая разметка: `<h1>` один на страницу, иерархия заголовков
- `<meta>` description на каждой странице

---

## Git

### Одна ветка — `main`
Всё в одной ветке. Никаких dev, feature, fix. Просто `main`.

### Коммиты
- Делать после каждого завершённого блока работы
- Понятные сообщения:
```
feat: add student registration page
fix: broken navigation on mobile
refactor: extract StudentCard component
chore: update dependencies
docs: update architecture docs
```

### Push (загрузка на GitHub)
- **НИКОГДА** не пушить без команды пользователя
- После коммита напоминать: *"Сохранил. Загрузить на GitHub?"*
- Пуш в main → GitHub Actions → автодеплой на сервер

---

## Что НЕЛЬЗЯ из старого проекта

> В папке `../docs/RULES.md` есть старые правила. Вот что из них **НЕЛЬЗЯ** повторять:

| Старое правило | Почему плохо | Новое правило |
|---------------|-------------|---------------|
| "CSS кастомный, без фреймворков" | Привело к 5400 строкам хаоса | Tailwind CSS |
| "security.ts — защита контента" | Фейковая защита, не работает | Защита на сервере |
| "Отдельные CSS файлы на страницу" | Конфликты классов, !important | Tailwind утилиты |
| "Supabase API клиент один на всё" | Нет серверного клиента | Серверный + браузерный |
| "API versioning /api/v1/" | 13 пустых заглушек | Server Actions |
| "Кинематографические эффекты (grain, cursor)" | Мешают accessibility и скорости | Только лёгкие анимации |
