import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServerSupabase } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { getLessonById } from '@kf/db/queries/lessons'
import { Play, Clock, BookOpen, FileText, Download, CheckCircle, ChevronDown } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  const supabase = createServerSupabase(cookieStore)

  const { data: lesson } = await getLessonById(supabase, id)
  if (!lesson) notFound()

  const contents = (lesson.lesson_content ?? []) as Array<{
    id: string; type: string; title: string | null; content: string | null; file_url: string | null
  }>
  const prompts = contents.filter(c => c.type === 'prompt')
  const homework = contents.filter(c => c.type === 'homework')
  const files = contents.filter(c => c.type === 'file')

  const typeLabels: Record<string, string> = { video: 'Видео', practice: 'Практика', project: 'Проект', test: 'Тест' }

  return (
    <div className="flex gap-4 p-5 max-md:flex-col">
      {/* Основной контент */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Видеоплеер */}
        <div className="card-cinema relative overflow-hidden">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            {lesson.video_url ? (
              <video
                controls
                className="h-full w-full object-cover"
                src={lesson.video_url}
                poster=""
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm">
                  <Play size={28} className="ml-1 text-white/40" />
                </div>
                <p className="text-xs text-white/25">Видео ещё не загружено</p>
              </div>
            )}
          </div>
        </div>

        {/* Инфо урока */}
        <div className="card-cinema p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-lg font-semibold uppercase tracking-wider">{lesson.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-white/[0.32]">
                <span className="flex items-center gap-1 rounded bg-amber/10 px-2 py-[2px] font-medium uppercase tracking-[0.06em] text-amber">
                  {typeLabels[lesson.type] ?? lesson.type}
                </span>
                {lesson.duration && (
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {lesson.duration}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <BookOpen size={10} /> {lesson.xp} XP · {lesson.frames} фреймов
                </span>
                <span className="rounded bg-white/5 px-2 py-[2px] uppercase">{lesson.status}</span>
              </div>
            </div>
            <button type="button" className="flex items-center gap-2 rounded-lg border border-green/30 bg-green/10 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.06em] text-green transition-all hover:bg-green/20">
              <CheckCircle size={14} /> Завершить
            </button>
          </div>

          {lesson.description && (
            <div className="mt-4 border-t border-white/[0.04] pt-4">
              <p className="text-sm font-light leading-[1.7] text-white/[0.55]">{lesson.description}</p>
            </div>
          )}
        </div>

        {/* Промпты */}
        {prompts.length > 0 && (
          <div className="card-cinema p-5">
            <h2 className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.08em] text-amber">Промпты</h2>
            <div className="space-y-3">
              {prompts.map((p) => (
                <div key={p.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  {p.title && <p className="mb-1 text-xs font-medium">{p.title}</p>}
                  {p.content && (
                    <pre className="whitespace-pre-wrap font-body text-[11px] font-light leading-[1.6] text-white/[0.55]">{p.content}</pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Домашнее задание */}
        {homework.length > 0 && (
          <div className="card-cinema p-5">
            <h2 className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.08em] text-green">Домашнее задание</h2>
            {homework.map((hw) => (
              <div key={hw.id}>
                {hw.title && <p className="mb-1 text-sm font-medium">{hw.title}</p>}
                {hw.content && <p className="text-xs font-light leading-[1.7] text-white/[0.55]">{hw.content}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Сайдбар */}
      <aside className="flex w-[284px] flex-col gap-3.5 max-md:w-full">
        {/* Прогресс урока */}
        <div className="card-cinema p-5">
          <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Прогресс</div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <CheckCircle size={18} className="text-white/20" />
            </div>
            <div>
              <p className="text-xs font-medium">Не завершён</p>
              <p className="text-[10px] text-white/25">Посмотри видео и сдай ДЗ</p>
            </div>
          </div>
        </div>

        {/* Материалы */}
        {files.length > 0 && (
          <div className="card-cinema p-5">
            <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Материалы</div>
            <div className="space-y-2">
              {files.map((f) => (
                <a
                  key={f.id}
                  href={f.file_url ?? '#'}
                  className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-xs font-light transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <FileText size={14} className="text-white/30" />
                  <span className="flex-1 truncate">{f.title ?? 'Файл'}</span>
                  <Download size={12} className="text-white/20" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Заметки */}
        <div className="card-cinema p-5">
          <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Заметки</div>
          <textarea
            placeholder="Твои заметки к уроку..."
            className="w-full resize-y rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs font-light text-white outline-none placeholder:text-white/15 focus:border-amber/30"
            rows={4}
          />
        </div>

        {/* Оценка */}
        <div className="card-cinema p-5">
          <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Оценить урок</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" className="text-white/15 transition-colors hover:text-amber">
                <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                  <path d="M8 0l2.5 5.3L16 6.2l-4 3.8 1 5.5L8 12.8l-5 2.7 1-5.5-4-3.8 5.5-.9z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
