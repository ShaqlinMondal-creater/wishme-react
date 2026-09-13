import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import heroImage from '@/assets/home/occasion-birthday.png'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { demoPath, MIDNIGHT_TOAST_SLUG, ROUTES } from '@/shared/constants/routes.ts'
import { demoWish } from '@/views/public/data/demo.ts'

const marks = ['Private link', 'Photographs', 'A song', 'Five rooms']

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.from('[data-hero-item]', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      })
    }, rootRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-navy">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-navy/90 via-navy/55 to-navy/15" />
      <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-navy/20" />

      <PageContainer
        width="wide"
        className="relative grid items-center gap-10 py-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14 lg:py-20 xl:grid-cols-[minmax(0,1fr)_24rem]"
      >
        <div className="max-w-xl">
          <p data-hero-item className="text-[11px] tracking-[0.32em] text-gold uppercase">
            A LIWAAS experience
          </p>
          <h1
            data-hero-item
            className="mt-4 font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            A wish they can
            <span className="italic text-gold-soft"> walk back into</span>.
          </h1>
          <p data-hero-item className="mt-5 max-w-md text-base leading-7 text-gold-soft/95 sm:text-lg">
            Not a forward. A private room with their name on the door — your letter, photographs,
            a song, and a gift waiting at the end.
          </p>
          <div data-hero-item className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to={ROUTES.templates} className={getButtonClasses({ size: 'lg', className: 'w-full sm:w-auto' })}>
              Begin a wish
            </Link>
            <Link
              to={demoPath(MIDNIGHT_TOAST_SLUG)}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonClasses({
                variant: 'inverse',
                size: 'lg',
                className: 'w-full sm:w-auto',
              })}
            >
              Open a sample
            </Link>
          </div>
          <ul data-hero-item className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.18em] text-gold-soft/85 uppercase">
            {marks.map((mark) => (
              <li key={mark} className="flex items-center gap-2">
                <span className="h-px w-3.5 bg-gold" aria-hidden="true" />
                {mark}
              </li>
            ))}
          </ul>
        </div>

        <article
          data-hero-item
          className="relative mx-auto hidden w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/20 bg-white shadow-lift lg:mx-0 lg:block"
        >
          <img src={demoWish.photos[1].src} alt="" className="h-44 w-full object-cover sm:h-48" />
          <div className="p-5 sm:p-6">
            <p className="text-[10px] tracking-[0.22em] text-gold-deep uppercase">{demoWish.occasion}</p>
            <h2 className="mt-2 font-display text-3xl text-navy">For {demoWish.recipient}</h2>
            <p className="mt-1 text-sm text-navy-muted">
              From {demoWish.from} · {demoWish.date}
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-navy-muted">{demoWish.message}</p>
          </div>
        </article>
      </PageContainer>
    </section>
  )
}
