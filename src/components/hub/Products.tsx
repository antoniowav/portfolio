import { products } from '@/data/site'
import type { Product } from '@/data/site'
import { ArrowUpRight } from './icons'
import { Panel } from './Panel'
import { PanelHeader } from './PanelHeader'

const DELAYS = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6']

function extUrl(url: string) {
  return url.startsWith('http')
}

function ProductRow({
  p,
  index,
  delay,
}: {
  p: Product
  index: string
  delay: string
}) {
  // Building products may have no public link yet, but still match the others'
  // hover treatment (background + pointer) for visual consistency.
  const rowClass =
    'group grid grid-cols-12 items-center gap-x-4 border-t border-line-strong py-4 transition-colors duration-300 hover:bg-paper-sink sm:py-9'

  const inner = (
    <>
      <span className="micro col-span-2 self-start pt-3 sm:col-span-1">
        {index}
      </span>
      <div className="col-span-10 sm:col-span-7">
        <h3 className="text-[clamp(1.6rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] transition-transform duration-300 ease-expo group-hover:translate-x-2">
          {p.name}
        </h3>
        <p className="mt-2 max-w-prose text-[1.05rem] text-ink-2">{p.tagline}</p>
      </div>
      <div className="col-span-10 col-start-3 mt-3 flex items-center gap-4 sm:col-span-4 sm:col-start-auto sm:mt-0 sm:flex-col sm:items-end sm:gap-2 sm:self-start sm:pt-3">
        <span className="micro">{p.tag}</span>
        {p.status === 'building' ? (
          <span className="micro flex items-center gap-1.5 text-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Building
          </span>
        ) : (
          <span className="micro text-accent">Live</span>
        )}
      </div>
      <ArrowUpRight className="col-span-12 mt-4 h-6 w-6 justify-self-start text-ink-3 transition-[color,transform] duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent sm:hidden" />
    </>
  )

  return (
    <li className={`reveal-item ${delay}`}>
      {p.url ? (
        <a
          href={p.url}
          target={extUrl(p.url) ? '_blank' : undefined}
          rel={extUrl(p.url) ? 'noopener noreferrer' : undefined}
          className={rowClass}
        >
          {inner}
        </a>
      ) : (
        <div className={`${rowClass} cursor-pointer`}>{inner}</div>
      )}
    </li>
  )
}

export function Products() {
  const idx = (n: number) => String(n + 1).padStart(2, '0')

  return (
    <Panel id="products" aria-labelledby="products-heading">
      <div className="mx-auto w-full max-w-shell px-6 lg:px-10 lg:pr-24">
        <PanelHeader name="Building" index="03" labelId="products-heading" />

        <h2 className="reveal-item d1 mt-7 max-w-[16ch] text-[clamp(1.5rem,4vw,3rem)] font-bold leading-[1] tracking-[-0.03em]">
          What I am building, one at a time.
        </h2>

        <ul className="mt-7 border-b border-line-strong lg:mt-14">
          {products.map((p, n) => (
            <ProductRow
              key={p.name}
              p={p}
              index={idx(n)}
              delay={DELAYS[Math.min(n + 1, DELAYS.length - 1)]}
            />
          ))}
        </ul>
      </div>
    </Panel>
  )
}
