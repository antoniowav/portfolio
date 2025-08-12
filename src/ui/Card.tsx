'use client'

import type { CardProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { forwardRef } from 'react'

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      title,
      description,
      image,
      href,
      tags = [],
      footer,
      elevated = false,
      className = '',
      id,
      'data-testid': dataTestId,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'srcl-card',
      'bg-bg-secondary',
      'border',
      'border-border',
      'transition-all',
      'duration-150',
      'ease-out',
      'overflow-hidden',
      elevated && 'shadow-md',
      href && 'cursor-pointer',
      href && 'hover:border-text-secondary',
      href && 'hover:shadow-lg',
      href && 'focus-within:ring-2',
      href && 'focus-within:ring-accent-primary',
      href && 'focus-within:ring-offset-2',
      href && 'focus-within:ring-offset-bg-primary',
    ]

    const classes = [...baseClasses, className]
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

    const cardProps = {
      ref,
      className: classes,
      id,
      'data-testid': dataTestId,
      ...props,
    }

    const cardContent = (
      <>
        {image && (
          <div className="relative w-full h-48 bg-bg-tertiary">
            <Image
              src={image}
              alt={title || 'Card image'}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-4 flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
              {href ? (
                <span className="group-hover:text-accent-primary transition-colors duration-150">
                  {title}
                </span>
              ) : (
                title
              )}
            </h3>
          )}

          {description && (
            <p className="text-text-secondary text-sm mb-3 line-clamp-3">
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-mono bg-bg-tertiary border border-border text-text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {children && <div className="text-text-primary">{children}</div>}
        </div>

        {footer && (
          <div className="px-4 py-3 bg-bg-tertiary border-t border-border">
            {footer}
          </div>
        )}
      </>
    )

    if (href) {
      return (
        <article {...cardProps}>
          <Link
            href={href}
            className="group block h-full focus:outline-none"
            aria-label={title || 'Open'}
          >
            <div className="h-full flex flex-col">{cardContent}</div>
          </Link>
        </article>
      )
    }

    return (
      <div {...cardProps}>
        <div className="h-full flex flex-col">{cardContent}</div>
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card

interface ProjectCardProps {
  project: {
    title: string
    summary: string
    tech: string[]
    slug: string
    featured?: boolean
    dateStart: string
    images?: Array<{ src: string; alt: string }>
  }
  className?: string
}

export const ProjectCard = ({ project, className = '' }: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }

  return (
    <Card
      title={project.title}
      description={project.summary}
      image={project.images?.[0]?.src}
      href={`/projects/${project.slug}`}
      tags={project.tech.slice(0, 4)}
      className={`${project.featured ? 'ring-1 ring-accent-primary' : ''} ${className}`}
      footer={
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <span className="font-mono">{formatDate(project.dateStart)}</span>
          {project.featured && (
            <span className="text-accent-primary font-mono">★ Featured</span>
          )}
        </div>
      }
    />
  )
}

interface BlogCardProps {
  post: {
    title: string
    excerpt: string
    slug: string
    date: string
    tags: string[]
    readTime: number
    featured?: boolean
  }
  className?: string
}

export const BlogCard = ({ post, className = '' }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Card
      title={post.title}
      description={post.excerpt}
      href={`/blog/${post.slug}`}
      tags={post.tags.slice(0, 3)}
      className={`${post.featured ? 'ring-1 ring-accent-primary' : ''} ${className}`}
      footer={
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <span className="font-mono">{formatDate(post.date)}</span>
          <span className="font-mono">{post.readTime} min read</span>
        </div>
      }
    />
  )
}

interface EmptyCardProps {
  title?: string
  description?: string
  action?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export const EmptyCard = ({
  title = 'No items found',
  description = 'There are no items to display at the moment.',
  action,
  icon,
  className = '',
}: EmptyCardProps) => {
  return (
    <Card className={`text-center py-8 ${className}`}>
      {icon && (
        <div className="flex justify-center mb-4 text-text-tertiary">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-secondary mb-2">
        {title}
      </h3>
      <p className="text-text-tertiary text-sm mb-4">{description}</p>
      {action && action}
    </Card>
  )
}

export const CardSkeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`srcl-card bg-bg-secondary border border-border animate-pulse ${className}`}
    >
      <div className="h-48 bg-bg-tertiary" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-bg-tertiary rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-bg-tertiary rounded w-full" />
          <div className="h-3 bg-bg-tertiary rounded w-2/3" />
        </div>
        <div className="flex space-x-2">
          <div className="h-5 bg-bg-tertiary rounded w-16" />
          <div className="h-5 bg-bg-tertiary rounded w-20" />
          <div className="h-5 bg-bg-tertiary rounded w-12" />
        </div>
      </div>
    </div>
  )
}
