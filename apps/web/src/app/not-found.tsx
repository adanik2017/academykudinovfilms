import Link from 'next/link'
import { Button } from '@kf/ui'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-display text-4xl font-bold">404</h1>
      <p className="text-sm text-muted">Страница не найдена</p>
      <Button asChild>
        <Link href="/dashboard">На главную</Link>
      </Button>
    </div>
  )
}
