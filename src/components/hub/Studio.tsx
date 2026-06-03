import { studio } from '@/data/site'
import { ArrowUpRight } from './icons'
import { Panel } from './Panel'
import { PanelHeader } from './PanelHeader'

export function Studio() {
  return (
    <Panel id="studio" aria-labelledby="studio-heading">
      <div className="mx-auto w-full max-w-shell px-6 lg:px-10 lg:pr-24">
        <PanelHeader name="Studio" index="05" labelId="studio-heading" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 lg:mt-20">
          <span className="reveal-item d1 micro col-span-12 mb-6 lg:col-span-3 lg:mb-0">
            Client work
          </span>
          <div className="col-span-12 lg:col-span-9">
            <p className="reveal-item d2 max-w-[18ch] text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.03em]">
              {studio.text}
            </p>
            <a
              href={studio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-item d3 group mt-10 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-[1.1rem] font-semibold text-ink"
            >
              {studio.cta}
              <ArrowUpRight className="h-5 w-5 text-accent transition-transform duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </Panel>
  )
}
