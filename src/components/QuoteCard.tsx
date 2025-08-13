import { Quote } from '@/data/quotes-photos'
import { formatDate } from '../lib/utils'

interface QuoteCardProps {
  quote: Quote
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className="p-6 bg-bg-primary rounded-lg border border-border transition-all hover:border-accent-primary">
      <blockquote className="text-lg leading-relaxed mb-4 font-mono text-text-primary">
        "{quote.text}"
      </blockquote>
      <div className="flex justify-between items-end">
        <div>
          <cite className="block font-medium text-accent-primary not-italic">
            {quote.author}
          </cite>
          <time
            dateTime={quote.date}
            className="text-sm text-text-tertiary"
          >
            {formatDate(quote.date)}
          </time>
        </div>
        {quote.featured && (
          <span className="inline-block text-xs font-semibold py-1 px-2 bg-accent-tertiary text-accent-primary rounded">
            Featured
          </span>
        )}
      </div>
    </div>
  )
}
