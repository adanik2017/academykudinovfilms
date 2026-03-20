import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'

const oswald = Oswald({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KUDINOV FILMS — Создавай кино с помощью ИИ',
  description:
    'Онлайн-академия ИИ-кинопроизводства. Научись создавать фильмы с помощью нейросетей — Runway, Midjourney, Suno и других инструментов.',
  openGraph: {
    title: 'KUDINOV FILMS — Создавай кино с помощью ИИ',
    description: 'Онлайн-академия ИИ-кинопроизводства',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-background font-body text-white antialiased">{children}</body>
    </html>
  )
}
