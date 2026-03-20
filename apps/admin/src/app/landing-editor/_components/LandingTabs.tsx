'use client'

import { useState } from 'react'
import type { Tariff, Academy, LandingToolCategory } from '@kf/db'

interface Props {
  tariffs: Tariff[]
  categories: LandingToolCategory[]
  academies: Academy[]
}

type Tab = 'tariffs' | 'tools' | 'program'

export function LandingTabs({ tariffs, categories, academies }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('tariffs')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'tariffs', label: 'Тарифы' },
    { id: 'tools', label: 'Инструменты' },
    { id: 'program', label: 'Программа' },
  ]

  return (
    <>
      {/* Табы */}
      <div className="mb-6 mt-4 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.06em] transition-all ${
              activeTab === tab.id
                ? 'bg-amber/20 text-amber'
                : 'bg-white/[0.04] text-white/[0.32] hover:bg-white/[0.08] hover:text-white/60'
            }`}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Тарифы */}
      {activeTab === 'tariffs' && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[13px] font-light text-white/[0.32]">Управление тарифными планами · Отображаются на лендинге</p>
            <button type="button" className="rounded-lg border border-amber/30 bg-amber/10 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber/20">
              + Добавить тариф
            </button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {tariffs.map((t) => (
              <div key={t.id} className="rounded-xl border border-white/[0.08] bg-surface p-5" style={{ '--tc': t.accent === 'amber' ? '#e8924a' : t.accent === 'blue' ? '#7eb8f7' : t.accent === 'red' ? '#f27171' : '#e8924a', borderTopWidth: '3px', borderTopColor: 'var(--tc)' } as React.CSSProperties}>
                <div className="mb-3 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--tc)]">
                  {t.name}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[32px] font-bold">{new Intl.NumberFormat('ru-RU').format(t.price)}</span>
                  <span className="font-display text-sm text-white/[0.32]">₽</span>
                </div>
                <p className="mt-1 text-xs text-white/[0.32]">доступ {t.period}</p>
                <div className="mt-1 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber" />
                  <span className="text-[10px] text-white/30">{(t.features as string[])?.length ?? 0} акад.</span>
                </div>
                <ul className="mt-4 space-y-1.5">
                  {(t.features as string[] ?? []).map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/[0.7]">
                      <span className="text-white/40">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2">
                  <button type="button" className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-light transition-all hover:border-white/20 hover:bg-white/[0.06]">
                    Редактировать
                  </button>
                  <button type="button" className="rounded-lg p-2 text-white/20 transition-colors hover:text-white/50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  </button>
                  <button type="button" className="rounded-lg p-2 text-white/20 transition-colors hover:text-red">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                  </button>
                </div>
              </div>
            ))}
            {tariffs.length === 0 && <p className="col-span-3 py-8 text-center text-sm text-white/20">Нет тарифов</p>}
          </div>
        </div>
      )}

      {/* Инструменты */}
      {activeTab === 'tools' && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[13px] font-light text-white/[0.32]">Категории ИИ-инструментов на лендинге</p>
            <button type="button" className="rounded-lg border border-amber/30 bg-amber/10 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber/20">
              + Добавить категорию
            </button>
          </div>
          <div className="space-y-3">
            {categories.map((cat) => {
              const tools = ((cat as Record<string, unknown>).landing_tools as Array<{ id: string; name: string }>) ?? []
              return (
                <div key={cat.id} className="rounded-xl border border-white/[0.08] bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-semibold">{cat.name}</h3>
                    <span className="text-xs text-white/25">{tools.length} инструментов</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tools.map((tool) => (
                      <span key={tool.id} className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/50">{tool.name}</span>
                    ))}
                  </div>
                </div>
              )
            })}
            {categories.length === 0 && <p className="py-8 text-center text-sm text-white/20">Нет категорий</p>}
          </div>
        </div>
      )}

      {/* Программа */}
      {activeTab === 'program' && (
        <div>
          <p className="mb-4 text-[13px] font-light text-white/[0.32]">Академии синхронизируются из Контент-хаба</p>
          <div className="space-y-3">
            {academies.map((a) => (
              <div key={a.id} className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-surface p-4">
                <div className="h-10 w-1 rounded-full" style={{ '--c': a.color } as React.CSSProperties}>
                  <div className="h-full w-full rounded-full bg-[var(--c)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-semibold">{a.name}</h3>
                  <p className="text-xs text-white/30">{a.description}</p>
                </div>
                <span className="rounded bg-green/10 px-2 py-0.5 text-[9px] uppercase text-green">{a.access}</span>
              </div>
            ))}
            {academies.length === 0 && <p className="py-8 text-center text-sm text-white/20">Нет академий</p>}
          </div>
        </div>
      )}
    </>
  )
}
