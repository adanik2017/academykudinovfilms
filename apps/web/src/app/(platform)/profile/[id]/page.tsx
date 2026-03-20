import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServerSupabase } from '@kf/db'
import { getUserById } from '@kf/db/queries/users'
import { getUserGamification } from '@kf/db/queries/gamification'
import { Award, Flame, Star, Trophy, Edit3, Camera } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

const RANKS = [
  { name: 'Статист', level: 0 },
  { name: 'Наблюдатель', level: 1 },
  { name: 'Осветитель', level: 2 },
  { name: 'Оператор', level: 3 },
  { name: 'Режиссёр', level: 4 },
  { name: 'Продюсер', level: 5 },
  { name: 'Мастер', level: 6 },
]

export default async function ProfilePage({ params }: Props) {
  const { id } = await params
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: user } = await getUserById(supabase, id)
  if (!user) notFound()

  const { data: gamification } = await getUserGamification(supabase, user.id)
  const xp = gamification?.xp ?? 0
  const frames = gamification?.frames ?? 0
  const rank = gamification?.rank ?? 'Наблюдатель'
  const streak = gamification?.streak ?? 0
  const xpPercent = Math.min((xp / 5000) * 100, 100)
  const initials = user.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="flex gap-4 p-5 max-md:flex-col">
      {/* Левая колонка */}
      <div className="flex w-[320px] flex-col gap-4 max-md:w-full">
        {/* Аватар и имя */}
        <div className="card-cinema p-6 text-center">
          <div className="relative mx-auto mb-4 h-20 w-20">
            <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-amber/30 bg-amber/[0.15] font-display text-2xl font-bold text-amber">
              {initials}
            </div>
            <button type="button" className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-surface text-white/40 transition-colors hover:text-white">
              <Camera size={12} />
            </button>
          </div>
          <h1 className="font-display text-lg font-semibold uppercase tracking-wider">{user.name}</h1>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="rounded bg-amber/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em] text-amber">{rank}</span>
            <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em] text-white/40">{user.role}</span>
          </div>
          {user.bio && <p className="mt-3 text-xs font-light leading-[1.6] text-white/[0.45]">{user.bio}</p>}
          <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2 text-xs font-light text-white/50 transition-all hover:border-white/20 hover:text-white">
            <Edit3 size={12} /> Редактировать
          </button>
        </div>

        {/* Статистика */}
        <div className="card-cinema p-5">
          <div className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">СТАТИСТИКА</div>
          <div className="grid grid-cols-3 gap-0">
            {[
              { icon: Star, val: String(xp), label: 'XP', color: 'text-amber' },
              { icon: Award, val: String(frames), label: 'Фреймы', color: 'text-blue' },
              { icon: Flame, val: `${streak}`, label: 'Стрик', color: 'text-red' },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.label} className={`text-center ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
                  <Icon size={16} className={`mx-auto mb-1 ${s.color}`} />
                  <div className="font-display text-lg font-bold">{s.val}</div>
                  <div className="text-[8px] uppercase tracking-[0.06em] text-white/25">{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Ранг */}
        <div className="card-cinema p-5">
          <div className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">РАНГОВАЯ ЛЕСТНИЦА</div>
          <div className="mb-3 flex justify-between text-[9px] text-white/[0.35]">
            <span>{rank}</span>
            <span>{xp} / 5 000 XP</span>
          </div>
          <div className="pbar mb-4">
            <div className="pbar-fill" style={{ '--progress': `${xpPercent}%` } as React.CSSProperties} />
          </div>
          <div className="space-y-1">
            {RANKS.map((r, i) => {
              const isCurrent = r.name === rank
              const isPast = RANKS.findIndex(rr => rr.name === rank) >= i
              return (
                <div key={r.name} className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 ${isCurrent ? 'bg-amber/10' : ''}`}>
                  <div className={`h-2.5 w-2.5 rounded-full border ${isPast ? 'border-amber bg-amber shadow-[0_0_6px_rgba(232,146,74,0.4)]' : 'border-white/15 bg-white/[0.05]'}`} />
                  <span className={`text-[10px] font-display uppercase tracking-[0.06em] ${isCurrent ? 'text-amber font-semibold' : isPast ? 'text-white/50' : 'text-white/20'}`}>{r.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Активность */}
        <div className="card-cinema p-5">
          <div className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">АКТИВНОСТЬ</div>
          <div className="flex gap-[2px]">
            {Array.from({ length: 26 }).map((_, i) => (
              <div key={i} className="h-3 w-3 rounded-[2px] bg-white/[0.04]" />
            ))}
          </div>
          <p className="mt-2 text-[9px] text-white/20">0 активных дней за последние 6 месяцев</p>
        </div>
      </div>

      {/* Правая колонка */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Достижения */}
        <div className="card-cinema p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">ДОСТИЖЕНИЯ · 0 из 12</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {['Первая звезда', '7-дн серия', '10 уроков', 'Ранг: Оператор', 'Первый проект', 'Топ-3', '50 уроков', 'Мастер', '???'].map((ach) => (
              <div key={ach} className="flex flex-col items-center gap-1 rounded-lg border border-white/[0.04] p-2 text-center opacity-30">
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/[0.04]">
                  <Trophy size={14} className="text-white/20" />
                </div>
                <span className="text-[7px] uppercase tracking-[0.06em] text-white/40">{ach}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Сертификаты */}
        <div className="card-cinema p-5">
          <div className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">СЕРТИФИКАТЫ</div>
          <p className="py-4 text-center text-xs text-white/20">Завершите академию чтобы получить сертификат</p>
        </div>

        {/* Портфолио */}
        <div className="card-cinema p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">ПОРТФОЛИО</span>
            <div className="flex gap-1">
              {['Все', 'Фильмы', 'Проекты'].map((tab, i) => (
                <button key={tab} type="button" className={`rounded px-2 py-0.5 text-[9px] uppercase tracking-[0.06em] ${i === 0 ? 'bg-white/[0.06] text-white/60' : 'text-white/25 hover:text-white/40'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-8 text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03]">
                <Camera size={20} className="text-white/15" />
              </div>
              <p className="text-xs font-light text-white/25">Работы появятся здесь</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
