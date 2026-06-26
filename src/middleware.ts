import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const GATE_TOKEN = process.env.SITE_GATE_TOKEN

export default auth((req) => {
  const { nextUrl } = req
  const path = nextUrl.pathname

  // Endpoints that must be reachable before either gate
  const isGatePublic =
    path === '/gate' || path.startsWith('/api/gate') || path.startsWith('/api/auth')

  // Layer 1: shared password
  const hasGate = req.cookies.get('site_access')?.value === GATE_TOKEN
  if (!hasGate && !isGatePublic) {
    const url = new URL('/gate', nextUrl)
    url.searchParams.set('next', path + nextUrl.search)
    return NextResponse.redirect(url)
  }

  // Layer 2: Okta (NextAuth). Skip on the auth/gate endpoints and the sign-in page.
  const isAuthFlow = isGatePublic || path === '/signin'
  if (hasGate && !req.auth && !isAuthFlow) {
    const url = new URL('/signin', nextUrl)
    url.searchParams.set('callbackUrl', nextUrl.href)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
