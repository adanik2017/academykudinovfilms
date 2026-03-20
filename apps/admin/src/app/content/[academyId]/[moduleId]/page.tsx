import { cookies } from 'next/headers'
import Link from 'next/link'
import { createServerSupabase } from '@kf/db'
import { getLessonsByModule } from '@kf/db/queries/lessons'
import { Card, Badge } from '@kf/ui'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ academyId: string; moduleId: string }>
}

export default async function ModuleLessonsPage({ params }: Props) {
  const { academyId, moduleId } = await params
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: lessons } = await getLessonsByModule(supabase, moduleId)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href={`/content/${academyId}`} className="rounded-lg p-1.5 text-muted hover:bg-white/5 hover:text-white">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Уроки</h1>
      </div>

      <div className="space-y-2">
        {lessons?.map((lesson, i) => (
          <Card key={lesson.id} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-[10px] font-medium text-muted">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium">{lesson.title}</p>
              <p className="text-[10px] text-muted">{lesson.type} · {lesson.duration ?? '—'}</p>
            </div>
            <Badge variant={lesson.status === 'published' ? 'active' : 'default'}>
              {lesson.status}
            </Badge>
          </Card>
        ))}
        {(!lessons || lessons.length === 0) && (
          <p className="text-sm text-muted">Нет уроков</p>
        )}
      </div>
    </div>
  )
}
