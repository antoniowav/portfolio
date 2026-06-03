import { templates } from '@/data/site'
import { ArrowUpRight } from './icons'
import { Panel } from './Panel'
import { PanelHeader } from './PanelHeader'
import { SignupForm } from './SignupForm'

export function Templates() {
  return (
    <Panel id="templates" aria-labelledby="templates-heading">
      <div className="mx-auto w-full max-w-shell px-6 lg:px-10 lg:pr-24">
        <PanelHeader
          name={templates.eyebrow}
          index="04"
          labelId="templates-heading"
        />

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-16">
          {/* Pitch */}
          <div className="reveal-item d1 col-span-12 lg:col-span-7">
            <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[0.98] tracking-[-0.03em]">
              {templates.heading}
            </h2>
            <p className="mt-6 max-w-prose text-[1.1rem] leading-relaxed text-ink-2">
              {templates.body}
            </p>

            {/* Lead template, featured by name */}
            <div className="mt-9 border-t-2 border-line-strong pt-6">
              <span className="micro">First out</span>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                  {templates.lead.name}
                </span>
                {!templates.live && (
                  <span className="micro flex items-center gap-1.5 text-accent">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    In the works
                  </span>
                )}
              </div>
              <p className="mt-2 max-w-prose text-[1.05rem] text-ink-2">
                {templates.lead.tagline}
              </p>
            </div>
          </div>

          {/* Waitlist (or buy CTA once live) */}
          <div className="reveal-item d2 col-span-12 lg:col-span-5">
            <div className="border border-line-strong p-7 sm:p-9">
              {templates.live && templates.url ? (
                <>
                  <span className="micro">The store</span>
                  <p className="mt-4 text-[clamp(1.25rem,2.4vw,1.65rem)] font-medium leading-[1.15] tracking-[-0.01em]">
                    Templates are live. Take a look.
                  </p>
                  <a
                    href={templates.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex h-12 items-center justify-center gap-2 bg-accent px-7 text-[0.95rem] font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-deep"
                  >
                    Browse the store
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </>
              ) : (
                <>
                  <span className="micro">The waitlist</span>
                  <p className="mt-4 text-[clamp(1.25rem,2.4vw,1.65rem)] font-medium leading-[1.15] tracking-[-0.01em]">
                    Get the first drop, plus a launch discount. No noise.
                  </p>
                  <SignupForm
                    source="templates"
                    cta="Notify me"
                    successMessage="You are on the templates list. I will let you know the moment they drop."
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
