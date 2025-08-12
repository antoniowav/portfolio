'use client'

import { useEffect, useState } from 'react'

interface SkipToContentProps {
  href?: string
  className?: string
  children?: React.ReactNode
}

export const SkipToContent = ({
  href = '#main-content',
  className = '',
  children = 'Skip to main content',
}: SkipToContentProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleFocus = () => setIsVisible(true)
    const handleBlur = () => setIsVisible(false)

    // Find the skip link element and attach event listeners
    const skipLink = document.querySelector('[data-skip-link]')
    if (skipLink) {
      skipLink.addEventListener('focus', handleFocus)
      skipLink.addEventListener('blur', handleBlur)

      return () => {
        skipLink.removeEventListener('focus', handleFocus)
        skipLink.removeEventListener('blur', handleBlur)
      }
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      ;(target as HTMLElement).focus()
      // Smooth scroll to target
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <a
      data-skip-link
      href={href}
      onClick={handleClick}
      className={`
        fixed top-4 left-4 z-[9999] px-4 py-2
        bg-bg-primary text-text-primary
        border-2 border-accent-primary
        font-mono text-sm font-medium
        transform transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${className}
      `}
      tabIndex={0}
    >
      {children}
    </a>
  )
}
