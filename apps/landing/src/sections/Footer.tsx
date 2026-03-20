import Link from 'next/link'

export function Footer() {
  return (
    <>
      {/* Финальный CTA */}
      <section className="relative overflow-hidden px-10 py-[120px] text-center max-sm:px-5 max-sm:py-20">
        <div className="pointer-events-none absolute -bottom-[200px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_65%)]" />
        <h2 className="relative font-display text-[clamp(36px,5vw,58px)] font-bold uppercase">
          Начни создавать кино
          <br />
          <span className="text-amber">с помощью ИИ</span>
        </h2>
        <p className="relative mt-4 mb-9 text-[16px] text-white/[0.32]">
          Поток 4 стартует скоро. Количество мест ограничено.
        </p>
        <a href="#pricing" className="btn-primary relative">
          Вступить в Академию
        </a>
      </section>

      {/* Футер */}
      <footer className="border-t border-white/[0.08] px-10 max-sm:px-5">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-8 py-10">
          <div className="font-display text-sm font-bold uppercase tracking-[0.12em]">
            KUDINOV FILMS
          </div>
          <div className="ml-auto flex gap-6">
            <Link href="/privacy" className="text-[13px] text-white/[0.32] transition-colors hover:text-white">Конфиденциальность</Link>
            <Link href="/terms" className="text-[13px] text-white/[0.32] transition-colors hover:text-white">Соглашение</Link>
            <Link href="/consent" className="text-[13px] text-white/[0.32] transition-colors hover:text-white">Согласие на ПД</Link>
          </div>
          <p className="mt-6 w-full text-center text-xs text-white/[0.18]">
            © {new Date().getFullYear()} ИП Кудинов Даниил. Все права защищены.
          </p>
        </div>
      </footer>
    </>
  )
}
