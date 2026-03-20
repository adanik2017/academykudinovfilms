import { cookies } from 'next/headers'
import Link from 'next/link'
import { createServerSupabase } from '@kf/db'
import { getAcademies } from '@kf/db/queries/academies'
import { Card, Badge } from '@kf/ui'

export default async function ContentPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: academies } = await getAcademies(supabase)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Контент-хаб</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {academies?.map((academy) => (
          <Link key={academy.id} href={`/content/${academy.id}`}>
            <Card hoverable>
              <div className="mb-2 h-1 w-10 rounded-full" style={{ '--c': academy.color } as React.CSSProperties}>
                <div className="h-full w-full rounded-full bg-[var(--c)]" />
              </div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider">{academy.name}</h3>
              <p className="mt-1 text-xs font-light text-muted">{academy.description}</p>
              <Badge variant="default" className="mt-3">{academy.access}</Badge>
            </Card>
          </Link>
        ))}
        {(!academies || academies.length === 0) && (
          <p className="text-sm text-muted">Нет академий</p>
        )}
      </div>
    </div>
  )
}
