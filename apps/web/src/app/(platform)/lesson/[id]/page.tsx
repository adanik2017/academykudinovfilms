import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServerSupabase } from '@kf/db'
import { getLessonById } from '@kf/db/queries/lessons'
import { Card } from '@kf/ui'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: lesson } = await getLessonById(supabase, id)
  if (!lesson) notFound()

  return (
    <div className="space-y-4 p-5">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">
        {lesson.title}
      </h1>

      {/* Видеоплеер — пока заглушка */}
      <Card className="flex aspect-video items-center justify-center bg-surface-2">
        {lesson.video_url ? (
          <video controls className="h-full w-full rounded-xl" src={lesson.video_url} />
        ) : (
          <p className="text-sm text-muted">Видео ещё не загружено</p>
        )}
      </Card>

      {/* Описание */}
      {lesson.description && (
        <Card>
          <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted">
            Описание
          </h2>
          <p className="text-sm font-light leading-relaxed text-dim">{lesson.description}</p>
        </Card>
      )}

      {/* Контент урока (промпты, ДЗ) */}
      {lesson.lesson_content && (lesson.lesson_content as unknown[]).length > 0 && (
        <div className="space-y-3">
          {(lesson.lesson_content as Array<{ id: string; type: string; title: string | null; content: string | null }>).map((content) => (
            <Card key={content.id}>
              <h3 className="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-amber">
                {content.type === 'prompt' ? 'Промпт' : content.type === 'homework' ? 'Домашнее задание' : 'Файл'}
              </h3>
              {content.title && <p className="text-sm font-medium">{content.title}</p>}
              {content.content && <p className="mt-1 text-sm font-light text-dim">{content.content}</p>}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
