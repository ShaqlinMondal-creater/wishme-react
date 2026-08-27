import { Link } from 'react-router-dom'
import { LoadingState } from '@/components/common/LoadingState.tsx'
import { TemplateCard } from '@/components/common/TemplateCard.tsx'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/components/ui/buttonStyles.ts'
import { ROUTES } from '@/constants/routes.ts'
import { useTemplates } from '@/hooks/useTemplates.ts'

export function TemplatesSection() {
  const { data, isLoading } = useTemplates()
  const featured = data?.slice(0, 3) ?? []

  return (
    <section className="bg-white">
      <PageContainer width="wide" className="py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Templates</p>
            <h2 className="mt-3 font-display text-4xl text-navy">Featured beginnings</h2>
          </div>
          <Link to={ROUTES.templates} className={getButtonClasses({ variant: 'secondary', size: 'sm' })}>
            View all
          </Link>
        </div>
        {isLoading ? (
          <LoadingState label="Opening templates…" />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                to={ROUTES.createProject}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  )
}
