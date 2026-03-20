import { createProtectedMiddleware } from '@kf/auth/middleware'
import { type NextRequest } from 'next/server'

const protectedMiddleware = createProtectedMiddleware({ loginUrl: '/login' })

export async function middleware(request: NextRequest) {
  return protectedMiddleware(request)
}

export const config = {
  matcher: ['/dashboard/:path*', '/program/:path*', '/lesson/:path*', '/profile/:path*', '/feed/:path*'],
}
