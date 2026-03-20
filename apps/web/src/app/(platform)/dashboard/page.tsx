import { cookies } from 'next/headers'
import { getSession } from '@kf/auth/server'
import { createServerSupabase } from '@kf/db'
import { getUserGamification } from '@kf/db/queries/gamification'
import { getAcademies } from '@kf/db/queries/academies'
import Link from 'next/link'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  const supabase = createServerSupabase(cookieStore)

  const { data: gamification } = session
    ? await getUserGamification(supabase, session.id)
    : { data: null }
  const { data: academies } = await getAcademies(supabase)

  const xp = gamification?.xp ?? 0
  const frames = gamification?.frames ?? 0
  const rank = gamification?.rank ?? 'Наблюдатель'
  const streak = gamification?.streak ?? 0

  return (
    <div className="flex gap-4 p-5 max-md:flex-col">
      {/* Основной контент */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Hero карточка */}
        <div className="card-cinema relative overflow-hidden p-7">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_70%_40%,rgba(232,146,74,0.12)_0%,transparent_60%)]" />
          <div className="pointer-events-none absolute -top-10 right-[60px] h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(232,146,74,0.08)_0%,transparent_70%)] animate-[floatGlow_8s_ease-in-out_infinite]" />

          <div className="relative z-10 flex items-center gap-6">
            <div className="flex-1">
              <div className="mb-3 flex gap-2.5">
                <span className="rounded border border-white/[0.06] bg-white/[0.04] px-2 py-[3px] text-[8px] uppercase tracking-[0.18em] text-white/[0.32]">
                  Поток 4
                </span>
                <span className="rounded border border-white/[0.06] bg-white/[0.04] px-2 py-[3px] text-[8px] uppercase tracking-[0.18em] text-white/[0.32]">
                  {rank}
                </span>
              </div>
              <h1 className="font-display text-[38px] font-bold uppercase leading-[1.05]">
                Привет, <span className="text-white/[0.32]">{session?.name ?? 'Студент'}</span>
              </h1>
            </div>

            {/* Кольцо прогресса */}
            <div className="relative h-20 w-20">
              <svg width="80" height="80" className="-rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset="170.9" />
                <defs><linearGradient id="grad"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#e8924a" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[18px] font-bold">20%</span>
                <small className="text-[7px] uppercase tracking-[0.1em] text-white/[0.32]">Прогресс</small>
              </div>
            </div>
          </div>

          {/* Статы */}
          <div className="relative z-10 mt-3.5 flex gap-4">
            {[
              { val: String(xp), label: 'XP' },
              { val: String(frames), label: 'Фреймы', icon: '🎬' },
              { val: `${streak}`, label: 'Серия', icon: '🔥' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="flex items-center justify-center gap-[3px] font-display text-[16px] font-bold">
                  {s.icon && <span className="text-sm">{s.icon}</span>}
                  {s.val}
                </span>
                <span className="mt-0.5 text-[8px] uppercase tracking-[0.06em] text-white/[0.32]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Академии */}
        <div className="card-cinema p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.06em]">Академии</h2>
            <Link href="/program" className="text-[10px] uppercase tracking-[0.08em] text-amber transition-opacity hover:opacity-70">
              Все →
            </Link>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {academies?.map((a) => (
              <div
                key={a.id}
                className="cursor-pointer rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="mb-2 h-0.5 w-10 rounded-full" style={{ '--c': a.color } as React.CSSProperties}>
                  <div className="h-full w-full rounded-full bg-[var(--c)]" />
                </div>
                <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.03em] text-white/[0.58]">{a.name}</h3>
                <p className="mt-1 line-clamp-1 text-[10px] text-white/[0.25]">{a.description}</p>
                <div className="pbar mt-3">
                  <div className="pbar-fill" style={{ width: '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Сайдбар */}
      <aside className="flex w-[284px] flex-col gap-3.5 max-md:w-full">
        {/* Профиль */}
        <div className="card-cinema p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-amber/30 bg-amber/10 font-display text-xs font-semibold text-amber">
              {session?.name?.charAt(0)?.toUpperCase() ?? 'S'}
            </div>
            <div>
              <p className="font-display text-sm font-semibold">{session?.name ?? 'Студент'}</p>
              <p className="text-[10px] text-white/[0.32]">{rank}</p>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-[9px] text-white/[0.35]">
            <span>До ранга: <b className="text-amber">Оператор</b></span>
            <span>{xp} / 5 000 XP</span>
          </div>
          <div className="pbar mt-1.5">
            <div className="pbar-fill" style={{ width: `${Math.min((xp / 5000) * 100, 100)}%` }} />
          </div>
        </div>

        {/* Квесты */}
        <div className="card-cinema p-5">
          <h3 className="mb-3 font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-white/[0.32]">
            Квесты
          </h3>
          <p className="text-xs text-white/25">Квесты скоро появятся</p>
        </div>

        {/* Лидерборд */}
        <div className="card-cinema p-5">
          <h3 className="mb-3 font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-white/[0.32]">
            Рейтинг
          </h3>
          <p className="text-xs text-white/25">Рейтинг скоро появится</p>
        </div>
      </aside>
    </div>
  )
}
