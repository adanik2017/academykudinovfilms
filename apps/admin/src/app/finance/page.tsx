'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react'

type Period = 'month' | 'quarter' | 'year'

const kpis = [
  { icon: DollarSign, value: '0 ₽', label: 'Общая выручка', delta: 'Нет данных', up: true, color: 'text-green' },
  { icon: TrendingDown, value: '0 ₽', label: 'Общие расходы', delta: 'Нет данных', up: false, color: 'text-red' },
  { icon: TrendingUp, value: '0 ₽', label: 'Чистая прибыль', delta: 'Нет данных', up: true, color: 'text-amber' },
  { icon: CreditCard, value: '0 ₽', label: 'Расход ИИ / мес', delta: 'Нет данных', up: false, color: 'text-white/[0.32]' },
]

export default function FinancePage() {
  const [period, setPeriod] = useState<Period>('year')

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Финансы и бюджет</h1>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="rounded-xl border border-white/[0.08] bg-surface p-4">
              <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] ${kpi.color}`}>
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <p className={`font-display text-4xl font-bold tracking-[0.02em] ${kpi.color}`}>{kpi.value}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/[0.32]">{kpi.label}</p>
              <p className={`mt-1 text-[10px] ${kpi.up ? 'text-green' : 'text-red'}`}>{kpi.up ? '↑' : '↓'} {kpi.delta}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-[8px] uppercase tracking-[0.14em] text-white/[0.3]">Выручка {period === 'month' ? 'по неделям' : 'по месяцам'}</h2>
              <p className="mt-1 text-xs text-white/20">Нет данных</p>
            </div>
            <div className="flex gap-1">
              {([['month', 'Месяц'], ['quarter', 'Квартал'], ['year', 'Год']] as [Period, string][]).map(([key, label]) => (
                <button key={key} onClick={() => setPeriod(key)} className={`rounded px-3 py-1 text-[10px] uppercase ${period === key ? 'bg-amber/20 text-amber' : 'text-white/30 hover:bg-white/[0.04]'}`} type="button">{label}</button>
              ))}
            </div>
          </div>
          <div className="flex h-[130px] items-center justify-center text-sm text-white/20">Подключите ЮKassa</div>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
          <h2 className="mb-3 text-[8px] uppercase tracking-[0.14em] text-white/[0.3]">Тарифы · Доля</h2>
          <div className="flex h-[130px] items-center justify-center text-sm text-white/20">Нет оплат</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="text-[8px] uppercase tracking-[0.14em] text-white/[0.3]">Динамика прибыли</h2>
        <div className="flex h-[120px] items-center justify-center text-sm text-white/20">Нет данных</div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-4 text-[8px] uppercase tracking-[0.14em] text-white/[0.3]">Расходы · Подписки ИИ</h2>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] text-[9px] uppercase tracking-wider text-white/25">
              <th className="pb-2 font-normal">Сервис</th>
              <th className="pb-2 font-normal">$/мес</th>
              <th className="pb-2 font-normal">На студента</th>
              <th className="pb-2 font-normal">Итого</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Runway', usd: '$15', per: '$0.5', total: '0 ₽' },
              { name: 'Suno', usd: '$10', per: '$0.35', total: '0 ₽' },
              { name: 'ElevenLabs', usd: '$22', per: '$0.7', total: '0 ₽' },
              { name: 'Claude Pro', usd: '$20', per: '$0.65', total: '0 ₽' },
              { name: 'MidJourney', usd: '$30', per: '$1.0', total: '0 ₽' },
            ].map((r) => (
              <tr key={r.name} className="border-b border-white/[0.03]">
                <td className="py-2.5 font-medium">{r.name}</td>
                <td className="py-2.5 text-white/40">{r.usd}</td>
                <td className="py-2.5 text-white/40">{r.per}</td>
                <td className="py-2.5 text-white/[0.32]">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-3 text-[8px] uppercase tracking-[0.14em] text-white/[0.3]">Возвраты</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { v: '0', l: 'Всего', bg: 'border-red/20 bg-red/10' },
            { v: '0 ₽', l: 'Сумма', bg: 'border-amber/20 bg-amber/10' },
            { v: '0%', l: 'Rate', bg: 'border-green/20 bg-green/10' },
          ].map((s) => (
            <div key={s.l} className={`rounded-lg border ${s.bg} p-3 text-center`}>
              <p className="font-display text-lg font-bold">{s.v}</p>
              <p className="text-[9px] uppercase text-white/30">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
