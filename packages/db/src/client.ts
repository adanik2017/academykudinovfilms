import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './schema'
import { env } from './env'

interface CookieStore {
  getAll: () => { name: string; value: string }[]
  set: (name: string, value: string, options?: Record<string, unknown>) => void
}

// Серверный клиент — для Server Components и Server Actions
export function createServerSupabase(cookieStore: CookieStore) {
  return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options)
          } catch {
            // В Server Components нельзя менять cookies
          }
        })
      },
    },
  })
}

// Браузерный клиент — для 'use client' компонентов
export function createBrowserSupabase() {
  return createBrowserClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Service Role клиент — полный доступ, обходит RLS. Только на сервере!
export function createServiceSupabase() {
  return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
}
