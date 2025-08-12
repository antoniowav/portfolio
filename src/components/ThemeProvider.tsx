'use client'

import type { Theme } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'

// Define theme context interface
interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void // eslint-disable-line no-unused-vars
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'theme',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Get theme from localStorage or system preference
    const storedTheme = localStorage.getItem(storageKey) as Theme
    if (
      storedTheme &&
      ['dark', 'light', 'amber', 'blue'].includes(storedTheme)
    ) {
      setTheme(storedTheme)
      applyTheme(storedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      setTheme(systemTheme)
      applyTheme(systemTheme)
      localStorage.setItem(storageKey, systemTheme)
    }
  }, [storageKey])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    root.setAttribute('data-theme', newTheme)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      const colors = {
        dark: '#0a0a0a',
        light: '#ffffff',
        amber: '#0a0a0a',
        blue: '#0a0a0a',
      }
      metaThemeColor.setAttribute('content', colors[newTheme])
    }
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem(storageKey, newTheme)
  }

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'amber', 'blue']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    handleSetTheme(nextTheme)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  const value: ThemeContextType = {
    theme,
    setTheme: handleSetTheme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
