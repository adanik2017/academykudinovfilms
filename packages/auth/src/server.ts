import { createServerClient } from '@supabase/ssr'
import type { cookies } from 'next/headers'
import type { SessionUser } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function createSupabase(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
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

export async function getSession(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): Promise<SessionUser | null> {
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
    id: profile.id,
    authId: user.id,
    email: profile.email,
    name: profile.name,
    role: profile.role as SessionUser['role'],
    avatarUrl: profile.avatar_url,
  }
}
