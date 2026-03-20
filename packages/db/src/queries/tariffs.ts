import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../schema'

type Client = SupabaseClient<Database>

export async function getTariffs(supabase: Client) {
  return supabase.from('tariffs').select('*').order('order')
}

export async function createTariff(
  supabase: Client,
  input: Database['public']['Tables']['tariffs']['Insert'],
) {
  return supabase.from('tariffs').insert(input).select().single()
}

export async function updateTariff(
  supabase: Client,
  id: string,
  input: Database['public']['Tables']['tariffs']['Update'],
) {
  return supabase.from('tariffs').update(input).eq('id', id)
}

export async function deleteTariff(supabase: Client, id: string) {
  return supabase.from('tariffs').delete().eq('id', id)
}
