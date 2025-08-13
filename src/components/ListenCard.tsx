import { ListenItem } from '@/data/listen-watch'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '../lib/utils'

interface ListenCardProps {
  item: ListenItem
}

export function ListenCard({ item }: ListenCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'playlist':
        return '🎵'
      case 'podcast':
        return '🎙️'
      default:
        return '🔊'
    }
  }

  return (
    <div className="p-6 bg-bg-primary rounded-lg border border-border transition-all hover:border-accent-primary">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={item.imagePath}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 96px"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="mr-2 text-lg" aria-hidden="true">
              {getCategoryIcon(item.category)}
            </span>
            <span className="text-xs uppercase tracking-wide font-semibold text-text-tertiary">
              {item.category}
            </span>
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-1">{item.title}</h3>
          <p className="text-sm text-text-secondary mb-1">By {item.creator}</p>
          <p className="text-sm text-text-secondary mb-3">{item.description}</p>
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
                Listen →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
