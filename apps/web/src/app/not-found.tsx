import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-display text-4xl font-bold">404</h1>
      <p className="text-sm text-muted">Страница не найдена</p>
      <Link
        href="/dashboard"
        className="inline-flex h-10 items-center rounded-lg bg-amber px-4 text-sm font-medium text-black hover:bg-amber/90"
      >
        На главную
      </Link>
    </div>
  )
}
