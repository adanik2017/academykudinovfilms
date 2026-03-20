import { createServerSupabase } from '@kf/db'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = {
      getAll: () => request.cookies.getAll(),
      set: (name: string, value: string, options?: Record<string, unknown>) => {
        // В route handler cookies устанавливаются через response
      },
    }

    const supabase = createServerSupabase(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
