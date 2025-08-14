'use client'

import Button from '@/ui/Button'
import { useState } from 'react'

interface QuickActionsProps {
  className?: string
}

export const QuickActions = ({ className = '' }: QuickActionsProps) => {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@antoniopiattelli.com')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (error) {
      // Failed to copy email to clipboard
    }
  }

  return (
    <section
      className={`py-16 bg-bg-secondary border-t border-border ${className}`}
    >
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-start">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-accent-primary font-mono text-sm">$</span>
            <span className="text-text-tertiary font-mono text-sm">
              cat quick_actions.sh
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-mono font-semibold text-text-primary mb-4">
            Quick Actions
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Ready to collaborate? Here are the fastest ways to get in touch or
            explore my work.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Download Resume */}
          <div className="bg-bg-tertiary border border-border p-6 hover:border-accent-primary transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent-primary/10 rounded flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                <svg
                  className="w-4 h-4 text-accent-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-mono text-text-primary font-medium">
                  Resume
                </h3>
                <p className="text-text-tertiary text-sm">PDF • 2 pages</p>
              </div>
            </div>
            <Button
              href="/resume"
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left"
            >
              <span className="font-mono text-xs">./download_resume.sh</span>
            </Button>
          </div>

          {/* Email Contact */}
          <div className="bg-bg-tertiary border border-border p-6 hover:border-accent-primary transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent-primary/10 rounded flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                <svg
                  className="w-4 h-4 text-accent-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-mono text-text-primary font-medium">
                  Email
                </h3>
                <p className="text-text-tertiary text-sm">
                  hello@antoniopiattelli.com
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left cursor-pointer"
              onClick={handleEmailCopy}
            >
              <span className="font-mono text-xs">
                {copiedEmail ? '✓ copied!' : './copy_email.sh'}
              </span>
            </Button>
          </div>

          {/* GitHub Profile */}
          <div className="bg-bg-tertiary border border-border p-6 hover:border-accent-primary transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent-primary/10 rounded flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                <svg
                  className="w-4 h-4 text-accent-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-mono text-text-primary font-medium">
                  GitHub
                </h3>
                <p className="text-text-tertiary text-sm">@antoniowav</p>
              </div>
            </div>
            <Button
              href="https://github.com/antoniowav"
              external
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left"
            >
              <span className="font-mono text-xs">./open_github.sh</span>
            </Button>
          </div>

          {/* Schedule Meeting */}
          <div className="bg-bg-tertiary border border-border p-6 hover:border-accent-primary transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent-primary/10 rounded flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                <svg
                  className="w-4 h-4 text-accent-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-mono text-text-primary font-medium">
                  Meeting
                </h3>
                <p className="text-text-tertiary text-sm">
                  30 min • Video call
                </p>
              </div>
            </div>
            <Button
              href="/contact"
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left"
            >
              <span className="font-mono text-xs">./schedule_call.sh</span>
            </Button>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="bg-bg-primary border border-border rounded p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent-primary font-mono text-sm">$</span>
            <span className="text-text-primary font-mono text-sm">
              ./quick_actions.sh --status
            </span>
          </div>
          <div className="text-text-secondary font-mono text-sm space-y-1">
            <div>
              <span className="text-success">✓</span> Resume: Ready for download
            </div>
            <div>
              <span className="text-success">✓</span> Email: Available 24/7
            </div>
            <div>
              <span className="text-success">✓</span> GitHub: 50+ repositories
              public
            </div>
            <div>
              <span className="text-success">✓</span> Calendar: Open for new
              opportunities
            </div>
            <div className="pt-2">
              <span className="text-accent-primary">→</span>
              <span className="text-text-tertiary">
                {' '}
                Average response time: 2-4 hours
              </span>
            </div>
          </div>
        </div>

        {/* Additional CTAs */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/projects" variant="primary" size="md">
              Explore My Work
            </Button>
            <Button href="/blog" variant="secondary" size="md">
              Read My Articles
            </Button>
          </div>

          <div className="mt-6 text-text-tertiary text-sm font-mono">
            Or scroll down to see featured projects ↓
          </div>
        </div>
      </div>
    </section>
  )
}
