import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const password = typeof body?.password === 'string' ? body.password : ''

  if (password && password === process.env.SITE_PASSWORD) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('site_access', process.env.SITE_GATE_TOKEN ?? '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    return res
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
