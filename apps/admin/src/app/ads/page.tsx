export default function AdsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Реклама</h1>
        <p className="mt-1 text-[13px] font-extralight text-white/[0.32]">ROI по каналам, CAC, прогноз</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[{v:'0 ₽',l:'Бюджет'},{v:'0',l:'Визиты'},{v:'0 ₽',l:'CPC'},{v:'0 ₽',l:'CAC'}].map(k=>(
          <div key={k.l} className="rounded-xl border border-white/[0.08] bg-surface p-4">
            <p className="font-display text-4xl font-bold tracking-[0.02em] text-white/[0.32]">{k.v}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/25">{k.l}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-4 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Каналы</h2>
        <p className="py-8 text-center text-sm text-white/20">Подключите рекламные каналы для аналитики</p>
      </div>
    </div>
  )
}
