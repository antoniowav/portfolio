'use client'

import { useId, useState, type FormEvent } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Props = {
  /** Tags the signup server-side so list vs templates are distinguishable. */
  source?: string
  /** Button label in the idle state. */
  cta?: string
  /** Message shown on success. */
  successMessage?: string
  placeholder?: string
}

export function SignupForm({
  source = 'list',
  cta = 'Subscribe',
  successMessage = 'You are on the list. I will be in touch.',
  placeholder = 'you@studio.com',
}: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const fieldId = useId()
  const statusId = `${fieldId}-status`

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return
    const form = e.currentTarget
    const email = String(new FormData(form).get('email') ?? '').trim()
    if (!email) return

    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean }
      if (res.ok && data.ok) {
        setStatus('success')
        setMessage(successMessage)
        form.reset()
      } else {
        setStatus('error')
        setMessage('Something went wrong. Try again in a moment.')
      }
    } catch {
      setStatus('error')
      setMessage('Network hiccup. Try again in a moment.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-7" noValidate>
      <label htmlFor={fieldId} className="micro block">
        Email address
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id={fieldId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          disabled={status === 'loading'}
          placeholder={placeholder}
          aria-describedby={statusId}
          className="h-12 flex-1 border border-ink/25 bg-paper px-4 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus-visible:border-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-7 text-[0.95rem] font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? 'Joining…' : cta}
        </button>
      </div>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-sm ${
          status === 'error' ? 'text-accent-deep' : 'text-ink-2'
        }`}
      >
        {message}
      </p>
    </form>
  )
}
