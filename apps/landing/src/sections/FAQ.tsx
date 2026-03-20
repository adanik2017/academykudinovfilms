'use client'

import { useState } from 'react'

const faqs = [
  { q: 'Нужен ли опыт в кинопроизводстве?', a: 'Нет, программа начинается с основ. Мы учим с нуля — от идеи до финального монтажа.' },
  { q: 'Какие инструменты ИИ мы будем использовать?', a: 'Runway, Midjourney, Suno, ElevenLabs, ChatGPT, Claude и десятки других. Мы обновляем программу каждый поток.' },
  { q: 'Сколько длится обучение?', a: 'Доступ к материалам — навсегда. Активное обучение с куратором — в рамках потока (обычно 3 месяца).' },
  { q: 'Есть ли возврат?', a: 'Да, полный возврат в течение 14 дней, если обучение не подошло.' },
  { q: 'Как проходят уроки?', a: 'Видеоуроки + практические задания. Каждый урок — конкретный навык. Куратор проверяет работы и даёт обратную связь.' },
  { q: 'Можно ли совмещать с работой?', a: 'Да. Уроки доступны 24/7, проходите в своём темпе. Рекомендуемый ритм — 3-4 урока в неделю.' },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-[1100px] px-10 py-[100px] max-sm:px-5 max-sm:py-[60px]" id="faq">
      <h2 className="text-center font-display text-[clamp(32px,5vw,50px)] font-bold uppercase tracking-[0.02em]">
        FAQ
      </h2>
      <div className="mx-auto mt-0 mb-10 h-px w-10 bg-white/20" />
      <p className="mb-14 text-center text-[15px] text-white/[0.32]">
        Частые вопросы об Академии
      </p>

      <div className="mx-auto flex max-w-[720px] flex-col gap-2">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className={`card-cinema overflow-hidden transition-shadow ${isOpen ? 'shadow-[0_0_22px_3px_rgba(255,255,255,0.13),0_0_55px_12px_rgba(255,255,255,0.065)]' : ''}`}
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-[22px] py-[18px] text-left text-sm font-normal text-white"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                type="button"
              >
                {faq.q}
                <span className={`flex-shrink-0 text-lg text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {isOpen && (
                <div className="px-[22px] pb-[18px] text-[13px] leading-[1.7] text-white/[0.32]">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
