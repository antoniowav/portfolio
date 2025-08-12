'use client'

import { forwardRef, useState } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  fullWidth?: boolean
  hideLabel?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = 'text',
      fullWidth = false,
      hideLabel = false,
      className = '',
      startIcon,
      endIcon,
      id,
      required,
      placeholder,
      ...props
    },
    ref
  ) => {
    // State hooks are kept for event handlers that may need them in the future
    const [, setFocused] = useState(false)
    const uniqueId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`

    // Base classes
    const wrapperClasses = [
      'srcl-input-wrapper',
      'relative',
      'inline-block',
      fullWidth && 'w-full',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const inputClasses = [
      'srcl-input',
      'block',
      'w-full',
      'px-6',
      'py-2',
      'font-mono',
      'text-text-primary',
      'bg-bg-primary',
      'border',
      'border-border',
      'rounded',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-offset-transparent',
      'focus:ring-accent-primary',
      'transition-all',
      'duration-150',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      error && 'border-error focus:ring-error',
      startIcon && 'pl-10',
      endIcon && 'pr-10',
    ]
      .filter(Boolean)
      .join(' ')

    const labelClasses = [
      'srcl-input-label',
      'block',
      'mb-1',
      'text-sm',
      'font-mono',
      'text-text-secondary',
      hideLabel && 'sr-only',
    ]
      .filter(Boolean)
      .join(' ')

    const errorClasses = [
      'srcl-input-error',
      'text-sm',
      'text-error',
      'font-mono',
      'mt-1',
    ].join(' ')

    const iconClasses = [
      'absolute',
      'top-1/2',
      'transform',
      '-translate-y-1/2',
      'text-text-tertiary',
      'pointer-events-none',
    ].join(' ')

    return (
      <div className={wrapperClasses}>
        <label htmlFor={uniqueId} className={labelClasses}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>

        <div className="relative items-center flex flex-row">
          {startIcon && (
            <div className={`${iconClasses} left-3 ml-1`}>{startIcon}</div>
          )}

          <input
            ref={ref}
            id={uniqueId}
            type={type}
            className={inputClasses}
            placeholder={placeholder || label}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${uniqueId}-error` : undefined}
            onFocus={e => {
              setFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={e => {
              setFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />

          {endIcon && <div className={`${iconClasses} right-3`}>{endIcon}</div>}
        </div>

        {error && (
          <div id={`${uniqueId}-error`} className={errorClasses}>
            {error}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  fullWidth?: boolean
  hideLabel?: boolean
  rows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      hideLabel = false,
      className = '',
      id,
      required,
      placeholder,
      rows = 4,
      ...props
    },
    ref
  ) => {
    // State hooks are kept for event handlers that may need them in the future
    const [, setFocused] = useState(false)
    const uniqueId =
      id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`

    // Base classes
    const wrapperClasses = [
      'srcl-textarea-wrapper',
      'relative',
      'inline-block',
      fullWidth && 'w-full',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const textareaClasses = [
      'srcl-textarea',
      'block',
      'w-full',
      'px-4',
      'py-2',
      'font-mono',
      'text-text-primary',
      'bg-bg-primary',
      'border',
      'border-border',
      'rounded',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-offset-transparent',
      'focus:ring-accent-primary',
      'transition-all',
      'duration-150',
      'resize-y',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      error && 'border-error focus:ring-error',
    ]
      .filter(Boolean)
      .join(' ')

    const labelClasses = [
      'srcl-textarea-label',
      'block',
      'mb-1',
      'text-sm',
      'font-mono',
      'text-text-secondary',
      hideLabel && 'sr-only',
    ]
      .filter(Boolean)
      .join(' ')

    const errorClasses = [
      'srcl-textarea-error',
      'text-sm',
      'text-error',
      'font-mono',
      'mt-1',
    ].join(' ')

    return (
      <div className={wrapperClasses}>
        <label htmlFor={uniqueId} className={labelClasses}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>

        <div className="relative">
          <textarea
            ref={ref}
            id={uniqueId}
            className={textareaClasses}
            placeholder={placeholder || label}
            required={required}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={error ? `${uniqueId}-error` : undefined}
            onFocus={e => {
              setFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={e => {
              setFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
        </div>

        {error && (
          <div id={`${uniqueId}-error`} className={errorClasses}>
            {error}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
  description?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, error, className = '', description, id, required, ...props },
    ref
  ) => {
    const uniqueId =
      id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`

    // Base classes
    const wrapperClasses = [
      'srcl-checkbox-wrapper',
      'relative',
      'inline-flex',
      'items-start',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const checkboxClasses = [
      'srcl-checkbox',
      'h-5',
      'w-5',
      'mt-0.5',
      'border',
      'border-border',
      'rounded',
      'text-accent-primary',
      'bg-bg-primary',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-offset-transparent',
      'focus:ring-accent-primary',
      'transition-all',
      'duration-150',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      error && 'border-error focus:ring-error',
    ]
      .filter(Boolean)
      .join(' ')

    const labelClasses = [
      'srcl-checkbox-label',
      'text-sm',
      'font-mono',
      'text-text-primary',
      'ml-2',
    ].join(' ')

    const descriptionClasses = [
      'srcl-checkbox-description',
      'text-xs',
      'font-mono',
      'text-text-tertiary',
      'ml-7',
      'mt-1',
    ].join(' ')

    const errorClasses = [
      'srcl-checkbox-error',
      'text-sm',
      'text-error',
      'font-mono',
      'ml-7',
      'mt-1',
    ].join(' ')

    return (
      <div className={wrapperClasses}>
        <input
          ref={ref}
          id={uniqueId}
          type="checkbox"
          className={checkboxClasses}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${uniqueId}-error`
              : description
                ? `${uniqueId}-description`
                : undefined
          }
          {...props}
        />
        <div>
          <label htmlFor={uniqueId} className={labelClasses}>
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>

          {description && (
            <div id={`${uniqueId}-description`} className={descriptionClasses}>
              {description}
            </div>
          )}

          {error && (
            <div id={`${uniqueId}-error`} className={errorClasses}>
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
