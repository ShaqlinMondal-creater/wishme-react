import { Link } from 'react-router-dom'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { ROUTES } from '@/shared/constants/routes.ts'

export function CtaSection() {
  return (
    <section className="bg-navy">
      <PageContainer width="narrow" className="py-16 text-center sm:py-20">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Begin</p>
        <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
          Make something they will keep.
        </h2>
        <p className="mt-4 text-base leading-7 text-gold-soft">
          Choose a template. Write their name. Add the photographs and the song. Then send a
          private link — a wish that still feels like a letter.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to={ROUTES.createProject}
            className={getButtonClasses({ size: 'lg', className: 'w-full sm:w-auto' })}
          >
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
      </PageContainer>
    </section>
  )
}
