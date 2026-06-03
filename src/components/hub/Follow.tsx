import { socials } from '@/data/site'
import { ArrowUpRight } from './icons'
import { Panel } from './Panel'
import { PanelHeader } from './PanelHeader'
import { SignupForm } from './SignupForm'

export function Follow() {
  return (
    <Panel id="follow" aria-labelledby="follow-heading">
      <div className="mx-auto w-full max-w-shell px-6 lg:px-10 lg:pr-24">
        <PanelHeader name="Connect" index="06" labelId="follow-heading" />

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-16">
          {/* Socials */}
          <div className="reveal-item d1 col-span-12 lg:col-span-7">
            <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[0.98] tracking-[-0.03em]">
              Watch it get built.
            </h2>
            <ul className="mt-8 border-t-2 border-line-strong">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-line py-5 transition-colors duration-300 hover:bg-paper-sink"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                        {s.label}
                      </span>
                      {s.primary && (
                        <span className="micro text-accent">Primary</span>
                      )}
                    </span>
                    <span className="flex items-center gap-3 text-ink-3">
                      <span className="hidden text-sm sm:inline">{s.handle}</span>
                      <ArrowUpRight className="h-5 w-5 transition-[color,transform] duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Email signup */}
          <div className="reveal-item d2 col-span-12 lg:col-span-5">
            <div className="border border-line-strong p-7 sm:p-9">
              <span className="micro">The list</span>
              <p className="mt-4 text-[clamp(1.25rem,2.4vw,1.65rem)] font-medium leading-[1.15] tracking-[-0.01em]">
                New products and the occasional behind-the-scenes. No noise.
              </p>

              <SignupForm source="list" />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
