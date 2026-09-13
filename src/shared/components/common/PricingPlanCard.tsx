import { Link } from 'react-router-dom'
import { Card } from '@/shared/components/ui/Card.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { cn } from '@/shared/lib/cn.ts'
import type { PricingPlan } from '@/shared/types/pricing.ts'

export function PricingPlanCard({ plan, to }: { plan: PricingPlan; to: string }) {
  const featured = plan.highlighted

  return (
    <Card tone={featured ? 'navy' : 'light'} className="flex h-full min-h-full flex-col">
      <p
        className={cn(
          'h-4 text-[10px] tracking-[0.2em] uppercase',
          featured ? 'text-gold' : 'invisible',
        )}
        aria-hidden={!featured}
      >
        Most chosen
      </p>
      <p className={cn('mt-3 text-sm tracking-wide', featured ? 'text-gold' : 'text-gold-deep')}>
        {plan.name}
      </p>
      <p className="mt-3 font-display text-5xl leading-none">{plan.price}</p>
      <p className={cn('mt-2 text-sm', featured ? 'text-gold-soft' : 'text-navy-muted')}>{plan.cadence}</p>
      <p className={cn('mt-4 min-h-12 text-sm leading-6', featured ? 'text-gold-soft' : 'text-navy-muted')}>
        {plan.description}
      </p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className={featured ? 'text-gold' : 'text-gold-deep'} aria-hidden="true">
              ·
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to={to}
        className={getButtonClasses({
          variant: featured ? 'primary' : 'secondary',
          fullWidth: true,
          className: 'mt-8',
        })}
      >
        {plan.ctaLabel}
      </Link>
    </Card>
  )
}
