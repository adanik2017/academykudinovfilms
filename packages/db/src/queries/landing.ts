import type { Client } from '../types'
import type { Database } from '../schema'


export async function getLandingToolCategories(supabase: Client) {
  return supabase
    .from('landing_tool_categories')
    .select('*, landing_tools(*)')
    .is('deleted_at', null)
    .order('order')
}

export async function createLandingToolCategory(
  supabase: Client,
  input: Database['public']['Tables']['landing_tool_categories']['Insert'],
) {
  return supabase.from('landing_tool_categories').insert(input).select().single()
}

export async function updateLandingToolCategory(
  supabase: Client,
  id: string,
  input: Database['public']['Tables']['landing_tool_categories']['Update'],
) {
  return supabase.from('landing_tool_categories').update(input).eq('id', id)
}

export async function deleteLandingToolCategory(supabase: Client, id: string) {
  return supabase
    .from('landing_tool_categories')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
}

export async function createLandingTool(
  supabase: Client,
  input: Database['public']['Tables']['landing_tools']['Insert'],
) {
  return supabase.from('landing_tools').insert(input).select().single()
}

export async function deleteLandingTool(supabase: Client, id: string) {
  return supabase
    .from('landing_tools')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
}
