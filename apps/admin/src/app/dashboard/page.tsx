import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getUsers } from '@kf/db/queries/users'
import { getAcademies } from '@kf/db/queries/academies'
import { Bell, Clock, CheckCircle, Download, Flame, Snowflake } from 'lucide-react'

const COHORT_STATS = [
  { label: 'Зачислено', value: '0' },
  { label: 'Активных', value: '0', color: 'text-green' },
  { label: 'В зоне риска', value: '0', color: 'text-amber' },
  { label: 'Неактивных', value: '0', color: 'text-red' },
  { label: 'Ср. прогресс', value: '0%', color: 'text-amber' },
  { label: 'Дней до конца', value: '—' },
]

const QUICK_ACTIONS = [
  { label: 'Напоминание', icon: Bell },
  { label: 'Дедлайн', icon: Clock },
  { label: 'Квест', icon: CheckCircle },
  { label: 'Экспорт CSV', icon: Download },
  { label: 'Burn-ивент', icon: Flame },
  { label: 'Заморозка', icon: Snowflake },
]

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: users } = await getUsers(supabase)
  const { data: academies } = await getAcademies(supabase)

  const students = users?.filter((u) => u.role === 'student') ?? []
  const totalStudents = students.length

  return (
    <div className="flex flex-col gap-4 p-5">
      {/* KPI Row — Oswald 36px как в старом проекте */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { value: '0 ₽', label: 'Общая выручка', delta: 'Нет данных', up: true, color: 'text-green' },
          { value: String(totalStudents), label: 'Студентов всего', delta: `${totalStudents} активных`, up: true },
          { value: '0 ₽', label: 'Средний чек', delta: 'Нет данных', up: true, color: 'text-amber' },
          { value: '0%', label: 'Чистая маржа', delta: 'Нет данных', up: true },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-white/[0.08] bg-surface p-5">
            <p className={`font-display text-4xl font-bold tracking-[0.02em] leading-none ${kpi.color ?? ''}`}>{kpi.value}</p>
            <p className="mt-1.5 text-[11px] font-light uppercase tracking-[0.1em] text-white/[0.32]">{kpi.label}</p>
            <p className={`mt-2 flex items-center gap-1 text-[11px] font-light ${kpi.up ? 'text-green' : 'text-red'}`}>
              {kpi.up ? '↑' : '↓'} {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Cohort + Alerts — side grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Текущий поток */}
        <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
          <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Текущий поток</p>
          <div className="space-y-0">
            {COHORT_STATS.map((stat, i) => {
              // Подставляем реальные данные
              const val = stat.label === 'Зачислено' ? String(totalStudents)
                : stat.label === 'Активных' ? String(totalStudents)
                : stat.value
              return (
                <div key={i} className="flex items-center justify-between border-b border-white/[0.04] py-2.5 last:border-b-0">
                  <span className="text-[11px] font-light text-white/[0.32]">{stat.label}</span>
                  <span className={`font-display text-sm font-bold ${stat.color ?? ''}`}>{val}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Алерты */}
        <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
          <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Алерты</p>
          <div className="space-y-2">
            {[
              { type: 'warn', text: 'ЮKassa не подключена', time: 'Требуется настройка', color: 'border-amber/20 bg-amber/[0.04]', dot: 'bg-amber' },
              { type: 'info', text: `${academies?.length ?? 0} академий создано`, time: 'Контент-хаб', color: 'border-blue/20 bg-blue/[0.04]', dot: 'bg-blue' },
              { type: 'info', text: `${totalStudents} студентов зарегистрировано`, time: 'Supabase Auth', color: 'border-green/20 bg-green/[0.04]', dot: 'bg-green' },
            ].map((alert, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-lg border ${alert.color} p-3`}>
                <span className={`mt-1 h-[5px] w-[5px] flex-shrink-0 rounded-full ${alert.dot}`} />
                <div>
                  <p className="text-xs">{alert.text}</p>
                  <p className="mt-0.5 text-[10px] text-white/20">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
        <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Быстрые действия</p>
        <div className="grid grid-cols-6 gap-2">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <button key={action.label} type="button" className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-white/[0.32] transition-all hover:border-white/10 hover:bg-white/[0.04] hover:text-white/60">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">
                  <Icon size={16} strokeWidth={1.3} />
                </div>
                <span className="text-[10px] font-light">{action.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Все потоки */}
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
        <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Все потоки</p>
        <p className="py-6 text-center text-[13px] font-extralight text-white/[0.32]">Нет данных</p>
      </div>
    </div>
  )
}
