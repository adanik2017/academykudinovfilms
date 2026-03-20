export default function AdsPage() {
  return (
    <div className="flex flex-col gap-4 p-5">
      <div>
        <h1 className="font-display text-[22px] font-bold uppercase tracking-[0.06em]">Реклама и трафик</h1>
        <p className="mt-0.5 text-[13px] font-extralight text-white/[0.32]">Нет данных · Подключите рекламные каналы</p>
      </div>

      {/* KPI — 5 columns */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { v: '0 ₽', l: 'Бюджет / мес' },
          { v: '0', l: 'Визиты' },
          { v: '0 ₽', l: 'CPC' },
          { v: '0 ₽', l: 'CAC' },
          { v: '0%', l: 'ROI' },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-white/[0.08] bg-surface p-4">
            <p className="font-display text-[28px] font-bold tracking-[0.02em] text-white/[0.32]">{k.v}</p>
            <p className="mt-1 text-[10px] font-light uppercase tracking-[0.08em] text-white/[0.32]">{k.l}</p>
          </div>
        ))}
      </div>

      {/* Channels */}
      <p className="text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Рекламные каналы · Откуда приходят</p>
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
        <p className="py-6 text-center text-[13px] font-extralight text-white/[0.32]">Нет рекламных каналов</p>
      </div>

      {/* Math Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
        <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Математика · Куда уходят деньги</p>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.07]">
              {['Канал', 'Бюджет', 'Визиты', 'CPC', 'Оплаты', 'CAC', 'Выручка'].map((h) => (
                <th key={h} className="pb-2.5 text-[10px] font-light uppercase tracking-[0.1em] text-white/25">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={7} className="py-6 text-center text-[13px] font-extralight text-white/[0.32]">Нет данных</td></tr>
          </tbody>
        </table>
      </div>

      {/* Issues + Recs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
          <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-red">Узкие места</p>
          <p className="py-6 text-center text-[13px] font-extralight text-white/[0.32]">Нет данных</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
          <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-green">Рекомендации</p>
          <p className="py-6 text-center text-[13px] font-extralight text-white/[0.32]">Нет данных</p>
        </div>
      </div>

      {/* Forecast */}
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-5" style={{ '--fg': '#5ecf7e', borderTopWidth: '2px', borderTopColor: 'var(--fg)' } as React.CSSProperties}>
        <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Прогноз</p>
        <div className="grid grid-cols-4 gap-3.5">
          {[
            { label: 'Бюджет (мес)', value: '0 ₽' },
            { label: 'Прогноз визитов', value: '0' },
            { label: 'Прогноз оплат', value: '0' },
            { label: 'Прогноз ROI', value: '0%', highlight: true },
          ].map((f) => (
            <div key={f.label} className={`rounded-[10px] border p-4 text-center ${f.highlight ? 'border-green/10 bg-green/[0.02]' : 'border-white/[0.05] bg-white/[0.02]'}`}>
              <p className="mb-1.5 text-[10px] font-extralight uppercase tracking-[0.06em] text-white/[0.32]">{f.label}</p>
              <p className="font-display text-[24px] font-bold tracking-[0.02em] text-white/[0.32]">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
