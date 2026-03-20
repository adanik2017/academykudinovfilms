import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2 px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.12em]">KUDINOV FILMS</p>
          <p className="mt-1 text-xs font-light text-muted">Онлайн-академия ИИ-кинопроизводства</p>
        </div>
        <div className="flex gap-6 text-xs font-light text-muted">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Конфиденциальность
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Соглашение
          </Link>
          <Link href="/consent" className="transition-colors hover:text-white">
            Согласие на ПД
          </Link>
        </div>
        <p className="text-[10px] text-muted">
          © {new Date().getFullYear()} ИП Кудинов Даниил
        </p>
      </div>
    </footer>
  )
}
