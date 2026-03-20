import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './schema'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Тип cookie store — совместим с next/headers cookies()
interface CookieStore {
  getAll: () => { name: string; value: string }[]
  set: (name: string, value: string, options?: Record<string, unknown>) => void
}

// Серверный клиент — для Server Components и Server Actions
export function createServerSupabase(cookieStore: CookieStore) {
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options)
          } catch {
            // В Server Components нельзя менять cookies — это нормально
          }
        })
      },
    },
  })
}

// Браузерный клиент — для 'use client' компонентов
export function createBrowserSupabase() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Service Role клиент — полный доступ, обходит RLS. Только на сервере!
export function createServiceSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY не задан')
  return createClient<Database>(supabaseUrl, serviceKey)
}
