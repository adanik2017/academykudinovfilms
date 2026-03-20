import { cookies } from 'next/headers'
import { getSession } from '@kf/auth/server'
import { createServerSupabase } from '@kf/db'
import { getUserGamification } from '@kf/db/queries/gamification'
import { getAcademies } from '@kf/db/queries/academies'
import { Card, KpiCard, ProgressBar } from '@kf/ui'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  const supabase = createServerSupabase(cookieStore)

  const { data: gamification } = session
    ? await getUserGamification(supabase, session.id)
    : { data: null }
  const { data: academies } = await getAcademies(supabase)

  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">
          Привет, {session?.name ?? 'Студент'}
        </h1>
        <p className="mt-1 text-xs font-light text-muted">Твоя панель обучения</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard value={String(gamification?.xp ?? 0)} label="XP" />
        <KpiCard value={String(gamification?.frames ?? 0)} label="Фреймы" />
        <KpiCard value={gamification?.rank ?? 'Наблюдатель'} label="Ранг" />
        <KpiCard value={`${gamification?.streak ?? 0} дн.`} label="Стрик" />
      </div>

      {/* Академии */}
      <div>
        <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Академии
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {academies?.map((a) => (
            <Card key={a.id} hoverable>
              <div className="mb-2 h-1 w-10 rounded-full" style={{ '--c': a.color } as React.CSSProperties}>
                <div className="h-full w-full rounded-full bg-[var(--c)]" />
              </div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider">{a.name}</h3>
              <p className="mt-1 text-xs font-light text-muted line-clamp-2">{a.description}</p>
              <ProgressBar value={0} className="mt-3" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
