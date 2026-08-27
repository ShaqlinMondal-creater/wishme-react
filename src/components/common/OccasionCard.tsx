import { Link } from 'react-router-dom'
import type { Occasion } from '@/types/occasion.ts'
import { Card } from '@/components/ui/Card.tsx'

export type OccasionCardProps = {
  occasion: Occasion
  to?: string
}

export function OccasionCard({ occasion, to }: OccasionCardProps) {
  const content = (
    <Card hover className="h-full">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">{occasion.name}</p>
      <h3 className="mt-3 font-display text-3xl text-navy">{occasion.tagline}</h3>
      <p className="mt-3 text-sm leading-6 text-navy-muted">{occasion.description}</p>
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
