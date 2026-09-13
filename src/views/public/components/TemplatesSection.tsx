import { Link } from 'react-router-dom'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { TemplateCard } from '@/shared/components/common/TemplateCard.tsx'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { MIDNIGHT_TOAST_SLUG, ROUTES, templatePath } from '@/shared/constants/routes.ts'
import { useTemplates } from '@/shared/hooks/useTemplates.ts'
import type { Template } from '@/shared/types/template.ts'

export function TemplatesSection() {
  const { data: templates, isLoading } = useTemplates()
  const featured = templates ? pickHomeTemplates(templates) : []

  return (
    <section className="scroll-mt-24 bg-cream">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Templates</p>
          <Link
            to={ROUTES.templates}
            className="text-[11px] tracking-[0.18em] text-gold-deep uppercase transition-colors hover:text-navy"
          >
            View all
          </Link>
        </div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy sm:text-4xl">
          Beginnings you can make yours
        </h2>
        {isLoading ? (
          <LoadingState label="Loading templates…" />
        ) : featured.length === 0 ? (
          <EmptyState
            className="mt-8"
            title="No templates yet"
            description="They will appear here after an admin adds them."
          />
        ) : (
          <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                to={templatePath(template.slug)}
                showBuy
              />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  )
}

function pickHomeTemplates(templates: Template[]) {
  const lead = templates.find((template) => template.slug === MIDNIGHT_TOAST_SLUG)
  const rest = templates.filter((template) => template.id !== lead?.id)
  return (lead ? [lead, ...rest] : templates).slice(0, 6)
}
