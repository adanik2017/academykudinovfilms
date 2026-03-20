import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getUsers } from '@kf/db/queries/users'
import { Search, Download, UserPlus } from 'lucide-react'

export default async function StudentsPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: users } = await getUsers(supabase)

  const students = (users ?? []).filter((u) => u.role === 'student')

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Студенты</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
            <Search size={13} className="text-white/30" />
            <input type="text" placeholder="Поиск..." className="w-32 bg-transparent text-xs text-white outline-none placeholder:text-white/20" />
          </div>
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/40 transition-all hover:bg-white/[0.06]">
            <Download size={12} /> Экспорт
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-amber/30 bg-amber/10 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber/20">
            <UserPlus size={12} /> Добавить
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { v: String(students.length), l: 'Всего', color: 'text-blue' },
          { v: String(students.filter(() => true).length), l: 'Активных', color: 'text-green' },
          { v: '0', l: 'В риске', color: 'text-amber' },
          { v: '0', l: 'Неактивных', color: 'text-red' },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-white/[0.08] bg-surface p-3 text-center">
            <p className={`font-display text-xl font-bold ${s.color}`}>{s.v}</p>
            <p className="text-[9px] uppercase tracking-wider text-white/25">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] bg-surface-2">
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">#</th>
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">Студент</th>
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">Тариф</th>
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">Прогресс</th>
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">Стрик</th>
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">Фреймы</th>
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">XP</th>
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">Дата</th>
              <th className="px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-white/25">Статус</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const initials = s.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
              return (
                <tr key={s.id} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-display text-white/30">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-amber/30 bg-amber/10 font-display text-[9px] font-semibold text-amber">
                        {initials}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{s.name}</p>
                        <p className="text-[10px] text-white/25">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/40">—</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-white/[0.06]">
                        <div className="h-full w-0 rounded-full bg-gradient-to-r from-white to-amber" />
                      </div>
                      <span className="text-[10px] text-white/30">0%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/40">0 🔥</td>
                  <td className="px-4 py-3 text-white/40">0</td>
                  <td className="px-4 py-3 text-white/40">0</td>
                  <td className="px-4 py-3 text-[10px] text-white/30">
                    {new Date(s.created_at).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-green/10 px-2 py-0.5 text-[9px] font-medium uppercase text-green">
                      active
                    </span>
                  </td>
                </tr>
              )
            })}
            {students.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-white/20">Нет студентов</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
