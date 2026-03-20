# Архитектура нового проекта

> Новый проект: `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/academykudinovfilms`
> Старый проект (справка): `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/platform`

---

## Структура

```
academykudinovfilms/
├── package.json                        # Корень монорепо
├── pnpm-workspace.yaml                 # Настройка pnpm workspaces
├── turbo.json                          # Turborepo (параллельные сборки)
├── .gitignore
├── .env.example                        # Пример переменных окружения (без секретов)
├── CLAUDE.md                           # Инструкции для Claude Code
│
├── .github/
│   └── workflows/
│       ├── ci.yml                      # Проверка кода при каждом пуше
│       └── deploy.yml                  # Автоматический деплой на сервер
│
├── docs/                               # Документация
│   ├── ANALYSIS.md                     # Проблемы старого проекта
│   ├── ARCHITECTURE.md                 # Этот файл
│   ├── MIGRATION.md                    # Что брать из старого проекта
│   ├── RULES.md                        # Стандарты кода
│   └── DATABASE.md                     # Работа с базой данных
│
├── apps/
│   ├── landing/                        # Лендинг (публичная страница)
│   ├── web/                            # Платформа студента
│   └── admin/                          # Админ-панель
│
├── packages/
│   ├── ui/                             # Общие UI-компоненты
│   ├── db/                             # Работа с базой данных
│   ├── auth/                           # Авторизация
│   ├── types/                          # Общие типы
│   └── config/                         # Общие настройки
│       ├── eslint/index.mjs            # Shared ESLint config
│       ├── typescript/base.json        # Strict TypeScript base
│       ├── typescript/nextjs.json      # Для apps (extends base)
│       ├── typescript/library.json     # Для packages (extends base)
│       └── tailwind/preset.ts          # Shared Tailwind theme (цвета, шрифты)
│
└── tooling/
    └── prettier.config.mjs             # Prettier config
```

---

## apps/landing — Лендинг

**Для чего**: Публичная маркетинговая страница. Должна быстро грузиться и хорошо индексироваться Google.
**Рендеринг**: Статическая генерация (SSG) — страница собирается заранее, отдаётся мгновенно.
**Порт разработки**: http://localhost:3000

```
apps/landing/
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Шрифты, метаданные, OG-теги для соцсетей
│   │   ├── page.tsx                    # Главная страница (секции)
│   │   ├── privacy/page.tsx            # Политика конфиденциальности
│   │   ├── terms/page.tsx              # Пользовательское соглашение
│   │   └── consent/page.tsx            # Согласие на обработку ПД
│   │
│   ├── sections/                       # Секции лендинга
│   │   ├── Hero.tsx                    # Главный экран + видео
│   │   ├── Concept.tsx                 # Концепция
│   │   ├── Program.tsx                 # Программа (данные из Supabase)
│   │   ├── Tools.tsx                   # Инструменты (данные из Supabase)
│   │   ├── Pricing.tsx                 # Тарифы (данные из Supabase)
│   │   ├── Evidence.tsx                # Отзывы / доказательства
│   │   ├── FAQ.tsx                     # Частые вопросы
│   │   ├── Footer.tsx                  # Футер
│   │   └── Nav.tsx                     # Навигация
│   │
│   └── components/                     # Клиентские компоненты (анимации)
│       ├── ScrollReveal.tsx
│       └── MobileMenu.tsx
```

---

## apps/web — Платформа студента

**Для чего**: Личный кабинет студента — уроки, прогресс, лента работ, профиль.
**Рендеринг**: SSR — данные загружаются на сервере при каждом запросе.
**Auth**: Middleware проверяет авторизацию, неавторизованных отправляет на /login.
**Порт разработки**: http://localhost:3001

```
apps/web/
├── package.json
├── next.config.ts
├── middleware.ts                        # Проверка авторизации
├── tailwind.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Общая обёртка (навигация + боковая панель)
│   │   ├── error.tsx                   # Страница ошибки
│   │   ├── loading.tsx                 # Загрузка
│   │   ├── not-found.tsx               # 404
│   │   │
│   │   ├── (auth)/                     # Страницы входа (без боковой панели)
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   ├── dashboard/                  # Главная студента
│   │   │   ├── page.tsx                # Данные грузятся на сервере
│   │   │   ├── loading.tsx             # Скелетон загрузки
│   │   │   └── _components/            # Интерактивные части
│   │   │
│   │   ├── program/                    # Программа курса
│   │   ├── lesson/[id]/               # Урок (видеоплеер)
│   │   ├── profile/[id]/             # Профиль студента
│   │   └── feed/                       # Лента работ
│   │
│   └── lib/
│       └── utils.ts
```

---

## apps/admin — Админ-панель

**Для чего**: Управление контентом, студентами, финансами, лендингом.
**Auth**: Проверяет роль `superadmin`, обычных студентов не пускает.
**Порт разработки**: http://localhost:3002

**Главное отличие от старого проекта**: каждая вкладка — отдельная страница с URL (а не один файл на 3800 строк).

```
apps/admin/
├── package.json
├── next.config.ts
├── middleware.ts                        # Проверка роли superadmin
├── tailwind.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Боковое меню + основная область
│   │   ├── page.tsx                    # Перенаправление → /dashboard
│   │   │
│   │   ├── dashboard/page.tsx          # KPI и метрики
│   │   ├── finance/page.tsx            # Финансовая аналитика
│   │   ├── students/                   # Управление студентами
│   │   │   ├── page.tsx                # Список
│   │   │   └── [id]/page.tsx           # Карточка студента
│   │   ├── content/                    # CRUD: академии → модули → уроки
│   │   │   ├── page.tsx                # Список академий
│   │   │   └── [academyId]/
│   │   │       ├── page.tsx            # Модули академии
│   │   │       └── [moduleId]/page.tsx # Уроки модуля
│   │   ├── landing-editor/page.tsx     # Управление лендингом
│   │   ├── quests/page.tsx             # Квесты
│   │   ├── calendar/page.tsx           # Календарь
│   │   └── settings/page.tsx           # Настройки
│   │
│   ├── features/                       # Модули по фичам
│   │   ├── students/
│   │   │   ├── components/             # UI этой фичи
│   │   │   ├── hooks/                  # Логика этой фичи
│   │   │   └── actions.ts              # Серверные действия (CRUD)
│   │   ├── content/
│   │   ├── finance/
│   │   └── landing-editor/
│   │
│   └── components/                     # Общие компоненты админки
│       ├── AdminShell.tsx              # Обёртка (меню + контент)
│       ├── AdminNav.tsx                # Боковое меню
│       └── ConfirmDialog.tsx           # Диалог подтверждения
```

---

## packages/ui — Общие UI-компоненты

Компоненты которые используются во всех трёх приложениях:

```
packages/ui/
├── src/
│   ├── button.tsx              # Кнопка (несколько вариантов)
│   ├── card.tsx                # Карточка
│   ├── modal.tsx               # Модальное окно
│   ├── input.tsx               # Поля ввода
│   ├── badge.tsx               # Бейдж/статус
│   ├── toggle.tsx              # Переключатель
│   ├── kpi-card.tsx            # Карточка KPI
│   ├── progress-bar.tsx        # Прогресс-бар
│   ├── toast.tsx               # Уведомления
│   ├── skeleton.tsx            # Скелетоны загрузки
│   ├── data-table.tsx          # Таблица данных
│   ├── cn.ts                   # Утилита для классов (clsx + tailwind-merge)
│   └── index.ts
```

---

## packages/db — Работа с базой данных

```
packages/db/
├── src/
│   ├── client.ts               # Создание клиента Supabase (серверный + браузерный)
│   ├── schema.ts               # АВТО-СГЕНЕРИРОВАННЫЕ типы из БД
│   ├── queries/                # Запросы по доменам
│   │   ├── academies.ts
│   │   ├── modules.ts
│   │   ├── lessons.ts
│   │   ├── users.ts
│   │   ├── posts.ts
│   │   ├── tariffs.ts
│   │   ├── calendar.ts
│   │   ├── subscriptions.ts
│   │   ├── gamification.ts
│   │   └── landing.ts
│   └── index.ts
│
└── supabase/
    └── migrations/
        └── 001_schema.sql      # Из старого проекта (25 таблиц)
```

---

## packages/auth — Авторизация

```
packages/auth/
├── src/
│   ├── server.ts               # Серверная проверка (middleware, страницы)
│   ├── client.ts               # Клиентская (вход, регистрация, выход)
│   ├── middleware.ts            # Фабрика middleware для apps
│   ├── guards.tsx              # React компоненты (<AdminGuard>)
│   └── types.ts                # Роли, сессия, пользователь
```

---

## Деплой (GitHub Actions → Сервер)

```
Разработчик пушит код → GitHub → GitHub Actions → Сервер (5.129.203.13)
```

`.github/workflows/deploy.yml` должен:
1. Собрать проект (`pnpm build`)
2. Скопировать на сервер через SSH
3. Перезапустить приложение (PM2 или Docker)

Данные для SSH → `/Users/daniil/Desktop/Academy Kudinov Films/Academy films/docs/ACCESS.md`

---

## Порты разработки

| Приложение | Порт | URL |
|-----------|------|-----|
| Лендинг | 3000 | http://localhost:3000 |
| Платформа | 3001 | http://localhost:3001 |
| Админка | 3002 | http://localhost:3002 |

---

## Дизайн-тема (Tailwind)

Цвета и шрифты из старого проекта, переведённые в Tailwind:

```
Цвета:
  surface:   #0e0e0e    (фон карточек)
  surface-2: #161616    (фон секций)
  surface-3: #1a1a1a    (фон элементов)
  border:    rgba(255,255,255,0.06)
  dim:       rgba(255,255,255,0.35) (приглушённый текст)
  amber:     #e8924a    (основной акцент)
  green:     #5ecf7e
  blue:      #7eb8f7
  red:       #f27171
  purple:    #c97ef7

Шрифты:
  Oswald     — заголовки (font-display)
  Inter      — основной текст (font-body)
  Bebas Neue — акцентный (font-accent)
```
