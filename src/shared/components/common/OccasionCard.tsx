import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Occasion } from '@/shared/types/occasion.ts'
import { Card } from '@/shared/components/ui/Card.tsx'
import { occasionImageSrc, occasionTypeLabel } from '@/shared/lib/occasionDisplay.ts'

export type OccasionCardProps = {
  occasion: Occasion
  to?: string
  actions?: ReactNode
}

export function OccasionCard({ occasion, to, actions }: OccasionCardProps) {
  const content = (
    <Card padding="none" hover className="h-full overflow-hidden">
      <div className="relative">
        <img
          src={occasionImageSrc(occasion)}
          alt=""
          className="h-44 w-full object-cover sm:h-52"
        />
        {actions ? (
          <div className="absolute top-3 right-3 z-10 flex gap-1" onClick={(event) => event.stopPropagation()}>
            {actions}
          </div>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">{occasionTypeLabel(occasion.type)}</p>
        <h3 className="mt-3 font-display text-2xl text-navy sm:text-3xl">{occasion.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-navy-muted">{occasion.description}</p>
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
