import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { OccasionCard } from '@/shared/components/common/OccasionCard.tsx'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useOccasions } from '@/shared/hooks/useOccasions.ts'
import { cn } from '@/shared/lib/cn.ts'
import type { Occasion } from '@/shared/types/occasion.ts'

export function OccasionsSection() {
  const { data: occasions, isLoading } = useOccasions()

  return (
    <section className="bg-white">
      <PageContainer width="wide" className="py-14 sm:py-20">
        {isLoading ? (
          <>
            <OccasionsHeading />
            <LoadingState label="Loading occasions…" />
          </>
        ) : !occasions || occasions.length === 0 ? (
          <>
            <OccasionsHeading />
            <EmptyState
              className="mt-10"
              title="Occasions coming"
              description="They appear here after an admin adds them."
            />
          </>
        ) : (
          <OccasionSlider occasions={occasions} />
        )}
      </PageContainer>
    </section>
  )
}

function OccasionsHeading({ actions }: { actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Occasions</p>
        <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Choose the moment worth keeping</h2>
        <p className="mt-3 text-navy-muted leading-7">
          Birthday, anniversary, Raksha Bandhan, Bhai Phota — each template is a room waiting for
          their name.
        </p>
      </div>
      {actions}
    </div>
  )
}

function OccasionSlider({ occasions }: { occasions: Occasion[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateButtons = useCallback(() => {
    const scroller = scrollerRef.current

    if (!scroller) {
      return
    }

    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    setCanPrev(scroller.scrollLeft > 8)
    setCanNext(maxScroll > 8 && scroller.scrollLeft < maxScroll - 8)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current

    if (!scroller) {
      return
    }

    updateButtons()
    scroller.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', updateButtons)

    return () => {
      scroller.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [occasions.length, updateButtons])

  function scrollBySlide(direction: -1 | 1) {
    const scroller = scrollerRef.current
    const slide = scroller?.querySelector<HTMLElement>('[data-occasion-slide]')

    if (!scroller || !slide) {
      return
    }

    const styles = getComputedStyle(scroller)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 20
    scroller.scrollBy({ left: direction * (slide.offsetWidth + gap), behavior: 'smooth' })
  }

  const showArrows = canPrev || canNext

  return (
    <div>
      <OccasionsHeading
        actions={
          showArrows ? (
            <div className="flex shrink-0 gap-2">
              <SliderArrow label="Previous occasions" disabled={!canPrev} onClick={() => scrollBySlide(-1)} />
              <SliderArrow label="Next occasions" direction="next" disabled={!canNext} onClick={() => scrollBySlide(1)} />
            </div>
          ) : null
        }
      />
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Occasions"
        className="mt-10 flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {occasions.map((occasion) => (
          <div
            key={occasion.id}
            data-occasion-slide
            className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <OccasionCard
              occasion={occasion}
              to={`${ROUTES.templates}?occasion=${occasion.type}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function SliderArrow({
  label,
  direction = 'prev',
  disabled,
  onClick,
}: {
  label: string
  direction?: 'prev' | 'next'
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors',
        'hover:border-gold hover:text-gold-deep disabled:cursor-not-allowed disabled:opacity-30',
      )}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d={direction === 'next' ? 'M9 5.5 15.5 12 9 18.5' : 'M15 5.5 8.5 12 15 18.5'}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
