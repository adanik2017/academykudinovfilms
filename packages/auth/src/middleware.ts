import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// В middleware env из t3-env не работает — используем process.env с проверкой
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Обновляет сессию и проверяет авторизацию
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options as Record<string, unknown>),
        )
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()

  return { user, supabaseResponse, supabase }
}

interface ProtectOptions {
  loginUrl?: string
  requiredRole?: string
  adminLoginUrl?: string
}

export function createProtectedMiddleware(options: ProtectOptions = {}) {
  const { loginUrl = '/login', requiredRole, adminLoginUrl } = options

  return async (request: NextRequest) => {
    const { user, supabaseResponse, supabase } = await updateSession(request)

    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = loginUrl
      return NextResponse.redirect(url)
    }

    if (requiredRole) {
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('auth_id', user.id)
        .single()

      if (profile?.role !== requiredRole) {
        const url = request.nextUrl.clone()
        url.pathname = adminLoginUrl ?? loginUrl
        return NextResponse.redirect(url)
      }
    }

    return supabaseResponse
  }
}
