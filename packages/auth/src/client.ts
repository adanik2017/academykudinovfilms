'use client'

import { createBrowserClient } from '@supabase/ssr'

// В 'use client' t3-env не работает — клиентские переменные доступны через NEXT_PUBLIC_
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

function getSupabase() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export async function signUp(email: string, password: string, name: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signInWithGoogle() {
  const supabase = getSupabase()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  })
  return { data, error }
}

export async function signOut() {
  const supabase = getSupabase()
  const { error } = await supabase.auth.signOut()
  return { error }
}
