import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Client = SupabaseClient<Database, 'public', any>
