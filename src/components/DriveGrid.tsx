import { PhotoCard } from '@/components/PhotoCard'
import type { Photo } from '@/data/listen-watch'
import { headers } from 'next/headers'

export default async function DriveGrid({ limit = 12 }: { limit?: number }) {
  const h = headers()
  const proto = h.get('x-forwarded-proto') ?? 'http'
  const host = h.get('x-forwarded-host') ?? h.get('host')!
  const url = `${proto}://${host}/api/drive?limit=${limit}`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  const photos = (await res.json()) as (Photo & { meta?: { w: number | null; h: number | null } })[]
  if (!photos.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map(p => (
        <PhotoCard key={p.id} photo={p as any} />
      ))}
    </div>
  )
}
