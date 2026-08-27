import { Link } from 'react-router-dom'
import { LoadingState } from '@/components/common/LoadingState.tsx'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { Card } from '@/components/ui/Card.tsx'
import { getButtonClasses } from '@/components/ui/buttonStyles.ts'
import { ROUTES } from '@/constants/routes.ts'
import { usePricingPlans } from '@/hooks/usePricingPlans.ts'
import { cn } from '@/utils/cn.ts'

export function PricingPreviewSection() {
  const { data, isLoading } = usePricingPlans()

  return (
    <section className="bg-white">
      <PageContainer width="wide" className="py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Pricing</p>
          <h2 className="mt-3 font-display text-4xl text-navy">Begin gently. Go premium when it matters.</h2>
        </div>
        {isLoading || !data ? (
          <LoadingState label="Preparing plans…" />
        ) : (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {data.map((plan) => (
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
        )}
      </PageContainer>
    </section>
  )
}
