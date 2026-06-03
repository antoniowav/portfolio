import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Spline_Sans_Mono } from 'next/font/google'

// Swiss: one neutral grotesque carries display + body.
const grotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const SITE_URL = 'https://antoniopiattelli.com'
const TITLE = 'Antonio — Solo product builder in Gothenburg'
const DESCRIPTION =
  'I build products. Solo. From Gothenburg. The hub for everything I am shipping: Kontra, Everly, and the Coda product studio.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Antonio Piattelli',
    'solo product builder',
    'Gothenburg',
    'Kontra',
    'product studio',
    'Coda',
    'Notion templates',
    'indie hacker',
  ],
  authors: [{ name: 'Antonio Piattelli', url: SITE_URL }],
  creator: 'Antonio Piattelli',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Antonio',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og.png', // TODO: add a 1200x630 OG image (this link gets posted a lot)
        width: 1200,
        height: 630,
        alt: 'Antonio — solo product builder in Gothenburg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@okbye_toni',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#fafaf8',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-ink"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  )
}
