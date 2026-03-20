import { createProtectedMiddleware } from '@kf/auth/middleware'
import { type NextRequest } from 'next/server'

const protectedMiddleware = createProtectedMiddleware({
  loginUrl: '/login',
  requiredRole: 'superadmin',
})

export async function middleware(request: NextRequest) {
  return protectedMiddleware(request)
}

export const config = {
  matcher: ['/((?!login|_next|favicon.ico).*)'],
}
