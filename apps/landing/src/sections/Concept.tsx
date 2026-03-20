export function Concept() {
  return (
    <section className="mx-auto max-w-[1100px] px-10 py-20 text-center max-sm:px-5" id="concept">
      <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold uppercase tracking-[0.02em]">
        Это не курс. <span className="text-amber">Это Академия.</span>
      </h2>
      <p className="mx-auto mt-4 mb-12 max-w-[640px] text-[15px] leading-[1.7] text-white/[0.32]">
        Платформа, где обучение работает как игра — с рангами, рейтингом,
        квестами и командами. Академии охватывают всё: от ИИ-кинопроизводства
        и звука до языковых моделей и автоматизации.
      </p>

      {/* Ранги */}
      <div className="mx-auto mb-12 flex max-w-[820px] items-center justify-center gap-0 overflow-x-auto max-sm:flex-wrap max-sm:gap-2">
        {['Наблюдатель', 'Оператор', 'Режиссёр', 'Продюсер', 'Мастер', 'ИИ-Креатор'].map((rank, i) => (
          <div key={rank} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5 px-5">
              <div className={`h-3 w-3 rounded-full border-2 transition-all ${i <= 2 ? 'border-amber bg-amber shadow-[0_0_12px_rgba(232,146,74,0.4)]' : 'border-white/15 bg-white/[0.12]'}`} />
              <span className={`font-display text-[10px] uppercase tracking-[0.1em] ${i <= 2 ? 'text-amber' : 'text-white/25'}`}>
                {rank}
              </span>
            </div>
            {i < 5 && <div className="h-px w-10 bg-white/10 max-sm:w-5" />}
          </div>
        ))}
      </div>

      {/* Фичи геймификации */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: '⭐', title: 'XP и ранги', desc: 'Получай очки за уроки и поднимайся по рангам' },
          { icon: '🎬', title: 'Фреймы', desc: 'Внутренняя валюта — обменивай на бонусы' },
          { icon: '🔥', title: 'Стрики', desc: 'Не пропускай дни — наращивай серию' },
          { icon: '🏆', title: 'Квесты', desc: 'Еженедельные задания с наградами' },
        ].map((item) => (
          <div key={item.title} className="card-cinema p-6 text-center">
            <div className="mx-auto mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-lg">
              {item.icon}
            </div>
            <h3 className="mb-1.5 font-display text-[15px] font-semibold tracking-[0.03em]">{item.title}</h3>
            <p className="text-xs leading-[1.6] text-white/[0.32]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
