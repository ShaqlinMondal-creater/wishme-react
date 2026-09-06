import { Link } from 'react-router-dom'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { ROUTES } from '@/shared/constants/routes.ts'
import { pricingPlans } from '@/shared/data/pricing.ts'
import { cn } from '@/shared/lib/cn.ts'

export function PricingPreviewSection() {
  return (
    <section className="bg-white">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Pricing</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Begin gently. Go premium when it matters.</h2>
          <p className="mt-4 text-navy-muted leading-7">
            Start free. A Signature wish is a one-time keepsake. WishMe+ is for the year of
            birthdays and festivals you refuse to miss.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(plan.highlighted && 'border-gold bg-navy text-white shadow-lift')}
            >
              <p className={cn('text-sm tracking-wide', plan.highlighted ? 'text-gold' : 'text-gold-deep')}>
                {plan.name}
              </p>
              <p className="mt-3 font-display text-5xl">{plan.price}</p>
              <p className={cn('mt-1 text-sm', plan.highlighted ? 'text-gold-soft' : 'text-navy-muted')}>
                {plan.cadence}
              </p>
              <p className={cn('mt-4 text-sm leading-6', plan.highlighted ? 'text-gold-soft' : 'text-navy-muted')}>
                {plan.description}
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                to={ROUTES.pricing}
                className={getButtonClasses({
                  variant: plan.highlighted ? 'inverse' : 'secondary',
                  className: 'mt-8',
                  fullWidth: true,
                })}
              >
                {plan.ctaLabel}
              </Link>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
