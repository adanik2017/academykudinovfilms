import Link from 'next/link'
import { Button } from '@kf/ui'

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-[var(--spacing-nav-height)] items-center border-b border-border bg-background/90 px-5 backdrop-blur-2xl">
      <Link href="/" className="font-display text-[17px] font-bold uppercase tracking-[0.12em]">
        KUDINOV FILMS
      </Link>
      <span className="ml-2.5 rounded border border-red/20 bg-red/10 px-2.5 py-1 text-[9px] font-light uppercase tracking-[0.14em] text-red">
        Academy
      </span>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden items-center gap-4 md:flex">
          <a href="#program" className="text-xs font-light tracking-wide text-muted transition-colors hover:text-white">
            Программа
          </a>
          <a href="#pricing" className="text-xs font-light tracking-wide text-muted transition-colors hover:text-white">
            Тарифы
          </a>
          <a href="#faq" className="text-xs font-light tracking-wide text-muted transition-colors hover:text-white">
            FAQ
          </a>
        </div>
        <Button size="sm" asChild>
          <a href="http://localhost:3001/login">Войти</a>
        </Button>
      </div>
    </nav>
  )
}
