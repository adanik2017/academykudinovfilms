'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { createCalendarEvent } from '@kf/db/queries/calendar'

type Result = { data: null; error: null } | { data: null; error: string }

export async function createEventAction(input: {
  title: string
  event_date: string
  event_time?: string
  type?: 'lesson' | 'deadline' | 'call' | 'webinar' | 'quest'
  description?: string
}): Promise<Result> {
  try {
    const cookieStore = await cookies()
    const session = await getSession(cookieStore)
    if (!session || session.role !== 'superadmin') return { data: null, error: 'Нет доступа' }

    const supabase = createServerSupabase(cookieStore)
    const { error } = await createCalendarEvent(supabase, {
      title: input.title,
      event_date: input.event_date,
      event_time: input.event_time,
      type: input.type,
      description: input.description,
    } as Parameters<typeof createCalendarEvent>[1])
    if (error) return { data: null, error: error.message }
    revalidatePath('/calendar')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}
