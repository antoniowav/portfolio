import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quotes & Photos - Antonio Piattelli',
  description:
    'A collection of inspirational quotes and personal photography that I enjoy sharing.',
  openGraph: {
    title: 'Antonio Piattelli - Quotes & Photos',
    description:
      'A collection of inspirational quotes and personal photography that I enjoy sharing.',
    images: [
      {
        url: '/images/quotes-photos-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Quotes & Photos - Antonio Piattelli',
      },
    ],
  },
}

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return children
}
