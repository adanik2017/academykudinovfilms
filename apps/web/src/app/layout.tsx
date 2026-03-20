import type { Metadata } from 'next'
import { Oswald, Inter, Bebas_Neue } from 'next/font/google'
import { ToastProvider } from '@kf/ui'
import './globals.css'

const oswald = Oswald({ subsets: ['cyrillic', 'latin'], variable: '--font-display', display: 'swap' })
const inter = Inter({ subsets: ['cyrillic', 'latin'], variable: '--font-body', display: 'swap' })
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-accent', display: 'swap' })

export const metadata: Metadata = {
  title: 'KUDINOV FILMS Academy',
  description: 'Платформа обучения ИИ-кинопроизводству',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable} ${bebasNeue.variable}`}>
      <body className="bg-background font-body text-white antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
