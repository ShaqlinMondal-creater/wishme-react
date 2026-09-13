import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { PricingPlanCard } from '@/shared/components/common/PricingPlanCard.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { pricingPlans } from '@/shared/data/pricing.ts'

export function PricingPreviewSection() {
  return (
    <section className="scroll-mt-24 bg-white">
      <PageContainer width="wide" className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Pricing</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-5xl">Begin gently. Go further when it matters.</h2>
          <p className="mt-4 text-navy-muted leading-7">
            Start free. A Signature wish is one keepsake. WishMe+ is for the year of birthdays and
            festivals you refuse to miss.
          </p>
        </div>
        <div className="mt-12 grid auto-rows-fr items-stretch gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingPlanCard key={plan.id} plan={plan} to={ROUTES.pricing} />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
