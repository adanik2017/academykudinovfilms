'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Play, User, Newspaper } from 'lucide-react'

const items = [
  { href: '/dashboard', icon: LayoutDashboard },
  { href: '/program', icon: BookOpen },
  { href: '/feed', icon: Newspaper },
]

export function PlatformSidebar({ userId }: { userId?: string }) {
  const pathname = usePathname()

  const allItems = [
    ...items,
    ...(userId ? [{ href: `/profile/${userId}`, icon: User }] : []),
  ]

  return (
    <aside className="fixed left-0 top-[52px] bottom-0 z-[90] flex w-[56px] flex-col items-center gap-1 border-r border-white/[0.04] bg-[rgba(7,7,9,0.82)] py-3 backdrop-blur-[16px] max-md:hidden">
      {allItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex h-9 w-9 items-center justify-center rounded-[9px] transition-all ${
              isActive
                ? 'bg-white/[0.07] text-white'
                : 'text-white/[0.32] hover:bg-white/[0.04] hover:text-white/70'
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
          </Link>
        )
      })}
    </aside>
  )
}
