import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/components/ui/buttonStyles.ts'
import { ROUTES } from '@/constants/routes.ts'

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.from('[data-hero-item]', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }, rootRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section ref={rootRef} className="overflow-hidden bg-cream">
      <PageContainer width="wide" className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p data-hero-item className="text-xs tracking-[0.28em] text-gold-deep uppercase">
            A LIWAAS experience
          </p>
          <h1
            data-hero-item
            className="mt-4 font-display text-5xl leading-[1.05] text-navy sm:text-6xl lg:text-7xl"
          >
            Wishes that feel
            <span className="italic"> held</span>, not sent.
          </h1>
          <p data-hero-item className="mt-6 max-w-xl text-base leading-7 text-navy-muted sm:text-lg">
            WISHME is a personalized digital wishes platform. Choose an occasion, shape every
            word and image, then share a private moment made for one person.
          </p>
          <div data-hero-item className="mt-8 flex flex-wrap gap-3">
            <Link to={ROUTES.createProject} className={getButtonClasses({ size: 'lg' })}>
              Create a wish
            </Link>
            <Link
              to={ROUTES.templates}
              className={getButtonClasses({ variant: 'secondary', size: 'lg' })}
            >
              Browse templates
            </Link>
          </div>
        </div>

        <div data-hero-item className="relative mx-auto w-full max-w-md">
          <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-gold-soft/80 blur-2xl" />
          <article className="relative rounded-[2rem] border border-line bg-white p-6 shadow-lift">
            <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Birthday wish</p>
            <h2 className="mt-3 font-display text-4xl text-navy">For Ananya</h2>
            <p className="mt-4 text-sm leading-6 text-navy-muted">
              A private, animated keepsake — her name, your photographs, a song, and a message
              that does not expire in a chat thread.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="h-20 rounded-2xl bg-linear-to-br from-gold-soft to-ivory" />
              <div className="h-20 rounded-2xl bg-linear-to-br from-ivory to-sand" />
              <div className="h-20 rounded-2xl bg-linear-to-br from-navy to-navy-soft" />
            </div>
          </article>
        </div>
      </PageContainer>
    </section>
  )
}
