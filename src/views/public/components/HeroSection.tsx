import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import heroImage from '@/assets/home/occasion-birthday.png'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { ROUTES } from '@/shared/constants/routes.ts'
import { demoWish } from '@/views/public/data/demo.ts'

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.from('[data-hero-item]', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }, rootRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-navy">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy/92 via-navy/55 to-navy/25" />

      <PageContainer
        width="wide"
        className="relative flex min-h-[85svh] flex-col justify-center gap-10 py-16 pb-28 md:pb-16 lg:grid lg:grid-cols-2 lg:items-center lg:py-24"
      >
        <div>
          <p data-hero-item className="text-xs tracking-[0.28em] text-gold uppercase">
            A LIWAAS experience
          </p>
          <h1
            data-hero-item
            className="mt-4 font-display text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Wishes that feel
            <span className="italic"> held</span>, not sent.
          </h1>
          <p data-hero-item className="mt-5 max-w-xl text-base leading-7 text-gold-soft sm:mt-6 sm:text-lg">
            WISHME is a private digital keepsake. Write their name, add your photographs and a
            song, then share a moment made for one person.
          </p>
          <div data-hero-item className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
            <Link to={ROUTES.createProject} className={getButtonClasses({ size: 'lg', className: 'w-full sm:w-auto' })}>
              Create a wish
            </Link>
            <Link
              to={ROUTES.templates}
              className={getButtonClasses({
                variant: 'inverse',
                size: 'lg',
                className: 'w-full sm:w-auto',
              })}
            >
              Browse templates
            </Link>
          </div>
        </div>

        <article
          data-hero-item
          className="relative mx-auto w-full max-w-md rounded-[2rem] border border-white/15 bg-white/95 p-6 shadow-lift backdrop-blur-sm"
        >
          <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">{demoWish.occasion}</p>
          <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">{demoWish.title}</h2>
          <p className="mt-1 text-sm text-navy-muted">
            For {demoWish.recipient} · from {demoWish.from} · {demoWish.date}
          </p>
          <p className="mt-4 text-sm leading-6 text-navy-muted">{demoWish.message}</p>
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {demoWish.photos.map((photo) => (
              <img
                key={photo.alt}
                src={photo.src}
                alt={photo.alt}
                className="h-20 w-full rounded-2xl object-cover sm:h-24"
              />
            ))}
          </div>
          <p className="mt-4 text-xs tracking-[0.16em] text-navy-muted uppercase">{demoWish.song}</p>
        </article>
      </PageContainer>
    </section>
  )
}
