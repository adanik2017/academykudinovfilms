import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getCalendarEvents } from '@kf/db/queries/calendar'
import { Plus } from 'lucide-react'

const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = []
  for (let i = 0; i < offset; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  return days
}

const TYPE_COLORS: Record<string, string> = {
  lesson: 'bg-amber',
  deadline: 'bg-red',
  call: 'bg-blue',
  webinar: 'bg-purple',
  quest: 'bg-green',
}

export default async function CalendarPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const now = new Date()
  const { data: events } = await getCalendarEvents(supabase, now.getMonth(), now.getFullYear())

  const days = getMonthDays(now.getFullYear(), now.getMonth())
  const today = now.getDate()

  const eventsByDay: Record<number, typeof events> = {}
  events?.forEach((e) => {
    const day = new Date(e.event_date).getDate()
    if (!eventsByDay[day]) eventsByDay[day] = []
    eventsByDay[day]!.push(e)
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Календарь</h1>
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-semibold">{MONTH_NAMES[now.getMonth()]} {now.getFullYear()}</span>
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-amber/30 bg-amber/10 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber/20">
            <Plus size={12} /> Событие
          </button>
        </div>
      </div>

      {/* Месячная сетка */}
      <div className="rounded-xl border border-white/[0.08] bg-surface p-4">
        <div className="mb-2 grid grid-cols-7 gap-1">
          {DAY_NAMES.map((d) => (
            <div key={d} className="py-1 text-center text-[9px] font-medium uppercase tracking-wider text-white/25">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />
            const isToday = day === today
            const dayEvents = eventsByDay[day]
            return (
              <div
                key={day}
                className={`relative min-h-[48px] rounded-lg p-1.5 text-center transition-colors ${
                  isToday ? 'bg-amber text-black font-semibold shadow-[0_0_8px_rgba(232,146,74,0.3)]' : 'text-white/40 hover:bg-white/[0.03]'
                }`}
              >
                <span className="text-[11px]">{day}</span>
                {dayEvents && dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-[2px]">
                    {dayEvents.slice(0, 3).map((e, ei) => (
                      <span key={ei} className={`h-1 w-1 rounded-full ${TYPE_COLORS[e.type] ?? 'bg-white/20'}`} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Легенда */}
      <div className="flex flex-wrap gap-4">
        {[
          { type: 'Урок', color: 'bg-amber' },
          { type: 'Дедлайн', color: 'bg-red' },
          { type: 'Созвон', color: 'bg-blue' },
          { type: 'Вебинар', color: 'bg-purple' },
          { type: 'Квест', color: 'bg-green' },
        ].map((l) => (
          <div key={l.type} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${l.color}`} />
            <span className="text-[10px] text-white/30">{l.type}</span>
          </div>
        ))}
      </div>

      {/* Список событий */}
      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">События этого месяца</h2>
        {events && events.length > 0 ? (
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-3 rounded-lg bg-white/[0.02] p-3">
                <div className="text-center min-w-[40px]">
                  <p className="font-display text-lg font-bold text-amber">{new Date(event.event_date).getDate()}</p>
                  <p className="text-[8px] uppercase text-white/25">{new Date(event.event_date).toLocaleDateString('ru-RU', { month: 'short' })}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">{event.title}</p>
                  <p className="text-[10px] text-white/30">{event.type} · {event.event_time ?? 'весь день'}</p>
                </div>
                <span className={`h-2 w-2 rounded-full ${TYPE_COLORS[event.type] ?? 'bg-white/20'}`} />
              </div>
            ))}
          </div>
        ) : (
          <p className="py-4 text-center text-xs text-white/20">Нет событий в этом месяце</p>
        )}
      </div>
    </div>
  )
}
