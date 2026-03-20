'use client'

const stats = [
  { value: '210', label: 'видеоуроков' },
  { value: '5', label: 'академий' },
  { value: '50', label: 'ИИ-инструментов' },
  { value: '21', label: 'финальный проект' },
]

export function Hero() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden" id="hero-top">
      {/* Видео-фон (как в старом проекте) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-110 object-cover opacity-70"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-assets/video/dna-video.mp4`}
        />
        {/* Маска слева направо */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,#080808_0%,rgba(8,8,8,0.92)_18%,rgba(8,8,8,0.6)_38%,rgba(8,8,8,0.15)_55%,transparent_70%)]" />
        {/* Верхний fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[120px] bg-gradient-to-b from-background to-transparent" />
        {/* Амберный color grade */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_65%_45%,rgba(232,146,74,0.08)_0%,transparent_60%)] mix-blend-screen" />
        {/* Canvas для частиц */}
        <canvas id="heroParticles" className="pointer-events-none absolute inset-0 z-[2]" />
      </div>

      {/* Градиент снизу */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[200px] bg-gradient-to-t from-background to-transparent" />

      {/* Боковая навигация (десктоп) */}
      <div className="fixed left-7 top-1/2 z-[9990] flex -translate-y-1/2 flex-col max-sm:hidden" id="heroSide">
        {[
          { n: 1, target: 'hero-top' },
          { n: 2, target: 'concept' },
          { n: 3, target: 'program' },
          { n: 4, target: 'pricing' },
          { n: 5, target: 'faq' },
        ].map((item, i, arr) => (
          <div
            key={item.n}
            className="relative cursor-pointer py-2.5 font-display text-xs font-medium tracking-[0.06em] text-white/[0.18] transition-colors hover:text-white/50"
            onClick={() => document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="min-w-[26px]">0{item.n}</span>
            {i < arr.length - 1 && (
              <span className="absolute left-3 top-full h-full w-px bg-white/[0.06]" />
            )}
          </div>
        ))}
      </div>

      {/* Контент */}
      <div className="hero-content relative z-[2] max-w-[620px] px-5 py-[100px] pt-[180px] sm:pl-20">
        <div className="mb-11 flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-amber">
          <span className="h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-amber shadow-[0_0_12px_var(--color-amber)]" />
          ACADEMY KUDINOV FILMS · 2026
        </div>

        <h1 className="font-accent text-[clamp(64px,10vw,130px)] leading-[0.86] tracking-[0.04em] drop-shadow-[0_0_80px_rgba(232,146,74,0.1)] max-sm:text-[clamp(48px,14vw,80px)]">
          СОЗДАВАЙ
          <br />
          КИНО
          <span className="mt-4 block font-display text-[clamp(14px,2vw,22px)] font-medium uppercase tracking-[0.18em] text-white/[0.35]">
            с помощью искусственного интеллекта
          </span>
        </h1>

        <p className="mt-7 mb-10 max-w-[440px] text-[15px] font-light leading-[1.75] text-white/[0.35]">
          5 академий. 210+ видеоуроков. Кино, звук, режиссура, языковые модели и
          автоматизация. Геймификация и кураторы. Не курс — экосистема.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button className="btn-primary" onClick={() => scrollTo('pricing')} type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Вступить в Академию
          </button>
          <a href="#program" className="btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo('program') }}>
            Смотреть программу
          </a>
        </div>
      </div>

      {/* Статистика внизу */}
      <div className="absolute inset-x-0 bottom-0 z-[4] flex border-t border-white/5 bg-[rgba(8,8,8,0.6)] backdrop-blur-[12px] max-sm:flex-wrap">
        {stats.map((s) => (
          <div key={s.label} className="flex-1 border-r border-white/[0.04] px-4 py-[22px] text-center transition-colors hover:bg-white/[0.02] last:border-r-0 max-sm:flex-[1_1_45%] max-sm:border-b max-sm:border-white/[0.04]">
            <span className="block font-display text-[28px] font-bold tracking-[0.02em]" data-count={parseInt(s.value)}>{s.value}</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/25">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
