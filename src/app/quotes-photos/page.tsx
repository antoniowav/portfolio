'use client'

import { ListenCard } from '@/components/ListenCard'
import { PageLayout } from '@/components/PageLayout'
import { TabNavigation } from '@/components/TabNavigation'
import { WatchCard } from '@/components/WatchCard'
import { listenItems, watchItems } from '@/data/listen-watch'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function ListenAndWatchPage() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'listen'

  // Memoize the tabs with counts to avoid recalculation on each render
  const tabs = useMemo(
    () => [
      { id: 'listen', label: 'Listen', count: listenItems.length },
      { id: 'watch', label: 'Watch', count: watchItems.length },
    ],
    []
  )

  // Sort items by date (newest first)
  const sortedListenItems = useMemo(
    () => [...listenItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  )

  const sortedWatchItems = useMemo(
    () => [...watchItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  )

  return (
    <PageLayout
      title="Listen & Watch"
      description="A collection of my favorite playlists, podcasts, YouTube channels, and series/movies that I recommend. Check back regularly for new additions!"
      maxWidth="2xl"
    >
      <div className="bg-bg-secondary border border-border p-4 rounded mb-8">
        <TabNavigation tabs={tabs} paramName="tab" defaultTab="listen" />

        <div className="mt-6">
          {activeTab === 'listen' ? (
            <div className="space-y-6">
              {sortedListenItems.map((item) => (
                <ListenCard key={item.id} item={item} />
              ))}
              {/* Add empty space to ensure consistent height */}
              <div className="h-24"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedWatchItems.map((item) => (
                <WatchCard key={item.id} item={item} />
              ))}
              {/* Add empty space to ensure consistent height */}
              <div className="h-24 col-span-full"></div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
