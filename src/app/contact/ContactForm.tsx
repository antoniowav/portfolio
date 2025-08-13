'use client'

import { DownloadButton } from '@/components/DownloadButton'
import { PageLayout } from '@/components/PageLayout'
import { author } from '@/data'
import Alert from '@/ui/Alert'
import Button from '@/ui/Button'
import Input, { Checkbox, Textarea } from '@/ui/Input'
import { FormEvent, useState } from 'react'

type FormState = {
  name: string
  email: string
  message: string
  consent: boolean
  honeypot: string // Used for spam detection
}

type FormErrors = Partial<Record<keyof FormState, string>>

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm(): JSX.Element {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    consent: false,
    honeypot: '', // Should remain empty - honeypot field for bots
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const startTime = useState(Date.now())[0] // Used to detect too-quick submissions

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    if (!formState.consent) {
      newErrors.consent = 'You must consent to our privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? !!checked : value,
    }))

    // Clear error for the field being edited
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Check if the honeypot field was filled (likely a bot)
    if (formState.honeypot) {
      // Honeypot field was filled - likely a bot
      // Pretend success but don't actually submit
      setSubmissionState('success')
      return
    }

    // Check if the form was submitted too quickly (likely a bot)
    const timeSinceLoad = Date.now() - startTime
    if (timeSinceLoad < 3000) {
      // Less than 3 seconds - likely a bot
      // Pretend success but don't actually submit
      setSubmissionState('success')
      return
    }

    if (!validateForm()) {
      return
    }

    setSubmissionState('submitting')

    try {
      // Send form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form')
      }

      setSubmissionState('success')
      // Reset form after successful submission
      setFormState({
        name: '',
        email: '',
        message: '',
        consent: false,
        honeypot: '',
      })
    } catch (error) {
      // Handle form submission error
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      )
    }
  }

  return (
    <PageLayout
      title="Get in touch"
      description="Have a project in mind or just want to say hello? Send me a message and I'll get back to you as soon as possible."
      maxWidth="full"
    >
      {/* Add padding at the bottom to ensure consistent scrollbar */}
      <div style={{ minHeight: '70vh' }}>
        <div className="bg-bg-secondary border border-border p-4 rounded">
          {submissionState === 'success' ? (
            <div className="py-8">
              <Alert
                type="success"
                title="Message sent!"
                message="Thank you for reaching out. I'll get back to you as soon as possible."
              />
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setSubmissionState('idle')}
                  variant="primary"
                  className="cursor-pointer"
                >
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  name="name"
                  label="Name"
                  value={formState.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  fullWidth
                  startIcon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  }
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  fullWidth
                  startIcon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                />
                <Textarea
                  name="message"
                  label="Message"
                  value={formState.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                  fullWidth
                  rows={6}
                />
                {/* Hidden honeypot field to catch bots */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.honeypot}
                    onChange={handleChange}
                  />
                </div>
                <Checkbox
                  name="consent"
                  label="I consent to having my information stored for contact purposes"
                  checked={formState.consent}
                  onChange={handleChange}
                  error={errors.consent}
                  required
                  description="Your data will only be used to respond to your inquiry and won't be shared with third parties."
                />
              </div>

              {submissionState === 'error' && (
                <Alert
                  type="error"
                  title="Error sending message"
                  message={
                    errorMessage ||
                    'There was a problem sending your message. Please try again.'
                  }
                />
              )}

              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  loading={submissionState === 'submitting'}
                  disabled={submissionState === 'submitting'}
                  className="cursor-pointer"
                >
                  {submissionState === 'submitting'
                    ? 'Sending...'
                    : 'Send Message'}
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 bg-bg-secondary border border-border p-4 rounded">
          <div className="text-text-primary font-mono">
            <p className="mb-2">
              <span className="text-accent-primary">$</span> ping{' '}
              {author.name.toLowerCase().replace(/\s+/g, '-')}
            </p>
            <div className="flex flex-col space-y-1 text-text-secondary">
              <p>
                <span className="text-text-tertiary">
                  You can also reach me directly at:
                </span>
              </p>
              <p>
                <span className="text-accent-primary">email:</span>{' '}
                <a
                  href={`mailto:${author.email}`}
                  className="text-accent-primary hover:underline"
                >
                  {author.email}
                </a>
              </p>
              <p className="mt-2">
                <span className="text-accent-primary">resume:</span>{' '}
                <DownloadButton
                  filePath="/documents/Antonio_Piattelli_resume.pdf"
                  fileName="Antonio_Piattelli_Resume.pdf"
                  variant="ghost"
                  size="sm"
                  className="text-accent-primary hover:underline inline-flex"
                >
                  Download CV
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </DownloadButton>
              </p>
              {author.social && author.social.length > 0 && (
                <div className="mt-4">
                  <span className="text-text-tertiary">Find me online:</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {author.social.map(platform => (
                      <a
                        key={platform.platform}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-accent-primary transition-colors"
                      >
                        {platform.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ContactForm
