import { now } from '@/data/site'
import { Panel } from './Panel'
import { PanelHeader } from './PanelHeader'

export function Now() {
  return (
    <Panel id="now" aria-label="Currently building">
      <div className="mx-auto w-full max-w-shell px-6 lg:px-10 lg:pr-24">
        <PanelHeader name="Now" index="02" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 lg:mt-20">
          <span className="reveal-item d1 col-span-12 mb-6 flex items-center gap-3 lg:col-span-3 lg:mb-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="micro text-ink">Currently shipping</span>
          </span>
          <p className="reveal-item d2 col-span-12 text-[clamp(2rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.03em] lg:col-span-9">
            {now.text}
          </p>
        </div>
      </div>
    </Panel>
  )
}
