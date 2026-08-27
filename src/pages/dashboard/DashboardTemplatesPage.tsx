import { LoadingState } from '@/components/common/LoadingState.tsx'
import { TemplateCard } from '@/components/common/TemplateCard.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { useTemplates } from '@/hooks/useTemplates.ts'

export function DashboardTemplatesPage() {
  const { data, isLoading } = useTemplates()

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Catalogue</p>
      <h1 className="mt-2 font-display text-4xl text-navy">Templates</h1>
      <p className="mt-2 text-navy-muted">Start a new wish from any of these foundations.</p>
      {isLoading || !data ? (
        <LoadingState />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((template) => (
            <TemplateCard key={template.id} template={template} to={ROUTES.createProject} />
          ))}
        </div>
      )}
    </div>
  )
}
