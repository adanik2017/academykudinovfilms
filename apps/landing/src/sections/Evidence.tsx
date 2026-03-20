'use client'

import { useEffect, useRef } from 'react'

const rows = [
  { target: 21, suffix: '', label: 'Проект в портфолио', desc: 'От 30-секундного клипа до короткометражки — каждый модуль заканчивается реальной работой' },
  { target: 50, suffix: '+', label: 'ИИ-инструментов', desc: 'Видеогенерация, звук, языковые модели, автоматизация — всё, что определяет индустрию прямо сейчас' },
  { target: 10, suffix: 'x', label: 'Быстрее продакшн', desc: 'То, что требовало команду и месяцы — ты делаешь один за дни. ИИ заменяет целую студию' },
  { target: 5, suffix: '', label: 'Академий', desc: 'Видео, звук, режиссура, LLM и закрытая CLASSIFIED-программа — полная вертикаль навыков' },
]

export function Evidence() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const animated = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const row = entry.target as HTMLElement
            row.classList.add('opacity-100', 'translate-y-0')
            row.classList.remove('opacity-0', 'translate-y-[30px]')

            // Анимация счётчика
            const counter = row.querySelector('[data-target]') as HTMLElement
            if (counter && !animated.has(counter.dataset.target!)) {
              animated.add(counter.dataset.target!)
              const target = parseInt(counter.dataset.target!)
              let current = 0
              const step = Math.max(1, Math.ceil(target / 30))
              const interval = setInterval(() => {
                current = Math.min(current + step, target)
                counter.textContent = String(current)
                if (current >= target) clearInterval(interval)
              }, 30)
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    el.querySelectorAll('[data-row]').forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-[1000px] px-10 py-[100px] max-sm:px-5 max-sm:py-[60px]" ref={containerRef}>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
        {rows.map((row, i) => (
          <div
            key={i}
            data-row
            className="flex items-center gap-8 border-b border-white/[0.04] py-10 opacity-0 translate-y-[30px] transition-all duration-600 max-sm:flex-col max-sm:gap-3 max-sm:text-center"
          >
            <div className="min-w-[160px] text-right font-accent text-[clamp(80px,12vw,130px)] leading-[0.85] text-amber drop-shadow-[0_0_80px_rgba(232,146,74,0.2)] transition-colors duration-600 max-sm:min-w-0 max-sm:text-center">
              <span data-target={row.target}>0</span>
              {row.suffix && <span className="text-[0.5em] text-amber/70">{row.suffix}</span>}
            </div>
            <div className="flex-1">
              <div className="font-display text-[clamp(18px,3vw,28px)] font-bold uppercase tracking-[0.03em] leading-[1.2] mb-1.5">
                {row.label}
              </div>
              <div className="text-[13px] leading-[1.6] text-white/[0.32] max-w-[340px] max-sm:max-w-none">
                {row.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
