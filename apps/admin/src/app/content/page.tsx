import { cookies } from 'next/headers'
import Link from 'next/link'
import { createServerSupabase } from '@kf/db'
import { getAcademies } from '@kf/db/queries/academies'
import { getModulesByAcademy } from '@kf/db/queries/modules'
import type { Module } from '@kf/db'
import { Plus } from 'lucide-react'

export default async function ContentPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: academies } = await getAcademies(supabase)

  // Загружаем модули для каждой академии
  const academiesWithModules = await Promise.all(
    (academies ?? []).map(async (a) => {
      const { data: modules } = await getModulesByAcademy(supabase, a.id)
      return { ...a, modules: (modules ?? []) as Module[] }
    }),
  )

  return (
    <div className="flex flex-col gap-4 p-5">
      {/* Breadcrumb */}
      <div className="text-xs text-white/[0.32]">
        <span className="font-medium text-white">Все академии</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-bold uppercase tracking-[0.06em]">Академии</h1>
          <p className="mt-0.5 text-[13px] font-extralight text-white/[0.32]">Создавайте академии, добавляйте модули и уроки</p>
        </div>
        <button type="button" className="flex items-center gap-1.5 rounded-lg border border-amber/30 bg-amber/10 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber/20">
          <Plus size={14} /> Создать академию
        </button>
      </div>

      {/* Academy List */}
      <div className="space-y-3.5">
        {academiesWithModules.map((a, i) => {
          const totalLessons = 0 // TODO: подсчитать
          return (
            <Link key={a.id} href={`/content/${a.id}`}>
              <div
                className="cursor-pointer rounded-2xl border border-white/[0.08] bg-surface p-[22px] transition-all hover:border-white/[0.12] hover:bg-white/[0.02]"
                style={{ '--ac': a.color, borderTopWidth: '2px', borderTopColor: a.color } as React.CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5 flex-1">
                    <span className="font-display text-[42px] leading-none text-white/[0.04] min-w-[50px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h2 className="font-display text-[18px] font-bold uppercase tracking-[0.06em]" style={{ color: a.color }}>
                        {a.name}
                      </h2>
                      <p className="mt-0.5 text-xs font-extralight text-white/[0.32]">{a.description}</p>
                      <p className="mt-1.5 text-[11px] font-extralight text-white/[0.32]">
                        {a.modules.length} модулей · {totalLessons} уроков · Доступ: {a.access}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-[22px] text-white/[0.32]">0%</span>
                    <span className="text-lg text-white/20">→</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}

        {(!academies || academies.length === 0) && (
          <p className="py-10 text-center text-[13px] font-extralight text-white/[0.32]">
            Нет академий. Нажмите &quot;+ Создать академию&quot; для начала.
          </p>
        )}
      </div>
    </div>
  )
}
