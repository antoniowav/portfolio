'use client'

import { author } from '@/data'
import Button from '@/ui/Button'
import { useEffect, useRef, useState } from 'react'
import { TypingAnimation } from './TypingAnimation'

export const HeroSection = () => {
  const [typingComplete, setTypingComplete] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const draggingRef = useRef(false)
  const startRef = useRef({ x: 0, y: 0 })
  const lastRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) {
        return
      }
      const dx = e.clientX - startRef.current.x
      const dy = e.clientY - startRef.current.y
      setPos({ x: lastRef.current.x + dx, y: lastRef.current.y + dy })
    }
    const onUp = () => {
      if (!draggingRef.current) {
        return
      }
      draggingRef.current = false
      setIsDragging(false)
      lastRef.current = { x: pos.x, y: pos.y }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [pos])

  useEffect(() => {
    if (!isDragging) {
      return
    }
    const prevCursor = document.body.style.cursor
    const prevSelect = document.body.style.userSelect
    document.body.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'
    return () => {
      document.body.style.cursor = prevCursor
      document.body.style.userSelect = prevSelect
    }
  }, [isDragging])

  return (
    <section className="relative min-h-[96vh] flex items-center justify-center bg-bg-primary">
      {/* Optional scanline effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              var(--color-accent-primary) 2px,
              var(--color-accent-primary) 4px
            )`,
          }}
        />
      </div>

      <div className="container relative z-10 flex flex-col items-start justify-start">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-start justify-start">
          {/* Terminal Window Header */}
          <div
            className="inline-block bg-bg-secondary border border-border rounded-t-lg mb-0 overflow-hidden"
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {' '}
            <div
              className={
                'flex items-center justify-between px-4 py-2 bg-bg-tertiary border-b border-border select-none touch-none'
              }
              onPointerDown={e => {
                e.preventDefault()
                draggingRef.current = true
                setIsDragging(true)
                startRef.current = { x: e.clientX, y: e.clientY }
                lastRef.current = { x: pos.x, y: pos.y }
              }}
            >
              {' '}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
              <div className="text-text-tertiary text-sm font-mono">
                terminal — 120×40
              </div>
              <div className="w-12"></div>
            </div>
            {/* Terminal Content */}
            <div className="px-6 py-8 text-left min-h-[200px]">
              <div className="mb-4">
                <span className="text-accent-primary font-mono">$ </span>
                <TypingAnimation
                  text="whoami"
                  speed={80}
                  delay={500}
                  onComplete={() =>
                    setTimeout(() => setTypingComplete(true), 300)
                  }
                  className="text-text-primary"
                />
              </div>

              {typingComplete && (
                <div className="space-y-2 animate-fade-in">
                  <div className="text-text-primary font-mono text-lg">
                    {author.name}
                  </div>
                  <div className="text-accent-primary font-mono text-lg">
                    Full-Stack Developer
                  </div>
                  <div className="text-text-secondary font-mono">
                    Passionate about creating elegant solutions
                  </div>
                  <div className="text-text-secondary font-mono">
                    to complex problems.
                  </div>

                  {/* Current status line */}
                  <div className="pt-4 text-text-tertiary font-mono text-sm">
                    <span className="text-success">●</span> Available for new
                    opportunities
                  </div>

                  {/* Blinking cursor */}
                  <div className="pt-2">
                    <span className="text-accent-primary font-mono">$ </span>
                    <span className="animate-blink text-accent-primary font-mono">
                      |
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {typingComplete && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button
                href="/projects"
                variant="primary"
                size="lg"
                className="min-w-[200px] cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                View Projects
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="min-w-[200px] cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Get In Touch
              </Button>
            </div>
          )}

          {/* Quick stats */}
          {typingComplete && (
            <div
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="text-center p-4 bg-bg-secondary border border-border">
                <div className="text-2xl font-mono text-accent-primary mb-1">
                  3+
                </div>
                <div className="text-sm text-text-tertiary font-mono">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-4 bg-bg-secondary border border-border">
                <div className="text-2xl font-mono text-accent-primary mb-1">
                  10+
                </div>
                <div className="text-sm text-text-tertiary font-mono">
                  Projects Built
                </div>
              </div>
              <div className="text-center p-4 bg-bg-secondary border border-border">
                <div className="text-2xl font-mono text-accent-primary mb-1">
                  8+
                </div>
                <div className="text-sm text-text-tertiary font-mono">
                  Technologies
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {typingComplete && author.social && (
            <div
              className="mt-8 flex justify-center space-x-6 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              {author.social.map(social => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-accent-primary transition-colors duration-200 p-2"
                  aria-label={`Visit ${social.platform} profile`}
                >
                  <span className="sr-only">{social.platform}</span>
                  {social.platform === 'GitHub' && (
                    <svg
                      className="w-6 h-6"
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
                  )}
                  {social.platform === 'LinkedIn' && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social.platform === 'Instagram' && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      {typingComplete && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="flex flex-col items-center text-text-tertiary">
            <span className="text-xs font-mono mb-2">Scroll down</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}
