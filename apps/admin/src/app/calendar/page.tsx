import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getCalendarEvents } from '@kf/db/queries/calendar'
import { Card } from '@kf/ui'

export default async function CalendarPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const now = new Date()
  const { data: events } = await getCalendarEvents(supabase, now.getMonth(), now.getFullYear())

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Календарь</h1>

      {events && events.length > 0 ? (
        <div className="space-y-2">
          {events.map((event) => (
            <Card key={event.id} className="flex items-center gap-3">
              <div className="text-center">
                <p className="font-display text-lg font-bold text-amber">
                  {new Date(event.event_date).getDate()}
                </p>
                <p className="text-[9px] uppercase text-muted">
                  {new Date(event.event_date).toLocaleDateString('ru-RU', { month: 'short' })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-[10px] text-muted">{event.type} · {event.event_time ?? 'весь день'}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">Нет событий в этом месяце</p>
      )}
    </div>
  )
}
