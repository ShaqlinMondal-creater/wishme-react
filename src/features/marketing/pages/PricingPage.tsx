import { Link } from 'react-router-dom'
import giftImage from '@/assets/auth/register.png'
import atelierImage from '@/assets/home/template-rakhi-atelier.png'
import { pricingFaqs } from '@/features/marketing/data/pricingFaqs.ts'
import { Card } from '@/shared/components/ui/Card.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { ROUTES } from '@/shared/constants/routes.ts'
import { pricingPlans } from '@/shared/data/pricing.ts'
import { PageContainer } from '@/shared/layout/PageContainer.tsx'
import { cn } from '@/shared/lib/cn.ts'

export function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy">
        <img src={atelierImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/72" />
        <PageContainer width="wide" className="relative py-16 sm:py-20 lg:py-24">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Pricing</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl text-white sm:text-5xl">
            Begin gently. Go premium when it matters.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-gold-soft">
            Start free. A Signature wish is a one-time keepsake. WishMe+ is for the year of
            birthdays and festivals you refuse to miss.
          </p>
        </PageContainer>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <PageContainer width="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    <li key={feature} className="flex gap-2">
                      <span className={plan.highlighted ? 'text-gold' : 'text-gold-deep'} aria-hidden="true">
                        ·
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={ROUTES.register}
                  className={getButtonClasses({
                    variant: plan.highlighted ? 'inverse' : 'secondary',
                    fullWidth: true,
                    className: 'mt-8',
                  })}
                >
                  {plan.ctaLabel}
                </Link>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-white">
        <PageContainer width="wide" className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <img
            src={giftImage}
            alt="A gold-ribboned gift"
            className="h-72 w-full rounded-[2rem] object-cover sm:h-96"
          />
          <div>
            <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">What you are buying</p>
            <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">A moment, not a feed</h2>
            <p className="mt-4 text-navy-muted leading-7">
              Keepsake is the door. Signature is one wish made with photographs, music and a
              private lock. WishMe+ is the year you refuse to miss — rakhi, birthdays, the
              anniversary that still needs a letter.
            </p>
            <p className="mt-4 text-navy-muted leading-7">
              Nothing here is a loud subscription trap. You begin free. You pay when the occasion
              deserves it.
            </p>
            <Link to={ROUTES.createProject} className={getButtonClasses({ className: 'mt-8' })}>
              Create a wish
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="bg-cream">
        <PageContainer width="narrow" className="py-14 sm:py-20">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Questions</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Before you choose</h2>
          <div className="mt-10 space-y-8">
            {pricingFaqs.map((item) => (
              <article key={item.question}>
                <h3 className="font-display text-2xl text-navy">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-navy-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-navy">
        <PageContainer width="narrow" className="py-16 text-center sm:py-20">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Begin</p>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
            Make something they will keep.
          </h2>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to={ROUTES.register} className={getButtonClasses({ size: 'lg', className: 'w-full sm:w-auto' })}>
              Create an account
            </Link>
            <Link
              to={ROUTES.support}
              className={getButtonClasses({ variant: 'inverse', size: 'lg', className: 'w-full sm:w-auto' })}
            >
              Ask support
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  )
}
