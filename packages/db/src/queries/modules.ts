import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../schema'

type Client = SupabaseClient<Database>

export async function getModulesByAcademy(supabase: Client, academyId: string) {
  return supabase
    .from('modules')
    .select('*')
    .eq('academy_id', academyId)
    .is('deleted_at', null)
    .order('order')
}

export async function createModule(
  supabase: Client,
  input: { academy_id: string; title: string; order?: number },
) {
  return supabase
    .from('modules')
    .insert({ academy_id: input.academy_id, title: input.title, order: input.order ?? 0 })
    .select()
    .single()
}

export async function deleteModule(supabase: Client, id: string) {
  return supabase
    .from('modules')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
}
