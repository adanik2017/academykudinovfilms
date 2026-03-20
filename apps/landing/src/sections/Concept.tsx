export function Concept() {
  const features = [
    { title: '4 академии', desc: 'Режиссура, операторское мастерство, саунд-дизайн, VFX' },
    { title: '170+ уроков', desc: 'Видео, практика и проекты с реальными задачами' },
    { title: 'Геймификация', desc: 'XP, фреймы, ранги, квесты — учиться интересно' },
    { title: 'Комьюнити', desc: 'Лента работ, лайки, комментарии, обратная связь' },
  ]

  return (
    <section className="mx-auto max-w-5xl px-4 py-24">
      <h2 className="text-center font-display text-2xl font-semibold uppercase tracking-wider md:text-3xl">
        Концепция
      </h2>
      <p className="mt-4 text-center text-sm font-light text-dim">
        Первая онлайн-академия ИИ-кинопроизводства в России
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border-light bg-surface p-6"
          >
            <h3 className="font-display text-lg font-semibold uppercase tracking-wider text-amber">
              {f.title}
            </h3>
            <p className="mt-2 text-sm font-light text-dim">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
