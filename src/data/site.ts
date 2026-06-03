// Antonio · Personal Creator Hub — single source of editable content.
// Add a product / social = one entry here. Nothing else to touch.
// TODO markers below = real handles/URLs to confirm before launch.

export type Product = {
  name: string
  tagline: string
  tag: string
  /** Omit while a product is still building and has no public link yet. */
  url?: string
  /** featured products span wider in the editorial grid */
  featured?: boolean
  /** 'live' (default) or 'building' — shows a small status label */
  status?: 'live' | 'building'
}

export type Templates = {
  eyebrow: string
  heading: string
  body: string
  /** the lead template, featured by name */
  lead: { name: string; tagline: string }
  /** false until the store is live — shows a waitlist signup instead of a buy CTA */
  live: boolean
  /** store/Gumroad URL, used once `live` is true */
  url?: string
}

export type SocialLink = {
  label: string
  handle: string
  url: string
  primary?: boolean
}

export const profile = {
  name: 'Antonio',
  fullName: 'Antonio Piattelli',
  // one-line identity — first person, confident, warm
  identity: 'I build products. Solo. From Gothenburg.',
  lead: 'Italian roots, strong taste, fast hands. I am building a studio worth of products, one at a time, in public.',
  location: 'Gothenburg, Sweden',
  email: 'hello@antoniopiattelli.com',
  // hero portrait / mark. Drop a real photo at this path (square works best).
  photo: '/images/gallery/profile.jpeg',
}

// Short, editable "currently shipping" line — building-in-public momentum.
export const now = {
  label: 'Now',
  text: 'Shipping Kontra and building Everly, the wedding planner.',
}

export const products: Product[] = [
  {
    name: 'Kontra',
    tagline: 'Deal management for the creator economy.',
    tag: 'SaaS',
    url: 'https://usekontra.com',
    featured: true,
    status: 'live',
  },
  {
    name: 'Everly',
    tagline: 'Wedding planning, beautifully.',
    tag: 'Web app',
    url: 'https://everly-nu.vercel.app',
    status: 'building',
  },
  {
    name: 'Radio',
    tagline: 'A beautiful, curated internet-radio player. Hand-picked stations, zero ads.',
    tag: 'Web app',
    url: 'https://radionweb.netlify.app',
    status: 'live',
  },
  {
    name: 'Directory',
    tagline: 'An editorial, SEO-engineered guide to authentic Italian food across Scandinavia.',
    tag: 'Web app',
    url: 'https://tavola-se.netlify.app/',
    status: 'live',
  },
  // Append KORE, Conductor, etc. as they ship.
]

export const studio = {
  eyebrow: 'Studio',
  text: 'I also run Coda, my product studio, where I take on client work and partnerships.',
  cta: 'Visit Coda',
  url: 'https://coda-product-studio.vercel.app/',
}

// Notion Templates. No store published yet — runs as a waitlist (`live: false`)
// that captures emails via the same /api/subscribe endpoint, tagged "templates".
// Flip `live` to true and set `url` when the Gumroad store goes up.
export const templates: Templates = {
  eyebrow: 'Templates',
  heading: 'Notion templates, coming soon.',
  body: 'The systems I actually run my life and studio on, packaged up. First out: Hushållet — a couples debt-payoff and household finance OS.',
  lead: {
    name: 'Hushållet',
    tagline: 'Couples debt-payoff & household finance OS.',
  },
  live: false,
  // url: 'https://gumroad.com/...',
}

export const socials: SocialLink[] = [
  {
    label: 'Threads',
    handle: '@okbye_toni',
    url: 'https://www.threads.net/@okbye_toni', // TODO: confirm handle
    primary: true,
  },
  {
    label: 'TikTok',
    handle: '@okbye_toni',
    url: 'https://www.tiktok.com/@okbye_toni', // TODO: confirm handle
  },
  {
    label: 'Instagram',
    handle: '@okbye_toni',
    url: 'https://instagram.com/okbye_toni',
  },
]

export const threads = socials.find((s) => s.primary) ?? socials[0]
