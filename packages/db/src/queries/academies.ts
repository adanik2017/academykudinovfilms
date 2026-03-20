import type { Client } from '../types'
import type { Database } from '../schema'


export async function getAcademies(supabase: Client) {
  return supabase
    .from('academies')
    .select('*')
    .is('deleted_at', null)
    .order('order')
}

export async function getAcademyById(supabase: Client, id: string) {
  return supabase
    .from('academies')
    .select('*')
    .eq('id', id)
    .single()
}

export async function createAcademy(
  supabase: Client,
  input: { name: string; description?: string; color?: string; access?: 'open' | 'tariff' | 'invite'; order?: number },
) {
  return supabase
    .from('academies')
    .insert({
      name: input.name,
      description: input.description ?? input.name,
      color: input.color ?? '#e8924a',
      access: input.access ?? 'open',
      order: input.order ?? 0,
    })
    .select()
    .single()
}

export async function updateAcademy(
  supabase: Client,
  id: string,
  input: Database['public']['Tables']['academies']['Update'],
) {
  return supabase
    .from('academies')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
}

export async function deleteAcademy(supabase: Client, id: string) {
  return supabase
    .from('academies')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
}
