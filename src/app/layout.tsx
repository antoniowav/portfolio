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
    creator: '@antoniopiattelli',
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://piattelli.dev'),
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Add a special class to hide content until it's styled
                  document.documentElement.classList.add('loading');

                  // Apply saved theme immediately to prevent flash
                  const savedTheme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', savedTheme);

                  // Apply saved font immediately to prevent flash - simple version
                  const savedFont = localStorage.getItem('fontFamily') || 'mono';
                  document.documentElement.setAttribute('data-font', savedFont);

                  // Apply grid if saved
                  if(localStorage.getItem('gridOverlay') === 'true') {
                    document.documentElement.classList.add('show-grid');
                  }

                  // Force an immediate style recalculation
                  document.documentElement.className = document.documentElement.className;

                  // Wait until all styles have been applied before showing content
                  setTimeout(function() {
                    document.documentElement.classList.remove('loading');
                  }, 0);
                } catch (e) {
                  // Fall back to defaults if localStorage fails
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.setAttribute('data-font', 'mono');
                  // Remove loading class in case of error
                  document.documentElement.classList.remove('loading');
                }
              })();
            `,
          }}
        />
        <style
        dangerouslySetInnerHTML={{
          __html: `
            html.loading .srcl-action-bar {
              visibility: hidden;
            }
            html:not(.loading) .srcl-action-bar {
              animation: fadeIn 0.2s ease-in;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            html {
              overflow-y: scroll;
            }
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
                    © {new Date().getFullYear()} Antonio Piattelli. All rights
                    reserved.
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
