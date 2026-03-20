import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getUsers } from '@kf/db/queries/users'
import { getAcademies } from '@kf/db/queries/academies'
import { getTariffs } from '@kf/db/queries/tariffs'
import { Users, DollarSign, TrendingUp, BookOpen, Activity, AlertTriangle } from 'lucide-react'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: users } = await getUsers(supabase)
  const { data: academies } = await getAcademies(supabase)
  const { data: tariffs } = await getTariffs(supabase)

  const students = users?.filter((u) => u.role === 'student') ?? []
  const totalStudents = students.length
  const totalAcademies = academies?.length ?? 0
  const totalTariffs = tariffs?.length ?? 0

  // Данные для таблицы последних студентов
  const recentStudents = students.slice(0, 5)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Дашборд</h1>
        <span className="text-[10px] text-white/25">{new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { icon: Users, value: String(totalStudents), label: 'Студентов', delta: totalStudents > 0 ? `+${totalStudents}` : undefined, deltaType: 'up' as const, color: 'text-blue' },
          { icon: DollarSign, value: '0 ₽', label: 'Выручка', color: 'text-green' },
          { icon: TrendingUp, value: '0%', label: 'Конверсия', color: 'text-amber' },
          { icon: BookOpen, value: String(totalAcademies), label: 'Академий', color: 'text-purple' },
        ].map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="rounded-xl border border-white/[0.08] bg-surface p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] ${kpi.color}`}>
                  <Icon size={16} strokeWidth={1.5} />
                </div>
              </div>
              <p className="font-display text-4xl font-bold tracking-[0.02em]">{kpi.value}</p>
              <p className="mt-0.5 text-[10px] font-light uppercase tracking-[0.06em] text-white/[0.32]">{kpi.label}</p>
              {kpi.delta && <p className="mt-1 text-[10px] text-green">{kpi.delta}</p>}
            </div>
          )
        })}
      </div>

      {/* Две колонки */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Последние студенты */}
        <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Последние студенты</h2>
          {recentStudents.length > 0 ? (
            <div className="space-y-2">
              {recentStudents.map((s) => (
                <div key={s.id} className="flex items-center gap-3 rounded-lg bg-white/[0.02] p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber/10 font-display text-[10px] font-semibold text-amber">
                    {s.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{s.name}</p>
                    <p className="text-[10px] text-white/25">{s.email}</p>
                  </div>
                  <span className="rounded bg-green/10 px-2 py-0.5 text-[9px] font-medium uppercase text-green">{s.role}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-xs text-white/20">Нет студентов</p>
          )}
        </div>

        {/* Быстрые действия */}
        <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Алерты</h2>
          <div className="space-y-2">
            {[
              { icon: AlertTriangle, text: 'ЮKassa не подключена — оплаты не принимаются', color: 'text-amber', bg: 'bg-amber/10 border-amber/20' },
              { icon: Activity, text: `${totalTariffs} тариф(ов) настроено`, color: 'text-blue', bg: 'bg-blue/10 border-blue/20' },
              { icon: BookOpen, text: `${totalAcademies} академий создано`, color: 'text-green', bg: 'bg-green/10 border-green/20' },
            ].map((alert, i) => {
              const AlertIcon = alert.icon
              return (
                <div key={i} className={`flex items-center gap-3 rounded-lg border ${alert.bg} p-3`}>
                  <AlertIcon size={16} className={alert.color} />
                  <span className="text-xs font-light">{alert.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
