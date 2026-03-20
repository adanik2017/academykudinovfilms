import { createServerSupabase } from '@kf/db'
import { cookies } from 'next/headers'
import { getAcademies } from '@kf/db/queries/academies'

export async function Program() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: academies } = await getAcademies(supabase)

  return (
    <section id="program" className="mx-auto max-w-5xl px-4 py-24">
      <h2 className="text-center font-display text-2xl font-semibold uppercase tracking-wider md:text-3xl">
        Программа
      </h2>
      <p className="mt-4 text-center text-sm font-light text-dim">
        4 академии — от основ до продвинутых техник
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {academies?.map((academy) => (
          <div
            key={academy.id}
            className="rounded-2xl border border-border-light bg-surface p-6"
          >
            <div
              className="mb-3 h-1 w-12 rounded-full"
              style={{ '--academy-color': academy.color } as React.CSSProperties}
            >
              <div className="h-full w-full rounded-full bg-[var(--academy-color)]" />
            </div>
            <h3 className="font-display text-lg font-semibold uppercase tracking-wider">
              {academy.name}
            </h3>
            <p className="mt-2 text-sm font-light text-dim">{academy.description}</p>
          </div>
        ))}
        {(!academies || academies.length === 0) && (
          <p className="col-span-2 text-center text-sm text-muted">Программа скоро появится</p>
        )}
      </div>
    </section>
  )
}
