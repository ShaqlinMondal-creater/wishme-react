import { Link } from 'react-router-dom'
import type { Occasion } from '@/shared/types/occasion.ts'
import { Card } from '@/shared/components/ui/Card.tsx'

export type OccasionCardProps = {
  occasion: Occasion
  to?: string
}

export function OccasionCard({ occasion, to }: OccasionCardProps) {
  const content = (
    <Card padding="none" hover className="h-full overflow-hidden">
      <img
        src={occasion.image}
        alt=""
        className="h-44 w-full object-cover sm:h-52"
      />
      <div className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">{occasion.name}</p>
        <h3 className="mt-3 font-display text-2xl text-navy sm:text-3xl">{occasion.tagline}</h3>
        <p className="mt-3 text-sm leading-6 text-navy-muted">{occasion.description}</p>
      </div>
    </Card>
  )

  if (!to) {
    return content
  }

  return (
    <Link to={to} className="block h-full">
      {content}
    </Link>
  )
}
