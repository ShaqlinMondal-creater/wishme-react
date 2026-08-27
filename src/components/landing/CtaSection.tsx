import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/components/ui/buttonStyles.ts'
import { ROUTES } from '@/constants/routes.ts'

export function CtaSection() {
  return (
    <section className="bg-navy">
      <PageContainer width="narrow" className="py-20 text-center">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Begin</p>
        <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
          Make something they will keep.
        </h2>
        <p className="mt-4 text-base leading-7 text-gold-soft">
          Start with a template. The editor, publishing, QR and privacy controls will arrive in
          later phases — the foundation is ready.
        </p>
        <Link
          to={ROUTES.createProject}
          className={getButtonClasses({ size: 'lg', className: 'mt-8' })}
        >
          Create a wish
        </Link>
      </PageContainer>
    </section>
  )
}
