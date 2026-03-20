import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import type { Module } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { getAcademies } from '@kf/db/queries/academies'
import { getModulesByAcademy } from '@kf/db/queries/modules'
import { getUserAccess } from '@kf/db/queries/subscriptions'
import { Card, Badge } from '@kf/ui'
import { Lock } from 'lucide-react'

export default async function ProgramPage() {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  const supabase = createServerSupabase(cookieStore)

  const { data: academies } = await getAcademies(supabase)
  const access = session ? await getUserAccess(supabase, session.id) : { tariff: null, academyIds: [] }

  // Загружаем модули для каждой академии
  const academiesWithModules = await Promise.all(
    (academies ?? []).map(async (a) => {
      const { data: modules } = await getModulesByAcademy(supabase, a.id)
      return { ...a, modules: modules ?? [] }
    }),
  )

  return (
    <div className="space-y-6 p-5">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Программа</h1>

      <div className="space-y-6">
        {academiesWithModules.map((academy) => {
          const hasAccess = access.academyIds.includes(academy.id)

          return (
            <Card key={academy.id} className="relative overflow-hidden">
              {!hasAccess && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2">
                    <Lock size={24} className="text-muted" />
                    <p className="text-xs text-muted">Нужен тариф для доступа</p>
                  </div>
                </div>
              )}

              <div className="mb-3 h-1 w-12 rounded-full" style={{ '--c': academy.color } as React.CSSProperties}>
                <div className="h-full w-full rounded-full bg-[var(--c)]" />
              </div>
              <h2 className="font-display text-lg font-semibold uppercase tracking-wider">{academy.name}</h2>
              <p className="mt-1 text-xs font-light text-muted">{academy.description}</p>

              {academy.modules.length > 0 && (
                <div className="mt-4 space-y-2">
                  {academy.modules.map((mod: Module, i: number) => (
                    <div key={mod.id} className="flex items-center gap-3 rounded-lg bg-white/[0.02] p-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-[10px] font-medium text-muted">
                        {i + 1}
                      </span>
                      <span className="text-sm font-light">{mod.title}</span>
                      <Badge variant="default" className="ml-auto">Модуль</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
