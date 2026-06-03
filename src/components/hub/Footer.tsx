import { profile, products, socials, studio } from '@/data/site'

const year = 2026 // build-time constant; bump on redesigns

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-shell px-6 py-14 lg:px-10 lg:pr-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <span className="font-display text-3xl font-medium">
              {profile.name}
              <span className="text-accent">.</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              {profile.identity}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3"
          >
            <FooterCol title="Build">
              {products.map((p) => (
                <FooterLink key={p.name} href={p.url ?? '#products'}>
                  {p.name}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="More">
              <FooterLink href="#templates">Templates</FooterLink>
              <FooterLink href={studio.url}>Studio</FooterLink>
              <FooterLink href={`mailto:${profile.email}`}>Email</FooterLink>
            </FooterCol>
            <FooterCol title="Follow">
              {socials.map((s) => (
                <FooterLink key={s.label} href={s.url}>
                  {s.label}
                </FooterLink>
              ))}
            </FooterCol>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="micro normal-case tracking-normal">
            © {year} {profile.fullName}
          </span>
          <span className="micro">{profile.location}</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="micro">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ext = href.startsWith('http')
  return (
    <li>
      <a
        href={href}
        target={ext ? '_blank' : undefined}
        rel={ext ? 'noopener noreferrer' : undefined}
        className="ulink text-[0.95rem] text-ink-2 hover:text-ink"
      >
        {children}
      </a>
    </li>
  )
}
