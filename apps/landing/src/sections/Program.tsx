import { createServerSupabase } from '@kf/db'
import { cookies } from 'next/headers'
import { getAcademies } from '@kf/db/queries/academies'
import { getModulesByAcademy } from '@kf/db/queries/modules'
import type { Module } from '@kf/db'

const colorMap: Record<string, string> = {
  '#e8924a': 'border-t-amber',
  '#5ecf7e': 'border-t-green',
  '#7eb8f7': 'border-t-blue',
  '#c97ef7': 'border-t-purple',
  '#f27171': 'border-t-red',
}

export async function Program() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: academies } = await getAcademies(supabase)

  const academiesWithModules = await Promise.all(
    (academies ?? []).map(async (a) => {
      const { data: modules } = await getModulesByAcademy(supabase, a.id)
      return { ...a, modules: (modules ?? []) as Module[] }
    }),
  )

  return (
    <section className="mx-auto max-w-[1100px] px-10 py-[100px] max-sm:px-5 max-sm:py-[60px]" id="program">
      <h2 className="text-center font-display text-[clamp(32px,5vw,50px)] font-bold uppercase tracking-[0.02em]">
        Программа
      </h2>
      <div className="mx-auto mt-0 mb-10 h-px w-10 bg-white/20" />
      <p className="mb-14 text-center text-[15px] text-white/[0.32]">
        5 академий — от основ до продвинутых техник
      </p>

      <div className="flex flex-col gap-8">
        {academiesWithModules.map((academy, i) => {
          const borderClass = colorMap[academy.color] || 'border-t-amber'
          return (
            <div key={academy.id} className={`card-cinema overflow-hidden border-t-[3px] ${borderClass}`}>
              <div className="flex items-center gap-4 border-b border-white/[0.08] px-7 py-6 max-sm:flex-wrap">
                <span className="font-display text-[28px] font-bold min-w-[44px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-semibold tracking-[0.03em]">{academy.name}</h3>
                  <p className="mt-0.5 text-xs text-white/[0.32]">{academy.description}</p>
                </div>
                <span className="ml-auto whitespace-nowrap font-display text-[13px] text-white/[0.32] max-sm:ml-[60px]">
                  {academy.modules.length} модулей
                </span>
              </div>

              {academy.modules.length > 0 && (
                <div className="px-2 pb-2">
                  {academy.modules.map((mod: Module, mi: number) => (
                    <div key={mod.id} className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4 text-sm transition-colors hover:bg-white/[0.02] last:border-b-0">
                      <span className="min-w-[26px] font-display text-sm font-semibold text-white/[0.32]">
                        {String(mi + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 font-light text-white/[0.78]">{mod.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {(!academies || academies.length === 0) && (
          <p className="text-center text-sm text-white/25">Программа скоро появится</p>
        )}
      </div>
    </section>
  )
}
