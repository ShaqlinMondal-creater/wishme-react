import { Link } from 'react-router-dom'
import { TemplateCard } from '@/shared/components/common/TemplateCard.tsx'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { ROUTES, templateOpenTarget } from '@/shared/constants/routes.ts'
import { templates } from '@/shared/data/templates.ts'

export function TemplatesSection() {
  const featured = templates.slice(0, 6)

  return (
    <section className="bg-cream">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Templates</p>
            <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Beginnings you can make yours</h2>
            <p className="mt-3 max-w-xl text-navy-muted leading-7">
              Six starting points from the gallery. Soft light, midnight toasts, rakhi threads, a
              blessing in gold.
            </p>
          </div>
          <Link to={ROUTES.templates} className={getButtonClasses({ variant: 'secondary', size: 'sm' })}>
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((template) => {
            const open = templateOpenTarget(template.id)
            return (
              <TemplateCard
                key={template.id}
                template={template}
                to={open.to}
                openInNewTab={open.openInNewTab}
              />
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
