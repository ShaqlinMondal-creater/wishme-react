import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { usePricingPlans } from '@/shared/hooks/usePricingPlans.ts'
import { cn } from '@/shared/lib/cn.ts'

export function BillingPage() {
  const { data, isLoading } = usePricingPlans()

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Account</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Billing</h1>
      <p className="mt-2 max-w-2xl text-navy-muted">
        Razorpay, one-time premium purchases and subscriptions are planned. Nothing is charged
        in this foundation phase.
      </p>
      {isLoading || !data ? (
        <LoadingState />
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((plan) => (
            <Card key={plan.id} className={cn(plan.highlighted && 'border-gold')}>
              <p className="text-sm text-gold-deep">{plan.name}</p>
              <p className="mt-2 font-display text-4xl text-navy">{plan.price}</p>
              <p className="mt-1 text-sm text-navy-muted">{plan.cadence}</p>
              <p className="mt-4 text-sm leading-6 text-navy-muted">{plan.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
