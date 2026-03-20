import { createServerClient } from '@supabase/ssr'
import type { SessionUser } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface CookieStore {
  getAll: () => { name: string; value: string }[]
  set: (name: string, value: string, options?: Record<string, unknown>) => void
}

function createSupabase(cookieStore: CookieStore) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options)
          } catch {
            // Server Components не могут менять cookies
          }
        })
      },
    },
  })
}

export async function getSession(cookieStore: CookieStore): Promise<SessionUser | null> {
  const supabase = createSupabase(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', user.id)
    .single()

  if (!profile) return null

  return {
    id: profile.id as string,
    authId: user.id,
    email: profile.email as string,
    name: profile.name as string,
    role: profile.role as SessionUser['role'],
    avatarUrl: profile.avatar_url as string | null,
  }
}
