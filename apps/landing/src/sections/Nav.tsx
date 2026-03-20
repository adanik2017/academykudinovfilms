'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onResize() { if (window.innerWidth > 640) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function scrollTo(id: string) {
    setMobileOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[10002] flex h-[52px] items-center border-b border-white/[0.07] bg-[rgba(8,8,8,0.85)] px-10 backdrop-blur-[20px] max-sm:px-5">
        <div className="font-display text-[16px] font-bold uppercase tracking-[0.12em]">
          KUDINOV FILMS
        </div>

        <nav className="ml-auto flex gap-1.5 max-sm:hidden">
          {[
            { id: 'program', label: 'Программа' },
            { id: 'pricing', label: 'Тарифы' },
            { id: 'faq', label: 'FAQ' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
              className="rounded-md px-3 py-1.5 text-[10px] uppercase tracking-[0.08em] text-white/[0.32] transition-colors hover:text-white/70"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#pricing"
          onClick={(e) => { e.preventDefault(); scrollTo('pricing') }}
          className="ml-4 rounded-md border border-amber/50 bg-transparent px-[22px] py-[7px] font-display text-xs font-medium uppercase tracking-[0.08em] text-amber transition-all hover:border-amber hover:bg-amber hover:text-black max-sm:hidden"
        >
          В Академию
        </a>

        <button
          className="ml-4 hidden flex-col items-center justify-center gap-[5px] p-1.5 max-sm:flex"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
          type="button"
        >
          <span className={`block h-[1.5px] w-5 rounded-sm bg-white transition-transform duration-300 ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block h-[1.5px] w-5 rounded-sm bg-white transition-all duration-200 ${mobileOpen ? 'scale-x-0 opacity-0' : ''}`} />
          <span className={`block h-[1.5px] w-5 rounded-sm bg-white transition-transform duration-300 ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </header>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[52px] bottom-0 z-[10000] flex flex-col bg-[rgba(7,7,9,0.97)] p-5 backdrop-blur-[20px]">
          {[
            { id: 'program', label: 'Программа' },
            { id: 'pricing', label: 'Тарифы' },
            { id: 'faq', label: 'FAQ' },
          ].map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id) }} className="rounded-[10px] px-4 py-3.5 text-[15px] font-light text-white/60 transition hover:bg-white/5 hover:text-white">{item.label}</a>
          ))}
          <div className="my-2 h-px bg-white/[0.06]" />
          <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-[10px] px-4 py-3.5 text-[15px] font-light text-white/60 transition hover:bg-white/5 hover:text-white">Войти</Link>
          <Link href="/register" onClick={() => setMobileOpen(false)} className="rounded-[10px] px-4 py-3.5 text-[15px] font-light text-amber transition hover:bg-white/5">Регистрация</Link>
        </div>
      )}
    </>
  )
}
