'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Newspaper, User } from 'lucide-react'

const tabs = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Главная' },
  { href: '/program', icon: BookOpen, label: 'Программа' },
  { href: '/feed', icon: Newspaper, label: 'Лента' },
  { href: '/profile', icon: User, label: 'Профиль' },
]

export function BottomTabs() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-x-0 bottom-0 z-[10002] hidden border-t border-white/5 bg-[rgba(8,8,10,0.96)] backdrop-blur-[24px] max-md:flex" style={{ paddingBottom: 'max(4px, env(safe-area-inset-bottom))' }}>
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href)
        const Icon = tab.icon
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative flex flex-1 flex-col items-center gap-0.5 pb-1 pt-1.5 text-[9px] font-normal tracking-[0.02em] transition-colors ${
              isActive ? 'text-amber' : 'text-white/25'
            }`}
          >
            {isActive && (
              <span className="absolute -top-px left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-b bg-amber shadow-[0_0_8px_rgba(232,146,74,0.3)]" />
            )}
            <Icon size={22} strokeWidth={1.4} />
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
