'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, DollarSign, Users, Coins,
  TrendingDown, Megaphone, GitBranch, Calendar,
  BookOpen, Swords, Globe,
  MonitorSmartphone, MessageCircle, FileText, Activity,
  Settings, Lock,
} from 'lucide-react'
import { cn } from '@kf/ui'

const sections = [
  {
    label: 'Управление',
    items: [
      { href: '/dashboard', label: 'Дашборд', icon: LayoutDashboard },
      { href: '/finance', label: 'Финансы', icon: DollarSign },
      { href: '/students', label: 'Студенты', icon: Users },
      { href: '/frames', label: 'Фреймы', icon: Coins },
      { href: '/funnel', label: 'Воронка', icon: TrendingDown },
      { href: '/ads', label: 'Реклама', icon: Megaphone },
      { href: '/referrals', label: 'Рефералы', icon: GitBranch },
      { href: '/calendar', label: 'Календарь', icon: Calendar },
    ],
  },
  {
    label: 'Контент',
    items: [
      { href: '/content', label: 'Контент', icon: BookOpen },
      { href: '/quests', label: 'Квесты', icon: Swords },
      { href: '/landing-editor', label: 'Лендинг', icon: Globe },
    ],
  },
  {
    label: 'Платформа',
    items: [
      { href: '/accounts', label: 'Кабинеты', icon: MonitorSmartphone },
      { href: '/telegram', label: 'Telegram', icon: MessageCircle },
      { href: '/pages', label: 'Страницы', icon: FileText },
      { href: '/monitoring', label: 'Мониторинг', icon: Activity, frozen: true },
      { href: '/settings', label: 'Настройки', icon: Settings },
    ],
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <aside className="flex w-56 flex-shrink-0 flex-col border-r border-white/[0.04] bg-[rgba(7,7,9,0.82)] px-3 py-4">
      <Link href="/dashboard" className="mb-6 flex items-center gap-2 px-2">
        <span className="font-display text-sm font-bold uppercase tracking-[0.12em]">KUDINOV FILMS</span>
        <span className="rounded border border-red/[0.22] bg-red/10 px-1.5 py-[2px] text-[7px] font-medium uppercase tracking-[0.1em] text-red">ADMIN</span>
      </Link>

      {sections.map((section) => (
        <div key={section.label} className="mb-4">
          <p className="mb-1.5 px-2 text-[8px] font-medium uppercase tracking-[0.12em] text-white/[0.25]">
            {section.label}
          </p>
          {section.items.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            const frozen = 'frozen' in item && item.frozen
            return (
              <Link
                key={item.href}
                href={frozen ? '#' : item.href}
                className={cn(
                  'mb-[1px] flex items-center gap-2.5 rounded-lg px-2 py-[7px] text-[11px] font-light transition-colors',
                  isActive && !frozen ? 'bg-white/[0.07] text-white' : 'text-white/[0.32] hover:bg-white/[0.03] hover:text-white/60',
                  frozen && 'cursor-not-allowed opacity-40',
                )}
              >
                <Icon size={15} strokeWidth={1.5} />
                {item.label}
                {frozen && <Lock size={9} className="ml-auto" />}
              </Link>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
