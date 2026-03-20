import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../schema'

type Client = SupabaseClient<Database>

export async function getLessonsByModule(supabase: Client, moduleId: string) {
  return supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId)
    .is('deleted_at', null)
    .order('order')
}

export async function getLessonById(supabase: Client, id: string) {
  return supabase
    .from('lessons')
    .select('*, lesson_content(*)')
    .eq('id', id)
    .single()
}

export async function createLesson(
  supabase: Client,
  input: Database['public']['Tables']['lessons']['Insert'],
) {
  return supabase.from('lessons').insert(input).select().single()
}

export async function updateLesson(
  supabase: Client,
  id: string,
  input: Database['public']['Tables']['lessons']['Update'],
) {
  return supabase
    .from('lessons')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
}

export async function deleteLesson(supabase: Client, id: string) {
  return supabase
    .from('lessons')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
}
