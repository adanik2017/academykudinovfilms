import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import { ToastProvider } from '@kf/ui'
import './globals.css'

const oswald = Oswald({ subsets: ['cyrillic', 'latin'], variable: '--font-display', display: 'swap' })
const inter = Inter({ subsets: ['cyrillic', 'latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  title: 'KUDINOV FILMS Academy',
  description: 'Платформа обучения ИИ-кинопроизводству',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-background font-body text-white antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
