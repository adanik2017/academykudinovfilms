export default function FramesPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Экономика фреймов</h1>
        <p className="mt-1 text-[13px] font-extralight text-white/[0.32]">Курс: 10 фреймов = 1 ₽ · Антиинфляционная модель</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[{v:'0',l:'В обороте'},{v:'0',l:'Эмиссия / нед'},{v:'0',l:'Сжигание / нед'}].map(m=>(
          <div key={m.l} className="rounded-xl border border-white/[0.08] bg-surface p-4 text-center">
            <p className="font-display text-2xl font-bold text-white/[0.32]">{m.v}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/25">{m.l}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-4 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Баланс эмиссии и сжигания</h2>
        {[{l:'Эмиссия',c:'bg-green'},{l:'Сжигание',c:'bg-blue'},{l:'Нетто',c:'bg-amber'}].map(b=>(
          <div key={b.l} className="mb-3 flex items-center gap-3">
            <span className="w-24 text-xs text-white/40">{b.l}</span>
            <div className="h-2 flex-1 rounded-full bg-white/[0.04]"><div className={`h-full w-0 rounded-full ${b.c}/30`}/></div>
            <span className="w-12 text-right font-display text-xs text-white/[0.32]">0</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-4 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Контроль инфляции</h2>
        <div className="grid grid-cols-2 gap-3">
          {[{l:'Инфляция (нед.)',v:'0%',s:'Нет данных'},{l:'Лимит / студент / нед',v:'500',s:'Норма'},{l:'Decay rate (мес.)',v:'2%',s:'Активен'},{l:'«Долг» в ₽',v:'0 ₽',s:'Нет данных'}].map(c=>(
            <div key={c.l} className="flex items-center justify-between rounded-lg bg-white/[0.02] p-3">
              <div><p className="text-xs">{c.l}</p><p className="font-display text-lg font-bold text-white/[0.32]">{c.v}</p></div>
              <span className="rounded bg-green/10 px-2 py-0.5 text-[9px] text-green">{c.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
