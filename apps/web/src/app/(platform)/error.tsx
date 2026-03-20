'use client'

export default function PlatformError({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="font-display text-lg font-semibold uppercase">Что-то пошло не так</h2>
      <p className="text-sm text-white/30">Произошла ошибка. Попробуйте ещё раз.</p>
      <button onClick={reset} className="rounded-lg border border-amber/30 bg-amber/10 px-4 py-2 font-display text-xs font-semibold uppercase text-amber transition-all hover:bg-amber/20" type="button">
        Повторить
      </button>
    </div>
  )
}
