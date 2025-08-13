import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listen, Watch & Photos - Antonio Piattelli',
  description:
    'A collection of my favorite playlists, podcasts, YouTube channels, series/movies, and photos that I recommend.',
  openGraph: {
    title: 'Listen, Watch & Photos - Antonio Piattelli',
    description:
      'A collection of my favorite playlists, podcasts, YouTube channels, series/movies, and photos that I recommend.',
    images: [
      {
        url: '/images/listen-watch-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Listen, Watch & Photos - Antonio Piattelli',
      },
    ],
  },
}

interface ListenWatchLayoutProps {
  children: React.ReactNode
}

export default function ListenWatchLayout({ children }: ListenWatchLayoutProps) {
  return children
}
