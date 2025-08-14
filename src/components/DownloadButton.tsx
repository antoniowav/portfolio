import { ReactNode } from 'react'

interface DownloadButtonProps {
  filePath: string
  fileName?: string
  className?: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function DownloadButton({
  filePath,
  fileName,
  className = '',
  children,
  variant = 'primary',
  size = 'md',
}: DownloadButtonProps) {
  // Derive display file name from path if not provided
  const displayFileName = fileName || filePath.split('/').pop() || 'file'

  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors border border-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-primary disabled:opacity-50'
  // Variant styles
  const variantClasses = {
    primary: 'bg-accent-primary text-white hover:bg-accent-secondary',
    secondary: 'bg-bg-tertiary text-text-primary hover:bg-bg-quaternary',
    outline: 'border border-border bg-transparent hover:bg-bg-tertiary text-text-primary',
    ghost: 'bg-transparent text-text-secondary border-transparent hover:text-text-primary hover:border-border focus-visible:ring-text-primary',  }

  // Size styles
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  }

  return (
    <a
      href={filePath}
      download={displayFileName}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
