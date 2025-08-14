import type { Photo } from '@/data/listen-watch'
import { headers } from 'next/headers'
import { PhotoTile } from './PhotoTile'

export default async function DriveMasonry({ limit = 24 }: { limit?: number }) {
  const h = headers()
  const proto = h.get('x-forwarded-proto') ?? 'http'
  const host = h.get('x-forwarded-host') ?? h.get('host')!
  const url = `${proto}://${host}/api/drive?limit=${limit}`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  const photos = (await res.json()) as Photo[]
  if (!photos.length) return null

  return (
    <div className="masonry">
      {photos.map(p => (
        <div key={p.id} className="masonry-item">
          <PhotoTile photo={p} />
        </div>
      ))}
    </div>
  )
}
