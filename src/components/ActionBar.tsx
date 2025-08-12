'use client'

import { navigation } from '@/data'
import {
  getCurrentFont,
  toggleFont as toggleFontScript,
} from '@/scripts/fontToggle'
import type { FontFamily, Theme } from '@/types'
import Button from '@/ui/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface ActionBarProps {
  className?: string
}

export const ActionBar = ({ className = '' }: ActionBarProps) => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')
  const [fontFamily, setFontFamily] = useState<FontFamily>('mono')
  const [showGrid, setShowGrid] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const currentTheme =
      (document.documentElement.getAttribute('data-theme') as Theme) || 'dark'
    setTheme(currentTheme)
    setFontFamily(getCurrentFont())
    const hasGrid = document.documentElement.classList.contains('show-grid')
    setShowGrid(hasGrid)
    const handleFontChange = (e: CustomEvent) => {
      if (e.detail && e.detail.font) {
        setFontFamily(e.detail.font)
      }
    }
    window.addEventListener('fontChange', handleFontChange as EventListener)
    setMounted(true)
    document.documentElement.classList.remove('loading')
    return () => {
      window.removeEventListener(
        'fontChange',
        handleFontChange as EventListener
      )
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ['dark', 'light', 'amber', 'blue']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
  }, [theme])

  const toggleFont = useCallback(() => {
    const nextFont = toggleFontScript()
    setFontFamily(nextFont)
  }, [])

  const toggleGrid = useCallback(() => {
    const newGridState = !showGrid
    setShowGrid(newGridState)
    document.documentElement.classList.toggle('show-grid', newGridState)
    localStorage.setItem('gridOverlay', newGridState.toString())
  }, [showGrid])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.metaKey || e.ctrlKey
      if (isModifier && e.key === 't') {
        e.preventDefault()
        toggleTheme()
      } else if (isModifier && e.key === 'o') {
        e.preventDefault()
        toggleFont()
      } else if (isModifier && e.key === 'g') {
        e.preventDefault()
        toggleGrid()
      } else if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme, toggleFont, toggleGrid, isMobileMenuOpen])

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  if (!mounted) {
    return (
      <header
        className={`srcl-action-bar bg-bg-secondary border-b border-border sticky top-0 z-50 ${className}`}
        aria-hidden="true"
      >
        <div className="container">
          <div className="flex items-center justify-between h-14">
            <div className="opacity-0">~/piattelli</div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        className={`srcl-action-bar bg-bg-secondary border-b border-border sticky top-0 z-50 ${className}`}
      >
        <div className="container relative">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-text-primary hover:text-accent-primary font-mono font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-secondary"
              >
                ~/piattelli
              </Link>
            </div>

            <nav
              className="hidden md:flex items-center space-x-1"
              aria-label="Main navigation"
            >
              {navigation.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-mono border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-secondary ${
                    isActiveRoute(item.href)
                      ? 'text-accent-primary border-accent-primary bg-bg-tertiary'
                      : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label={`Switch theme (current: ${theme})`}
                title="Ctrl/Cmd + T"
                className="hidden sm:inline-flex cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                <span className="ml-1 text-xs">{theme}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFont}
                aria-label={`Switch font (current: ${fontFamily})`}
                title="Ctrl/Cmd + O"
                className="hidden sm:inline-flex cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
                <span className="ml-1 text-xs">{fontFamily}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleGrid}
                aria-label={`Toggle grid overlay (${showGrid ? 'on' : 'off'})`}
                title="Ctrl/Cmd + G"
                className="hidden sm:inline-flex cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                <span className="ml-1 text-xs">{showGrid ? 'on' : 'off'}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(v => !v)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
                className="md:hidden"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            </div>
          </div>

          <div
            id="mobile-nav"
            aria-hidden={!isMobileMenuOpen}
            className={`md:hidden absolute left-0 right-0 top-14 z-50 origin-top transform transition-all duration-200 ${
              isMobileMenuOpen
                ? 'opacity-100 scale-y-100 pointer-events-auto'
                : 'opacity-0 scale-y-0 pointer-events-none'
            }`}
          >
            <div className="border-t border-border bg-bg-tertiary">
              <nav className="py-4 space-y-2" aria-label="Mobile navigation">
                {navigation.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-tertiary ${
                      isActiveRoute(item.href)
                        ? 'text-accent-primary bg-bg-secondary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="px-4 pt-4 border-t border-border">
                  <div className="text-xs text-text-tertiary font-mono mb-2">
                    Settings
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleTheme}
                      className="text-xs"
                    >
                      Theme: {theme}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFont}
                      className="text-xs"
                    >
                      Font: {fontFamily}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleGrid}
                      className="text-xs"
                    >
                      Grid: {showGrid ? 'on' : 'off'}
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div
            className="h-full w-full opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(var(--color-accent-primary-rgb), 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(var(--color-accent-primary-rgb), 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />
        </div>
      )}
    </>
  )
}
