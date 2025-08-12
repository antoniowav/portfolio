'use client'

import { useEffect, useState } from 'react'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface AlertProps {
  type: AlertType
  title?: string
  message: string
  onClose?: () => void
  autoClose?: boolean
  autoCloseDelay?: number
  className?: string
}

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  className = '',
}: AlertProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDelay, onClose, visible])

  if (!visible) {
    return null
  }

  const handleClose = () => {
    setVisible(false)
    onClose?.()
  }

  // Styles based on type
  const colors = {
    success: {
      bg: 'bg-success bg-opacity-10',
      border: 'border-success',
      icon: 'text-success',
      title: 'text-success',
    },
    error: {
      bg: 'bg-error bg-opacity-10',
      border: 'border-error',
      icon: 'text-error',
      title: 'text-error',
    },
    warning: {
      bg: 'bg-warning bg-opacity-10',
      border: 'border-warning',
      icon: 'text-warning',
      title: 'text-warning',
    },
    info: {
      bg: 'bg-accent-primary bg-opacity-10',
      border: 'border-accent-primary',
      icon: 'text-accent-primary',
      title: 'text-accent-primary',
    },
  }

  const baseClasses = [
    'srcl-alert',
    'p-4',
    'border',
    'rounded',
    'flex',
    'items-start',
    'gap-3',
    'w-full',
    'font-mono',
    colors[type].bg,
    colors[type].border,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      role="alert"
      className={baseClasses}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <div className={`flex-shrink-0 ${colors[type].icon}`}>
        {type === 'success' && (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {type === 'error' && (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        {type === 'warning' && (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )}
        {type === 'info' && (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>

      <div className="flex-1">
        {title && (
          <h3 className={`text-sm font-semibold ${colors[type].title}`}>
            {title}
          </h3>
        )}
        <div className="text-sm text-text-primary">{message}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={handleClose}
          className="flex-shrink-0 text-text-tertiary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-current"
          aria-label="Close alert"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default Alert
