import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../schema'

type Client = SupabaseClient<Database>

export async function getCalendarEvents(supabase: Client, month: number, year: number) {
  const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`
  const endMonth = month + 2 > 12 ? 1 : month + 2
  const endYear = month + 2 > 12 ? year + 1 : year
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`

  return supabase
    .from('calendar_events')
    .select('*')
    .gte('event_date', startDate)
    .lt('event_date', endDate)
    .order('event_date')
}

export async function createCalendarEvent(
  supabase: Client,
  input: Database['public']['Tables']['calendar_events']['Insert'],
) {
  return supabase.from('calendar_events').insert(input).select().single()
}
