import { ActionBar } from '@/components/ActionBar'
import { SkipToContent } from '@/components/SkipToContent'
import { ThemeProvider } from '@/components/ThemeProvider'
import '@/styles/font-overrides.css'
import '@/styles/globals.scss'
import '@/styles/loading.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Antonio Piattelli',
    default: 'Antonio Piattelli - Full-Stack Developer',
  },
  description:
    'Full-stack developer passionate about creating elegant solutions to complex problems. Experienced in React, TypeScript, Go, and modern web technologies.',
  keywords: [
    'Antonio Piattelli',
    'Full-Stack Developer',
    'React',
    'TypeScript',
    'Go',
    'Web Development',
  ],
  authors: [{ name: 'Antonio Piattelli', url: 'https://piattelli.dev' }],
  creator: 'Antonio Piattelli',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://piattelli.dev',
    title: 'Antonio Piattelli - Full-Stack Developer',
    description:
      'Full-stack developer passionate about creating elegant solutions to complex problems.',
    siteName: 'Antonio Piattelli Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Antonio Piattelli - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonio Piattelli - Full-Stack Developer',
    description:
      'Full-stack developer passionate about creating elegant solutions to complex problems.',
    creator: '@okbye_toni',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://antoniopiattelli.com'),
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" data-font="mono">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('loading');
                  const savedTheme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', savedTheme);
                  const savedFont = localStorage.getItem('fontFamily') || 'mono';
                  document.documentElement.setAttribute('data-font', savedFont);
                  if(localStorage.getItem('gridOverlay') === 'true') {
                    document.documentElement.classList.add('show-grid');
                  }
                  document.documentElement.className = document.documentElement.className;
                  setTimeout(function() {
                    document.documentElement.classList.remove('loading');
                  }, 0);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.setAttribute('data-font', 'mono');
                  document.documentElement.classList.remove('loading');
                }
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.loading .srcl-action-bar { visibility: hidden; }
              html:not(.loading) .srcl-action-bar { animation: fadeIn 0.2s ease-in; }
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              html { overflow-y: scroll; }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark">
          <SkipToContent />
          <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col srcl-main-content">
            <ActionBar />
            <main id="main-content" className="flex-1 min-h-[calc(100vh-12rem)]" style={{ paddingBottom: '2rem' }}>
              {children}
            </main>
            <footer className="border-t border-border bg-bg-secondary">
              <div className="container py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-text-tertiary font-mono">
                    © {new Date().getFullYear()} Antonio Piattelli. All rights reserved.
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-tertiary">
                    <a
                      href="/rss.xml"
                      className="hover:text-text-primary transition-colors"
                      aria-label="RSS Feed"
                    >
                      RSS
                    </a>
                    <a
                      href="/sitemap.xml"
                      className="hover:text-text-primary transition-colors"
                      aria-label="Sitemap"
                    >
                      Sitemap
                    </a>
                    <span className="text-accent-primary font-mono">
                      Built with ❤️ and Zed
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
