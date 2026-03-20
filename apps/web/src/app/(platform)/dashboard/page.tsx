import { cookies } from 'next/headers'
import { getSession } from '@kf/auth/server'
import { createServerSupabase } from '@kf/db'
import { getUserGamification } from '@kf/db/queries/gamification'
import { getAcademies } from '@kf/db/queries/academies'
import { getCalendarEvents } from '@kf/db/queries/calendar'
import Link from 'next/link'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  const supabase = createServerSupabase(cookieStore)

  const { data: gamification } = session
    ? await getUserGamification(supabase, session.id)
    : { data: null }
  const { data: academies } = await getAcademies(supabase)

  const now = new Date()
  const { data: events } = await getCalendarEvents(supabase, now.getMonth(), now.getFullYear())

  const xp = gamification?.xp ?? 0
  const frames = gamification?.frames ?? 0
  const rank = gamification?.rank ?? 'Наблюдатель'
  const streak = gamification?.streak ?? 0
  const xpPercent = Math.min((xp / 5000) * 100, 100)
  const firstName = session?.name?.split(' ')[0]?.toUpperCase() ?? ''

  return (
    <div className="flex gap-4 p-5 max-md:flex-col">
      {/* Основной контент */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Hero */}
        <div className="card-cinema relative overflow-hidden p-7">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_70%_40%,rgba(232,146,74,0.12)_0%,transparent_60%)]" />
          <div className="pointer-events-none absolute -top-10 right-[60px] h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(232,146,74,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10 flex items-center gap-6">
            <div className="flex-1">
              <div className="mb-3 flex gap-2.5">
                <span className="rounded border border-white/[0.06] bg-white/[0.04] px-2 py-[3px] text-[8px] uppercase tracking-[0.18em] text-white/[0.32]">Поток 4</span>
                <span className="rounded border border-white/[0.06] bg-white/[0.04] px-2 py-[3px] text-[8px] uppercase tracking-[0.18em] text-white/[0.32]">{rank}</span>
              </div>
              <h1 className="font-display text-[38px] font-bold uppercase leading-[1.05]">
                С возвращением,<br /><span className="text-white/[0.32]">{firstName}</span>
              </h1>
            </div>

            <div className="relative h-20 w-20 max-sm:hidden">
              <svg width="80" height="80" className="-rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset={213.6 - (213.6 * xpPercent / 100)} />
                <defs><linearGradient id="grad"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#e8924a" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[18px] font-bold">{Math.round(xpPercent)}%</span>
                <small className="text-[7px] uppercase tracking-[0.1em] text-white/[0.32]">Прогресс</small>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-3.5 flex gap-4">
            {[
              { val: String(xp), label: 'XP' },
              { val: String(frames), label: 'Фреймы', icon: '🎬' },
              { val: `${streak}`, label: 'Дней подряд', icon: '🔥' },
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
            <Link href="/program" className="text-[10px] uppercase tracking-[0.08em] text-amber transition-opacity hover:opacity-70">Все →</Link>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {academies?.map((a) => (
              <Link key={a.id} href="/program" className="cursor-pointer rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]">
                <div className="mb-2 h-0.5 w-10 rounded-full" style={{ '--c': a.color } as React.CSSProperties}>
                  <div className="h-full w-full rounded-full bg-[var(--c)]" />
                </div>
                <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.03em] text-white/[0.58]">{a.name}</h3>
                <p className="mt-1 line-clamp-1 text-[10px] text-white/[0.25]">{a.description}</p>
                <div className="pbar mt-3">
                  <div className="pbar-fill" style={{ '--progress': '0%' } as React.CSSProperties} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Сайдбар */}
      <aside className="flex w-[284px] flex-col gap-3.5 max-md:w-full">
        {/* Следующий урок */}
        <div className="card-cinema p-[18px]">
          <div className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-amber">СЛЕДУЮЩИЙ УРОК</div>
          <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20" type="button">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><polygon points="6,3 20,12 6,21" /></svg>
            </button>
          </div>
          <p className="text-[11px] font-medium uppercase">Начни с первого урока</p>
          <p className="mt-1 text-[10px] text-white/[0.32]">Перейди в Программу чтобы начать</p>
          <Link href="/program" className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2.5 font-display text-xs font-semibold uppercase tracking-[0.06em] transition-all hover:border-amber/30 hover:bg-amber/10 hover:text-amber">
            Перейти →
          </Link>
        </div>

        {/* Профиль */}
        <div className="card-cinema p-5">
          <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">ПРОФИЛЬ</div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-amber/30 bg-amber/[0.15] font-display text-[11px] font-semibold text-amber">
              {session?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) ?? 'S'}
            </div>
            <div>
              <p className="font-display text-xs font-semibold">{session?.name ?? 'Студент'}</p>
              <p className="text-[9px] text-white/[0.35]">{rank}</p>
            </div>
          </div>
          <div className="mt-2.5 flex justify-between text-[9px] text-white/[0.35]">
            <span>До ранга: <b className="text-amber">Оператор</b></span>
            <span className="font-display">{xp} / 5 000 XP</span>
          </div>
          <div className="pbar mt-1.5 mb-3">
            <div className="pbar-fill" style={{ '--progress': `${xpPercent}%` } as React.CSSProperties} />
          </div>
          <div className="flex">
            {[
              { val: String(frames), label: 'Фреймы' },
              { val: `${streak} 🔥`, label: 'Серия' },
              { val: '—', label: 'Место' },
            ].map((s, i) => (
              <div key={s.label} className={`flex-1 text-center ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
                <div className="font-display text-[15px] font-bold">{s.val}</div>
                <div className="mt-0.5 text-[8px] text-white/25">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Календарь */}
        <div className="card-cinema p-5">
          <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">КАЛЕНДАРЬ</div>
          {events && events.length > 0 ? (
            <div className="space-y-2">
              {events.slice(0, 3).map((ev) => (
                <div key={ev.id} className="flex items-center gap-2.5 border-b border-white/[0.03] pb-2">
                  <span className="font-display text-[13px] text-amber min-w-[44px]">
                    {new Date(ev.event_date).getDate()}.{String(new Date(ev.event_date).getMonth() + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] font-light text-white/60">{ev.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-2 text-center text-xs text-white/20">Нет событий</p>
          )}
        </div>

        {/* Активность */}
        <div className="card-cinema p-5">
          <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">АКТИВНОСТЬ</div>
          <p className="py-2 text-center text-xs text-white/20">Нет активности</p>
        </div>

        {/* Квесты */}
        <div className="card-cinema p-5">
          <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">ЗАДАНИЯ ДНЯ</div>
          <p className="py-2 text-center text-xs text-white/20">Нет заданий</p>
        </div>

        {/* Рейтинг */}
        <div className="card-cinema p-5">
          <div className="mb-2.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">РЕЙТИНГ</div>
          <p className="py-2 text-center text-xs text-white/20">Нет данных</p>
        </div>
      </aside>
    </div>
  )
}
