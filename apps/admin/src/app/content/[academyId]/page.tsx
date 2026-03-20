import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabase } from '@kf/db'
import { getAcademyById } from '@kf/db/queries/academies'
import { getModulesByAcademy } from '@kf/db/queries/modules'
import { Card } from '@kf/ui'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ academyId: string }>
}

export default async function AcademyModulesPage({ params }: Props) {
  const { academyId } = await params
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: academy } = await getAcademyById(supabase, academyId)
  if (!academy) notFound()

  const { data: modules } = await getModulesByAcademy(supabase, academyId)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href="/content" className="rounded-lg p-1.5 text-muted hover:bg-white/5 hover:text-white">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-display text-xl font-semibold uppercase tracking-wider">{academy.name}</h1>
          <p className="text-xs text-muted">Модули академии</p>
        </div>
      </div>

      <div className="space-y-3">
        {modules?.map((mod, i) => (
          <Link key={mod.id} href={`/content/${academyId}/${mod.id}`}>
            <Card hoverable className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 font-display text-sm font-medium text-muted">
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-medium">{mod.title}</h3>
                {mod.description && <p className="text-xs font-light text-muted">{mod.description}</p>}
              </div>
            </Card>
          </Link>
        ))}
        {(!modules || modules.length === 0) && (
          <p className="text-sm text-muted">Нет модулей</p>
        )}
      </div>
    </div>
  )
}
