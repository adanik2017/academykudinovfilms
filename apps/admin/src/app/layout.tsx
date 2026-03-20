import type { Metadata } from 'next'
import { Oswald, Inter, Bebas_Neue } from 'next/font/google'
import { cookies } from 'next/headers'
import { ToastProvider } from '@kf/ui'
import { getSession } from '@kf/auth/server'
import { AdminNav } from '@/components/AdminNav'
import './globals.css'

const oswald = Oswald({ subsets: ['cyrillic', 'latin'], variable: '--font-display', display: 'swap' })
const inter = Inter({ subsets: ['cyrillic', 'latin'], variable: '--font-body', display: 'swap' })
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-accent', display: 'swap' })

export const metadata: Metadata = {
  title: 'Админка — KUDINOV FILMS Academy',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  const initials = session?.name?.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) ?? 'A'

  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable} ${bebasNeue.variable}`}>
      <body className="bg-background font-body text-white antialiased">
        {/* Верхний навбар */}
        <header className="fixed inset-x-0 top-0 z-[100] flex h-[52px] items-center border-b border-white/[0.06] bg-[rgba(7,7,9,0.9)] px-5 backdrop-blur-[24px]">
          <span className="font-display text-[15px] font-bold uppercase tracking-[0.12em]">KUDINOV FILMS</span>
          <span className="ml-2 rounded border border-red/[0.22] bg-red/10 px-2 py-[2px] text-[8px] font-medium uppercase tracking-[0.1em] text-red">ADMIN</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[11px] text-white/30">{session?.name ?? 'Админ'}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-amber/30 bg-amber/10 font-display text-[11px] text-amber">
              {initials}
            </div>
          </div>
        </header>

        <div className="flex min-h-screen pt-[52px]">
          <AdminNav />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
        <ToastProvider />
      </body>
    </html>
  )
}
