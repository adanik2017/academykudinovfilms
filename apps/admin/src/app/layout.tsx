import type { Metadata } from 'next'
import { Oswald, Inter, Bebas_Neue } from 'next/font/google'
import { ToastProvider } from '@kf/ui'
import { AdminNav } from '@/components/AdminNav'
import './globals.css'

const oswald = Oswald({ subsets: ['cyrillic', 'latin'], variable: '--font-display', display: 'swap' })
const inter = Inter({ subsets: ['cyrillic', 'latin'], variable: '--font-body', display: 'swap' })
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-accent', display: 'swap' })

export const metadata: Metadata = {
  title: 'Админка — KUDINOV FILMS Academy',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable} ${bebasNeue.variable}`}>
      <body className="bg-background font-body text-white antialiased">
        <div className="flex min-h-screen">
          <AdminNav />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
        <ToastProvider />
      </body>
    </html>
  )
}
