import { Link } from 'react-router-dom'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { TemplateCard } from '@/shared/components/common/TemplateCard.tsx'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { ROUTES, templateOpenTarget } from '@/shared/constants/routes.ts'
import { useTemplates } from '@/shared/hooks/useTemplates.ts'

export function TemplatesSection() {
  const { data: templates, isLoading } = useTemplates()
  const featured = templates?.slice(0, 6) ?? []

  return (
    <section className="bg-cream">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Templates</p>
            <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Beginnings you can make yours</h2>
            <p className="mt-3 max-w-xl text-navy-muted leading-7">
              Live templates from the catalogue. Open one to see the wish the way they would.
            </p>
          </div>
          <Link to={ROUTES.templates} className={getButtonClasses({ variant: 'secondary', size: 'sm' })}>
            View all
          </Link>
        </div>
        {isLoading ? (
          <LoadingState label="Loading templates…" />
        ) : featured.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="No templates yet"
            description="They will appear here after an admin adds them."
          />
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((template) => {
              const open = templateOpenTarget(template.slug)
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
        )}
      </PageContainer>
    </section>
  )
}
