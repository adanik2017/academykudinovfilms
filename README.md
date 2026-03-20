# KUDINOV FILMS Academy

Онлайн-академия ИИ-кинопроизводства. Монорепо с 3 приложениями и 5 общими пакетами.

## Структура

```
apps/
  landing/   — Лендинг (порт 4000 на сервере)
  web/       — Платформа студента (порт 3001)
  admin/     — Админ-панель (порт 3002)

packages/
  ui/        — 12 UI-компонентов (Button, Card, Modal, Input, Badge, Toggle, KpiCard, ProgressBar, Toast, Skeleton, DataTable, cn)
  db/        — Supabase клиент (серверный + браузерный + service role) и 10 query-файлов
  auth/      — Авторизация (сессии, middleware, OAuth)
  types/     — Общие типы + zod-схемы валидации
  config/    — ESLint, TypeScript (strict), Tailwind CSS 4 тема
```

## Запуск

```bash
pnpm install
cp .env.example apps/landing/.env.local  # + заполнить ключами
cp .env.example apps/web/.env.local
cp .env.example apps/admin/.env.local
pnpm dev
```

## Порты

| Приложение | Локально | Сервер |
|-----------|----------|--------|
| Лендинг | 3000 | 4000 |
| Платформа | 3001 | 3001 |
| Админка | 3002 | 3002 |

## Деплой

Push в `main` → GitHub Actions → автосборка → деплой на сервер 5.129.203.13 (PM2 + standalone).

## Стек

Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS 4 · Supabase · Turborepo · pnpm · Vitest · Playwright

## Тесты

```bash
pnpm --filter @kf/ui test     # 9 тестов UI-компонентов
pnpm --filter @kf/types test   # 16 тестов zod-схем
```
