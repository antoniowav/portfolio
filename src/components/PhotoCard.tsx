import { Photo } from '@/data/listen-watch'
import Image from 'next/image'
import { formatDate } from '../lib/utils'

interface PhotoCardProps {
  photo: Photo
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-primary transition-all hover:border-accent-primary">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={photo.imagePath}
          alt={photo.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-medium text-text-primary">{photo.title}</h3>
        <p className="mb-3 text-sm text-text-secondary">{photo.description}</p>

        <div className="flex justify-between items-end">
          <div>
            {photo.location && (
              <span className="text-xs text-text-tertiary block mb-1">
                📍 {photo.location}
              </span>
            )}
            <time
              dateTime={photo.date}
              className="text-xs text-text-tertiary"
            >
              {formatDate(photo.date)}
            </time>
          </div>
          {photo.featured && (
            <span className="inline-block text-xs font-semibold py-1 px-2 bg-accent-tertiary text-accent-primary rounded">
              Featured
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
