import DriveMasonry from '@/components/DriveMasonry'
import { ListenCard } from '@/components/ListenCard'
import { PageLayout } from '@/components/PageLayout'
import { TabNavigation } from '@/components/TabNavigation'
import { WatchCard } from '@/components/WatchCard'
import { listenItems, watchItems } from '@/data/listen-watch'

export default function ListenAndWatchPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {

  const activeTab = (searchParams?.tab as string) || 'listen'



  const tabs = [
    { id: 'listen', label: 'Listen', count: listenItems.length },
    { id: 'watch', label: 'Watch', count: watchItems.length },
    { id: 'photos', label: 'Photos', count: 19},
  ]

  const sortedListenItems = [...listenItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const sortedWatchItems = [...watchItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <PageLayout
      title="Listen, Watch & Photos"
      description="A collection of my favorite playlists, podcasts, YouTube channels, series/movies, and photos that I recommend. Check back regularly for new additions!"
      maxWidth="full"
    >
      <div className="bg-bg-secondary border border-border p-4 rounded mb-8">
        <TabNavigation tabs={tabs} paramName="tab" defaultTab="listen" />

        <div className="mt-6">
          {activeTab === 'listen' && (
            <div className="space-y-6">
              {sortedListenItems.map(item => (
                <ListenCard key={item.id} item={item} />
              ))}
              <div className="h-24" />
            </div>
          )}

          {activeTab === 'watch' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedWatchItems.map(item => (
                <WatchCard key={item.id} item={item} />
              ))}
              <div className="h-24 col-span-full" />
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="mt-2">
              <DriveMasonry limit={24} />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
