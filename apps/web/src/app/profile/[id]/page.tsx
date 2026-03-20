import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServerSupabase } from '@kf/db'
import { getUserById } from '@kf/db/queries/users'
import { getUserGamification } from '@kf/db/queries/gamification'
import { Card, KpiCard, Badge } from '@kf/ui'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: user } = await getUserById(supabase, id)
  if (!user) notFound()

  const { data: gamification } = await getUserGamification(supabase, user.id)

  return (
    <div className="space-y-4 p-5">
      {/* Профиль */}
      <Card className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber/10 font-display text-2xl font-bold text-amber">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold uppercase tracking-wider">{user.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="active">{user.role}</Badge>
            {gamification && <Badge variant="purple">{gamification.rank}</Badge>}
          </div>
          {user.bio && <p className="mt-2 text-sm font-light text-dim">{user.bio}</p>}
        </div>
      </Card>

      {/* Статистика */}
      {gamification && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KpiCard value={String(gamification.xp)} label="XP" />
          <KpiCard value={String(gamification.frames)} label="Фреймы" />
          <KpiCard value={gamification.rank} label="Ранг" />
          <KpiCard value={`${gamification.streak} дн.`} label="Стрик" />
        </div>
      )}
    </div>
  )
}
