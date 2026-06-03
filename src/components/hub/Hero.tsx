import { profile, threads } from '@/data/site'
import { ArrowDown, ArrowUpRight } from './icons'
import { Panel } from './Panel'
import { PanelHeader } from './PanelHeader'

export function Hero() {
  return (
    <Panel id="top" immediate aria-label="Intro">
      <div className="mx-auto w-full max-w-shell px-6 lg:px-10 lg:pr-24">
        <PanelHeader name="Personal Hub" index="01" />

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-16">
          <div className="col-span-12 lg:col-span-9">
            <h1 className="reveal-item d1 text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.86] tracking-[-0.04em]">
              {profile.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="reveal-item d2 mt-8 max-w-[20ch] text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
              I build products. <span className="text-accent">Solo.</span> From
              Gothenburg.
            </p>
          </div>

          {/* portrait — drop a real photo at public/images/antonio.jpg (4:5) */}
          <figure className="reveal-item d2 col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="relative aspect-[4/5] w-full max-w-[15rem] overflow-hidden border border-line-strong bg-paper-sink">
              <div
                role="img"
                aria-label={`${profile.fullName}, ${profile.location}`}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${profile.photo})` }}
              />
            </div>
            <figcaption className="micro mt-3">{profile.fullName}</figcaption>
          </figure>
        </div>

        <div className="reveal-item d3 mt-12 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-16">
          <a
            href={threads.url}
            target="_blank"
            rel="me noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-deep"
          >
            Follow on Threads
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#products"
            className="group inline-flex items-center justify-center gap-2 border border-ink/30 px-7 py-3.5 text-[0.95rem] font-semibold text-ink transition-colors duration-300 hover:border-ink"
          >
            See what I am building
            <ArrowDown className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="reveal-item d4 absolute inset-x-0 bottom-6 mx-auto max-w-shell px-6 lg:px-10 lg:pr-24">
        <div className="flex items-center justify-between border-t border-line pt-3">
          <span className="micro flex items-center gap-2">
            <ArrowDown className="h-3.5 w-3.5 text-accent" />
            Scroll
          </span>
          <span className="micro">{profile.location}</span>
        </div>
      </div>
    </Panel>
  )
}
