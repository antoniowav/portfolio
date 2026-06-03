'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'top', label: 'Hub', index: '01' },
  { id: 'now', label: 'Now', index: '02' },
  { id: 'products', label: 'Building', index: '03' },
  { id: 'templates', label: 'Templates', index: '04' },
  { id: 'studio', label: 'Studio', index: '05' },
  { id: 'follow', label: 'Connect', index: '06' },
] as const

export function SectionNav() {
  const [active, setActive] = useState<string>('top')

  // Active section via IntersectionObserver: the section crossing the viewport
  // centre is the active one. Robust regardless of the scroll container.
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function go(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    // `scroll-snap-type: y mandatory` on <html> fights programmatic smooth
    // scrolling, so disable snapping for the duration of the jump.
    const root = document.documentElement
    const prev = root.style.scrollSnapType
    root.style.scrollSnapType = 'none'
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
    window.setTimeout(() => {
      root.style.scrollSnapType = prev
    }, 700)
  }

  return (
    <nav
      aria-label="Sections"
      className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-1 md:flex md:right-5"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => go(s.id)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`Go to ${s.label}`}
            className="group flex items-center justify-end gap-3 py-2 pl-6"
          >
            <span
              className={`micro hidden transition-opacity duration-300 group-hover:opacity-100 lg:inline ${
                isActive ? 'text-ink opacity-100' : 'text-ink-3 opacity-0'
              }`}
            >
              {s.label}
            </span>
            <span className={`micro tabular-nums ${isActive ? 'text-ink' : 'text-ink-3'}`}>
              {s.index}
            </span>
            <span
              aria-hidden="true"
              className={`h-[2px] transition-all duration-300 group-hover:bg-accent ${
                isActive ? 'w-9 bg-accent' : 'w-4 bg-line-strong'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
