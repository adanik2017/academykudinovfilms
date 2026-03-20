# KUDINOV FILMS Academy

Онлайн-академия ИИ-кинопроизводства.

## Структура

```
apps/
  landing/   — Лендинг (порт 3000)
  web/       — Платформа студента (порт 3001)
  admin/     — Админ-панель (порт 3002)

packages/
  ui/        — Общие UI-компоненты
  db/        — Supabase клиент и запросы
  auth/      — Авторизация
  types/     — Общие типы
  config/    — Конфигурации (ESLint, TypeScript, Tailwind)
```

## Запуск

```bash
pnpm install
pnpm dev
```

## Стек

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Turborepo
