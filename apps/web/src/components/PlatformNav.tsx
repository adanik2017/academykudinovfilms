'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut } from '@kf/auth/client'

interface Props {
  userName?: string
  userInitials?: string
}

export function PlatformNav({ userName, userInitials }: Props) {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navLinks = [
    { href: '/dashboard', label: 'Дашборд' },
    { href: '/program', label: 'Программа' },
    { href: '/feed', label: 'Лента' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[10002] flex h-[52px] items-center border-b border-white/[0.06] bg-[rgba(7,7,9,0.9)] px-5 backdrop-blur-[24px]">
      <Link href="/dashboard" className="font-display text-[17px] font-bold uppercase tracking-[0.12em]">
        KUDINOV FILMS
      </Link>
      <span className="ml-2.5 rounded border border-red/[0.22] bg-red/10 px-2.5 py-1 text-[9px] font-light uppercase tracking-[0.14em] text-red">
        Academy
      </span>

      {/* Ссылки (десктоп) */}
      <div className="ml-7 flex gap-4 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs font-light tracking-[0.06em] transition-colors ${
              pathname.startsWith(link.href) ? 'text-white' : 'text-white/[0.32] hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Аватар */}
      <div className="relative ml-auto">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-amber/30 bg-amber/10 font-display text-[11px] text-amber transition-all hover:border-amber/45 hover:bg-amber/[0.18]"
          type="button"
        >
          {userInitials ?? 'S'}
        </button>

        {dropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[180px] animate-[navDropIn_0.15s_ease-out] rounded-xl border border-white/10 bg-[rgba(14,14,14,0.98)] p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-[20px]">
              <div className="px-3.5 py-2.5 text-xs font-light text-white/50">
                {userName ?? 'Студент'}
              </div>
              <div className="mx-2.5 my-1 h-px bg-white/[0.07]" />
              <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-xs font-light text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white">
                Дашборд
              </Link>
              <Link href="/feed" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-xs font-light text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white">
                Лента
              </Link>
              <div className="mx-2.5 my-1 h-px bg-white/[0.07]" />
              <button
                onClick={async () => { await signOut(); window.location.href = '/login' }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-xs font-light text-white/70 transition-colors hover:bg-white/[0.06] hover:text-red"
                type="button"
              >
                Выйти
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
