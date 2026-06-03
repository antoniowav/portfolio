import { Hero } from '@/components/hub/Hero'
import { Now } from '@/components/hub/Now'
import { Products } from '@/components/hub/Products'
import { Templates } from '@/components/hub/Templates'
import { Studio } from '@/components/hub/Studio'
import { Follow } from '@/components/hub/Follow'
import { Footer } from '@/components/hub/Footer'
import { SectionNav } from '@/components/hub/SectionNav'
import { products, profile } from '@/data/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.fullName,
  jobTitle: 'Solo product builder',
  address: { '@type': 'PostalAddress', addressLocality: profile.location },
  email: `mailto:${profile.email}`,
  url: 'https://antoniopiattelli.com',
  makesOffer: products.map((p) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'SoftwareApplication', name: p.name, description: p.tagline },
  })),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Now />
      <Products />
      <Templates />
      <Studio />
      <Follow />
      <Footer />
      <SectionNav />
    </>
  )
}
