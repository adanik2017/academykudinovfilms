import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getUsers } from '@kf/db/queries/users'
import { Download, UserPlus } from 'lucide-react'

export default async function AccountsPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: users } = await getUsers(supabase)

  const students = (users ?? []).filter((u) => u.role === 'student')

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] font-bold uppercase tracking-[0.06em]">Личные кабинеты</h1>
          <p className="mt-0.5 text-[13px] font-extralight text-white/[0.32]">{students.length} студентов · управление профилями</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-light text-white/60 transition-all hover:bg-white/[0.08]">
            <Download size={12} /> Экспорт
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-amber/30 bg-amber/10 px-4 py-2 text-xs font-light text-amber transition-all hover:bg-amber/20">
            <UserPlus size={12} /> Добавить
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { v: String(students.length), l: 'Всего', color: '' },
          { v: String(students.length), l: 'Активных', color: 'text-green' },
          { v: '0', l: 'В риске', color: 'text-amber' },
          { v: '0', l: 'Неактивных', color: 'text-red' },
          { v: '0%', l: 'Ср. прогресс', color: 'text-amber' },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-white/[0.08] bg-surface p-4">
            <p className={`font-display text-[28px] font-bold tracking-[0.02em] ${k.color}`}>{k.v}</p>
            <p className="mt-1 text-[10px] font-light uppercase tracking-[0.08em] text-white/[0.32]">{k.l}</p>
          </div>
        ))}
      </div>

      {/* Account Cards */}
      {students.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
          <p className="py-8 text-center text-[13px] font-extralight text-white/[0.32]">Нет студентов</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3.5">
          {students.map((s) => {
            const initials = s.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
            return (
              <div key={s.id} className="rounded-2xl border border-white/[0.08] bg-surface p-5">
                <div className="mb-3.5 flex items-center gap-3">
                  <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-amber/30 bg-amber/[0.06] font-display text-[13px] text-amber">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-normal">{s.name}</p>
                    <p className="text-[10px] font-extralight text-white/[0.32]">{s.email}</p>
                    <span className="mt-0.5 inline-block rounded text-[9px] font-light uppercase tracking-[0.08em] text-white/[0.32]">
                      {s.role}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] font-light mb-1">
                    <span className="text-white/[0.32]">Прогресс</span>
                    <span className="text-white/[0.32]">0%</span>
                  </div>
                  <div className="h-[3px] rounded-sm bg-white/[0.07]">
                    <div className="h-full w-0 rounded-sm bg-gradient-to-r from-white/20 to-amber" />
                  </div>
                </div>

                <p className="mb-3 text-[11px] font-extralight text-white/[0.32]">Текущий урок: —</p>

                {/* Stats */}
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {[
                    { v: '0', l: 'Фреймы' },
                    { v: '0', l: 'XP' },
                    { v: '0', l: 'Стрик' },
                  ].map((st) => (
                    <div key={st.l} className="rounded-lg bg-white/[0.02] p-2 text-center">
                      <p className="font-display text-[18px] font-bold">{st.v}</p>
                      <p className="text-[9px] font-extralight uppercase tracking-[0.06em] text-white/[0.32]">{st.l}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-1.5">
                  <button type="button" className="flex-1 rounded-md border border-amber/20 bg-amber/10 py-[7px] text-center text-[10px] font-light uppercase tracking-[0.04em] text-amber transition-all hover:bg-amber/[0.18]">
                    Открыть кабинет
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
