import { WatchItem } from '@/data/listen-watch'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '../lib/utils'

interface WatchCardProps {
  item: WatchItem
}

export function WatchCard({ item }: WatchCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'youtube':
        return '📺'
      case 'series':
        return '🎬'
      case 'movie':
        return '🎞️'
      default:
        return '🎥'
    }
  }

  const getActionText = (category: string) => {
    switch (category) {
      case 'youtube':
        return 'Watch Channel'
      case 'series':
      case 'movie':
        return 'Learn More'
      default:
        return 'Watch'
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-primary transition-all hover:border-accent-primary">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.imagePath}
          alt={item.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-lg" aria-hidden="true">
            {getCategoryIcon(item.category)}
          </span>
          <span className="text-xs uppercase tracking-wide font-semibold text-text-tertiary">
            {item.category}
          </span>
        </div>
        <h3 className="mb-1 font-medium text-text-primary">{item.title}</h3>
        <p className="text-sm text-text-secondary mb-1">By {item.creator}</p>
        <p className="mb-3 text-sm text-text-secondary">{item.description}</p>

        <div className="flex justify-between items-end">
          <div>
            <time dateTime={item.date} className="text-xs text-text-tertiary">
              {formatDate(item.date)}
            </time>
          </div>
          <div className="flex items-center gap-3">
            {item.featured && (
              <span className="inline-block text-xs font-semibold py-1 px-2 bg-accent-tertiary text-accent-primary rounded">
                Featured
              </span>
            )}
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:text-accent-secondary text-sm font-medium"
            >
              {getActionText(item.category)} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
