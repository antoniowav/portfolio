'use client'

import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  containerClassName?: string
  contentClassName?: string
}

/**
 * A consistent page layout component to be used across all pages
 * Ensures consistent padding, width, and structure
 */
export function PageLayout({
  children,
  title,
  description,
  maxWidth = '2xl',
  containerClassName = '',
  contentClassName = '',
}: PageLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  }

  const widthClass = maxWidthClasses[maxWidth]

  return (
    <section
      className={`container mx-auto px-4 py-8 ${containerClassName}`}
      style={{
        minHeight: 'calc(100vh - 16rem)',
        paddingBottom: '5rem',
        // Force a scrollbar to prevent layout shifts
        overflow: 'auto'
      }}
    >
      <div className={`${widthClass} mx-auto ${contentClassName}`}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-4">{title}</h1>

          {description && (
            <p className="text-text-secondary">{description}</p>
          )}
        </div>

        {children}
      </div>
    </section>
  )
}
