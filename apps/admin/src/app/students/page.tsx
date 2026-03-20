import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getUsers } from '@kf/db/queries/users'
import { DataTable, Badge } from '@kf/ui'

export default async function StudentsPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: users } = await getUsers(supabase)

  const students = (users ?? []).filter((u) => u.role === 'student')

  const columns = [
    { key: 'name', header: 'Имя', render: (row: typeof students[0]) => row.name },
    { key: 'email', header: 'Email', render: (row: typeof students[0]) => row.email },
    { key: 'role', header: 'Роль', render: (row: typeof students[0]) => <Badge variant="active">{row.role}</Badge> },
    {
      key: 'created_at',
      header: 'Зарегистрирован',
      render: (row: typeof students[0]) => new Date(row.created_at).toLocaleDateString('ru-RU'),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Студенты</h1>
      <DataTable columns={columns} data={students} keyExtractor={(r) => r.id} />
    </div>
  )
}
