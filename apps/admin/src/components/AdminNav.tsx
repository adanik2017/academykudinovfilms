'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, DollarSign, Users, BookOpen,
  Calendar, Settings, Megaphone,
} from 'lucide-react'
import { cn } from '@kf/ui'

const sections = [
  {
    label: 'Управление',
    items: [
      { href: '/dashboard', label: 'Дашборд', icon: LayoutDashboard },
      { href: '/finance', label: 'Финансы', icon: DollarSign },
      { href: '/students', label: 'Студенты', icon: Users },
      { href: '/calendar', label: 'Календарь', icon: Calendar },
    ],
  },
  {
    label: 'Контент',
    items: [
      { href: '/content', label: 'Контент-хаб', icon: BookOpen },
      { href: '/landing-editor', label: 'Лендинг', icon: Megaphone },
    ],
  },
  {
    label: 'Система',
    items: [
      { href: '/settings', label: 'Настройки', icon: Settings },
    ],
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <aside className="flex w-56 flex-col border-r border-border bg-surface-2 px-3 py-4">
      <Link href="/dashboard" className="mb-6 px-2 font-display text-sm font-bold uppercase tracking-[0.12em]">
        KF Admin
      </Link>

      {sections.map((section) => (
        <div key={section.label} className="mb-4">
          <p className="mb-2 px-2 text-[9px] font-medium uppercase tracking-[0.1em] text-muted">
            {section.label}
          </p>
          {section.items.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'mb-0.5 flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs font-light transition-colors',
                  isActive ? 'bg-white/5 text-white' : 'text-muted hover:bg-white/[0.03] hover:text-white',
                )}
              >
                <Icon size={16} strokeWidth={1.5} />
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
