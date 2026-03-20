import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getUsers } from '@kf/db/queries/users'
import { KpiCard } from '@kf/ui'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: users } = await getUsers(supabase)

  const totalStudents = users?.filter((u) => u.role === 'student').length ?? 0

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Дашборд</h1>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard value={String(totalStudents)} label="Студентов" />
        <KpiCard value="0 ₽" label="Выручка" />
        <KpiCard value="0" label="Оплат" />
        <KpiCard value="0%" label="Конверсия" />
      </div>
    </div>
  )
}
