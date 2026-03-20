import { Button } from '@kf/ui'

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-[var(--spacing-nav-height)] text-center">
      <h1 className="font-display text-4xl font-bold uppercase tracking-wider md:text-6xl lg:text-7xl">
        Создавай кино
        <br />
        <span className="text-amber">с помощью ИИ</span>
      </h1>
      <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-dim md:text-base">
        Научись создавать фильмы с помощью нейросетей — Runway, Midjourney, Suno и десятков
        других инструментов. От идеи до финального монтажа.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg">
          <a href="#pricing">Начать обучение</a>
        </Button>
        <Button variant="secondary" size="lg">
          <a href="#program">Смотреть программу</a>
        </Button>
      </div>
      <p className="mt-12 text-[11px] font-light uppercase tracking-[0.2em] text-muted">
        Поток 4 · Старт скоро
      </p>
    </section>
  )
}
