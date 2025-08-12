'use client'

import type { ButtonProps } from '@/types'
import Link from 'next/link'
import { forwardRef } from 'react'

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      type = 'button',
      onClick,
      href,
      external = false,
      className = '',
      id,
      'data-testid': dataTestId,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'srcl-button',
      'inline-flex',
      'items-center',
      'justify-center',
      'font-mono',
      'font-medium',
      'border',
      'border-solid',
      'transition-all',
      'duration-150',
      'ease-out',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-offset-transparent',
      'focus:ring-current',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'disabled:pointer-events-none',
    ]

    // Variant styles
    const variantClasses = {
      primary: [
        'bg-transparent',
        'text-accent-primary',
        'border-accent-primary',
        'hover:bg-accent-primary',
        'hover:text-bg-primary',
        'focus:ring-accent-primary',
      ],
      secondary: [
        'bg-transparent',
        'text-text-primary',
        'border-border',
        'hover:bg-bg-secondary',
        'hover:border-text-secondary',
        'focus:ring-text-primary',
      ],
      ghost: [
        'bg-transparent',
        'text-text-secondary',
        'border-transparent',
        'hover:text-text-primary',
        'hover:border-border',
        'focus:ring-text-primary',
      ],
      danger: [
        'bg-transparent',
        'text-error',
        'border-error',
        'hover:bg-error',
        'hover:text-bg-primary',
        'focus:ring-error',
      ],
    }

    // Size styles
    const sizeClasses = {
      sm: ['px-3', 'py-1', 'text-sm', 'min-h-[2rem]'],
      md: ['px-4', 'py-2', 'text-base', 'min-h-[2.5rem]'],
      lg: ['px-6', 'py-3', 'text-lg', 'min-h-[3rem]'],
    }

    const classes = [
      ...baseClasses,
      ...variantClasses[variant],
      ...sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

    const buttonProps = {
      className: classes,
      disabled: disabled || loading,
      id,
      'data-testid': dataTestId,
      'aria-disabled': disabled || loading,
      ...props,
    }

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
        {href && external && (
          <svg
            className="ml-2 -mr-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </>
    )

    // Render as link if href is provided
    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...buttonProps}
          >
            {content}
          </a>
        )
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          {...buttonProps}
        >
          {content}
        </Link>
      )
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        {...buttonProps}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

// Button Group Component
interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export const ButtonGroup = ({
  children,
  className = '',
  orientation = 'horizontal',
}: ButtonGroupProps) => {
  const groupClasses = [
    'srcl-button-group',
    'inline-flex',
    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
    '[&>*]:rounded-none',
    '[&>*:first-child]:rounded-l',
    '[&>*:last-child]:rounded-r',
    orientation === 'vertical' && '[&>*:first-child]:rounded-t',
    orientation === 'vertical' && '[&>*:last-child]:rounded-b',
    orientation === 'vertical' && '[&>*:first-child]:rounded-l-none',
    orientation === 'vertical' && '[&>*:last-child]:rounded-l-none',
    '[&>*:not(:first-child)]:border-l-0',
    orientation === 'vertical' && '[&>*:not(:first-child)]:border-t-0',
    orientation === 'vertical' && '[&>*:not(:first-child)]:border-l',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={groupClasses}>{children}</div>
}
