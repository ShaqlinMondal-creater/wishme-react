import { OccasionCard } from '@/shared/components/common/OccasionCard.tsx'
import { PageContainer } from '@/shared/layout/PageContainer.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { occasions } from '@/shared/data/occasions.ts'

export function OccasionsSection() {
  return (
    <section className="bg-white">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Occasions</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Choose the moment worth keeping</h2>
          <p className="mt-3 text-navy-muted leading-7">
            Birthday, anniversary, Raksha Bandhan, Bhai Phota — each template is a room waiting for
            their name.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {occasions.map((occasion) => (
            <OccasionCard
              key={occasion.id}
              occasion={occasion}
              to={`${ROUTES.templates}?occasion=${occasion.slug}`}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
