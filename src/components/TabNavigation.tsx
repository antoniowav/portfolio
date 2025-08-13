'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabNavigationProps {
  tabs: Tab[]
  paramName?: string
  defaultTab?: string
  className?: string
}

export function TabNavigation({
  tabs,
  paramName = 'tab',
  defaultTab,
  className = '',
}: TabNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get the current active tab from URL or use default
  const activeTab = searchParams.get(paramName) || defaultTab || tabs[0].id

  // Create a new URLSearchParams and set the tab
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className={`border-b border-border ${className}`}>
      <nav className="flex overflow-x-auto -mb-px" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              router.push(`${pathname}?${createQueryString(paramName, tab.id)}`, { scroll: false })
            }}
            className={`
              inline-flex items-center px-4 py-2 border-b-2 font-medium text-sm
              whitespace-nowrap transition-colors font-mono
              ${
                activeTab === tab.id
                  ? 'border-accent-primary text-accent-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-accent-tertiary text-accent-primary'
                    : 'bg-bg-tertiary text-text-tertiary'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
