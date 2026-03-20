import type { Client } from '../types'
import type { Database } from '../schema'


export async function getUserByAuthId(supabase: Client, authId: string) {
  return supabase.from('users').select('*').eq('auth_id', authId).single()
}

export async function getUserById(supabase: Client, id: string) {
  return supabase.from('users').select('*').eq('id', id).single()
}

export async function updateUserProfile(
  supabase: Client,
  id: string,
  input: Database['public']['Tables']['users']['Update'],
) {
  return supabase
    .from('users')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
}

export async function getUsers(supabase: Client) {
  return supabase
    .from('users')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
}
