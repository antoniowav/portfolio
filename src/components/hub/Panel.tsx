'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type PanelProps = {
  id: string
  children: ReactNode
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  /** reveal as soon as mounted (use for the first/hero panel, already in view) */
  immediate?: boolean
}

export function Panel({
  id,
  children,
  className = '',
  immediate = false,
  ...aria
}: PanelProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(immediate)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // mark JS active → arms the hidden start (no-JS keeps content visible)
    el.classList.add('panel-js')
    if (immediate) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [immediate])

  return (
    <section
      ref={ref}
      id={id}
      className={`panel ${shown ? 'is-in' : ''} ${className}`.trim()}
      {...aria}
    >
      {children}
    </section>
  )
}
