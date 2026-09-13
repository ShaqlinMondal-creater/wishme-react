import midnightToast from '@/assets/home/template-midnight-toast.png'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { ROUTES } from '@/shared/constants/routes.ts'

export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <img src={midnightToast} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-linear-to-r from-navy/80 via-navy/55 to-navy/35" />
      <PageContainer width="narrow" className="relative py-20 text-center sm:py-24">
        <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Begin</p>
        <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
          Make something they will keep.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-gold-soft/95">
          Choose a template. Write their name. Add the photographs and the song. Then send a
          private link — a wish that still feels like a letter.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to={ROUTES.templates} className={getButtonClasses({ size: 'lg', className: 'w-full sm:w-auto' })}>
            Choose a template
          </Link>
          <Link
            to={ROUTES.pricing}
            className={getButtonClasses({
              variant: 'inverse',
              size: 'lg',
              className: 'w-full sm:w-auto',
            })}
          >
            See pricing
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}
