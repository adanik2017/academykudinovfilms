# Миграция из старого проекта

> Старый проект: `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/platform`
> Что взять, что переписать, что выбросить.

---

## Переносится без изменений

| Что | Откуда | Куда |
|-----|--------|------|
| SQL схема БД | `../platform/supabase/migrations/001_schema.sql` | `packages/db/supabase/migrations/001_schema.sql` |
| Фоновое видео | `../platform/public/video/dna-video.mp4` | `apps/landing/public/video/` |

---

## Переписывается с нуля (берём только логику)

### Запросы к БД

| Старый файл | Новый файл | Что берём |
|-------------|-----------|-----------|
| `../platform/src/lib/api.ts` | `packages/db/src/queries/*.ts` | Какие таблицы запрашиваются, какие фильтры. Переписать с типами из `schema.ts`, разбить по папкам |
| `../platform/src/lib/supabase.ts` | `packages/db/src/client.ts` | Ничего — написать с нуля: серверный + браузерный клиент |
| `../platform/src/lib/auth.ts` | `packages/auth/src/` | Логику signUp/signIn/signOut. Добавить серверную проверку. Убрать localStorage |
| `../platform/src/lib/access.ts` | `packages/db/src/queries/subscriptions.ts` | Логику проверки тарифа → доступ к академиям |

### UI компоненты

| Старый файл | Новый файл | Что берём |
|-------------|-----------|-----------|
| `../platform/src/components/ui/Card.tsx` | `packages/ui/src/card.tsx` | Визуальную идею. Переписать на Tailwind |
| `../platform/src/components/ui/Button.tsx` | `packages/ui/src/button.tsx` | Варианты кнопок. Переписать на Tailwind |
| `../platform/src/components/ui/Modal.tsx` | `packages/ui/src/modal.tsx` | Идею модалки. Переписать на Tailwind |
| `../platform/src/components/layout/Shell.tsx` | `apps/web/src/app/layout.tsx` | Структуру (навигация + боковая панель + контент) |
| `../platform/src/components/layout/Nav.tsx` | Отдельно для web и admin | Структуру навигации |

### Страницы

| Старый файл | Куда | Что берём |
|-------------|------|-----------|
| `../platform/src/app/page.tsx` + `sections/*` | `apps/landing/` | Тексты, структуру секций |
| `../platform/src/app/(platform)/dashboard/page.tsx` | `apps/web/src/app/dashboard/` | UI структуру (карточки, списки) |
| `../platform/src/app/(platform)/program/page.tsx` | `apps/web/src/app/program/` | Фильтры, карточки академий, замок по тарифу |
| `../platform/src/app/(platform)/lesson/[id]/page.tsx` | `apps/web/src/app/lesson/[id]/` | Видеоплеер, боковая панель |
| `../platform/src/app/(platform)/profile/[id]/page.tsx` | `apps/web/src/app/profile/[id]/` | Структуру профиля |
| `../platform/src/app/(platform)/feed/page.tsx` | `apps/web/src/app/feed/` | Посты, лайки |

### Админка — разбиение файла-монстра

`../platform/src/app/(platform)/admin/page.tsx` (3 797 строк) → отдельные страницы:

| Что было в одном файле | Куда разносится |
|------------------------|----------------|
| Dashboard tab | `apps/admin/src/app/dashboard/page.tsx` |
| Finance tab | `apps/admin/src/app/finance/page.tsx` |
| Students tab | `apps/admin/src/app/students/page.tsx` |
| Content Hub | `apps/admin/src/app/content/` (3 уровня вложенности) |
| Tariffs/Tools/Program | `apps/admin/src/app/landing-editor/page.tsx` |
| Calendar | `apps/admin/src/app/calendar/page.tsx` |
| Settings | `apps/admin/src/app/settings/page.tsx` |
| CustomModal | `packages/ui/src/modal.tsx` |
| Всё остальное | Отдельные страницы |

---

## Удаляется полностью (НЕ переносить)

| Что | Почему |
|-----|--------|
| `src/styles/*.css` (все 9 файлов) | Заменяются Tailwind CSS |
| `src/lib/security.ts` | Фейковая защита — не работает |
| `src/lib/data/` (моковые данные) | Не нужны при серверном рендеринге |
| `src/app/api/v1/` (13 пустых файлов) | Заменяются Server Actions |
| Inline CSS в `layout.tsx` (164 строки `!important`) | Tailwind responsive |
| `src/components/layout/Cursor.tsx` | Кастомный курсор — мешает accessibility |

---

## Дизайн-токены для переноса

Из `../platform/src/styles/globals.css` в Tailwind theme:

```
--bg: #080808         →  bg-background
--surface: #0e0e0e    →  bg-surface
--surface2: #161616   →  bg-surface-2
--amber: #e8924a      →  text-amber / bg-amber
--green: #5ecf7e      →  text-green
--blue: #7eb8f7       →  text-blue
--red: #f27171        →  text-red
--purple: #c97ef7     →  text-purple
--dim: rgba(255,255,255,.35) →  text-muted
```

---

## Порядок работы

### Фаза 1: Фундамент
1. Подключить git к GitHub (`adanik2017/academykudinovfilms`)
2. Инициализировать монорепо (pnpm + Turborepo)
3. Настроить `packages/config` (ESLint, TypeScript, Tailwind, Prettier)
4. Создать `packages/db` — перенести SQL, настроить клиент, сгенерировать типы
5. Создать `packages/types`
6. Создать `packages/ui` — базовые компоненты на Tailwind
7. Создать `packages/auth`
8. Настроить `.env.local` с ключами из ACCESS.md
9. Настроить `.github/workflows/deploy.yml` для автодеплоя
10. Первый коммит и пуш

### Фаза 2: Лендинг (apps/landing)
1. Создать Next.js приложение с SSG
2. Перенести секции как Server Components + Tailwind
3. Юридические страницы (privacy, terms, consent)
4. SEO метаданные (metadata, sitemap, robots)

### Фаза 3: Платформа (apps/web)
1. Auth middleware
2. Dashboard → Program → Lesson → Profile → Feed
3. Каждая страница — Server Component

### Фаза 4: Админка (apps/admin)
1. Admin middleware (проверка роли)
2. Каждая вкладка — отдельная страница
3. CRUD через Server Actions

### Фаза 5: Тесты и мониторинг
1. Vitest (unit тесты для packages)
2. Playwright (e2e для критических путей)
3. Мониторинг (Sentry)

---

## Бизнес-контекст

Полезные файлы для понимания проекта:
- `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/docs/ROADMAP.md` — план по этапам
- `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/docs/FEATURES_BACKLOG.md` — 300 фич
- `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/docs/COMPANY_ROADMAP.md` — бизнес-план
