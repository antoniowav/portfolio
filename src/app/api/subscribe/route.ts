import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let email = ''
  let source = 'list'
  try {
    const body = (await req.json()) as { email?: unknown; source?: unknown }
    email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    if (typeof body.source === 'string' && body.source.trim()) {
      source = body.source.trim().slice(0, 40)
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.EMAIL_TO
  const from = process.env.EMAIL_FROM

  // Clean stub: if email isn't configured, accept and log so the UX still works.
  if (!apiKey || !to || !from) {
    console.info(`[subscribe] (stub) new signup: ${email} [${source}]`)
    return NextResponse.json({ ok: true, stub: true })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New ${source} subscriber`,
      text: `New subscriber (${source}): ${email}`,
    })
    if (error) {
      console.error('[subscribe] resend error', error)
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[subscribe] unexpected', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
