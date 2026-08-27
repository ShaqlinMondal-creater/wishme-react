import { OccasionCard } from '@/components/common/OccasionCard.tsx'
import { LoadingState } from '@/components/common/LoadingState.tsx'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { useOccasions } from '@/hooks/useOccasions.ts'

export function OccasionsSection() {
  const { data, isLoading } = useOccasions()

  return (
    <section className="bg-cream">
      <PageContainer width="wide" className="py-20">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Occasions</p>
          <h2 className="mt-3 font-display text-4xl text-navy">Choose the moment worth keeping</h2>
        </div>
        {isLoading || !data ? (
          <LoadingState label="Gathering occasions…" />
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {data.map((occasion) => (
              <OccasionCard
                key={occasion.id}
                occasion={occasion}
                to={`${ROUTES.templates}?occasion=${occasion.slug}`}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  )
}
