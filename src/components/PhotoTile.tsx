import type { Photo } from '@/data/listen-watch'
import { formatDate } from '@/lib/utils'

function hashToIndex(s: string, mod: number) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h) % mod
}

export function PhotoTile({ photo }: { photo: Photo }) {
  const variants = [
    'rotate-[.5deg] -translate-y-1',
    '-rotate-[.5deg] translate-y-1',
    'rotate-[.25deg]',
    '-rotate-[.25deg]',
    'translate-y-1',
    '-translate-y-1',
    '',
  ]
  const shadows = ['shadow-sm', 'shadow', 'shadow-md']
  const idx = hashToIndex(photo.id, variants.length)
  const sIdx = hashToIndex(photo.id + 's', shadows.length)

  return (
    <figure className={`overflow-hidden rounded-lg border border-border bg-bg-primary ${shadows[sIdx]} transition-all hover:border-accent-primary`}>
      <div className={`${variants[idx]} transition-transform`}>
        <img
          src={photo.imagePath}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          className="w-full h-auto block"
        />
      </div>
      <figcaption className="p-3">
        <div className="mb-1 font-medium text-text-primary">{photo.title}</div>
        {photo.description && <div className="mb-2 text-sm text-text-secondary">{photo.description}</div>}
        <div className="flex items-end justify-between">
          <div className="text-xs text-text-tertiary">
            <time dateTime={photo.date}>{formatDate(photo.date)}</time>
            {photo.location && <span className="ml-2">• {photo.location}</span>}
          </div>
          {photo.featured && (
            <span className="inline-block text-[10px] font-semibold py-1 px-2 bg-accent-tertiary text-accent-primary rounded">
              Featured
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
