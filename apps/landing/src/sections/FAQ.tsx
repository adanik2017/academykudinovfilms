const faqs = [
  {
    q: 'Нужен ли опыт в кинопроизводстве?',
    a: 'Нет, программа начинается с основ. Мы учим с нуля — от идеи до финального монтажа.',
  },
  {
    q: 'Какие инструменты ИИ мы будем использовать?',
    a: 'Runway, Midjourney, Suno, ElevenLabs, ChatGPT, Claude и десятки других. Мы обновляем программу каждый поток.',
  },
  {
    q: 'Сколько длится обучение?',
    a: 'Доступ к материалам — навсегда. Активное обучение с куратором — в рамках потока (обычно 3 месяца).',
  },
  {
    q: 'Есть ли возврат?',
    a: 'Да, полный возврат в течение 14 дней, если обучение не подошло.',
  },
  {
    q: 'Как проходят уроки?',
    a: 'Видеоуроки + практические задания. Каждый урок — конкретный навык. Куратор проверяет работы и даёт обратную связь.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24">
      <h2 className="text-center font-display text-2xl font-semibold uppercase tracking-wider md:text-3xl">
        Частые вопросы
      </h2>
      <div className="mt-12 space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-xl border border-border-light bg-surface p-4"
          >
            <summary className="cursor-pointer list-none font-display text-sm font-medium uppercase tracking-wider">
              {faq.q}
            </summary>
            <p className="mt-3 text-sm font-light leading-relaxed text-dim">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
