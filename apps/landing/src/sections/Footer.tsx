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
      {/* Telegram */}
      <a
        href="#"
        className="fixed bottom-7 right-7 z-[99] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-[#2AABEE] to-[#229ED9] shadow-[0_4px_20px_rgba(42,171,238,0.3),0_0_40px_rgba(42,171,238,0.1)] transition-all hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_6px_30px_rgba(42,171,238,0.4),0_0_60px_rgba(42,171,238,0.15)] max-sm:bottom-5 max-sm:right-5 max-sm:h-12 max-sm:w-12"
        aria-label="Написать в Telegram"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
        </svg>
      </a>
    </>
  )
}
