'use client'

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="font-display text-lg font-semibold uppercase">Ошибка</h2>
      <p className="text-sm text-white/30">Что-то пошло не так</p>
      <button onClick={reset} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs transition-all hover:bg-white/[0.06]" type="button">Повторить</button>
    </div>
  )
}
