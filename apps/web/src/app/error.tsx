'use client'

import { Button } from '@kf/ui'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">
        Что-то пошло не так
      </h1>
      <p className="text-sm text-muted">Произошла ошибка. Попробуйте ещё раз.</p>
      <Button onClick={reset}>Повторить</Button>
    </div>
  )
}
