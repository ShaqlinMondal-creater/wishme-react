import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { TemplateCard } from '@/shared/components/common/TemplateCard.tsx'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { templatePath } from '@/shared/constants/routes.ts'
import { getApiErrorMessage } from '@/services/http.ts'
import { useOccasions } from '@/shared/hooks/useOccasions.ts'
import { useTemplates } from '@/shared/hooks/useTemplates.ts'
import { cn } from '@/shared/lib/cn.ts'

export function TemplatesPage() {
  const [params, setParams] = useSearchParams()
  const { data: occasions } = useOccasions()
  const { data: templates, isLoading, isError, error, refetch } = useTemplates()
  const selected = params.get('occasion')

  const filtered = useMemo(() => {
    if (!templates) {
      return []
    }

    if (!selected) {
      return templates
    }

    return templates.filter((template) => template.occasion?.type === selected)
  }, [selected, templates])

  const setOccasion = (type: string | 'all') => {
    const next = new URLSearchParams(params)
    if (type === 'all') {
      next.delete('occasion')
    } else {
      next.set('occasion', type)
    }
    setParams(next)
  }

  return (
    <section className="bg-cream py-12 sm:py-16">
      <PageContainer width="wide">
        <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Gallery</p>
        <h1 className="mt-3 font-display text-4xl text-navy sm:text-5xl">Templates</h1>
        <p className="mt-3 max-w-2xl text-navy-muted">
          Open any template to see the wish the way they would — name, photographs, a letter, a
          song. Then make it yours.
        </p>

        <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setOccasion('all')}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm',
              !selected ? 'bg-navy text-white' : 'bg-white text-navy-muted',
            )}
          >
            All
          </button>
          {occasions?.map((occasion) => (
            <button
              key={occasion.id}
              type="button"
              onClick={() => setOccasion(occasion.type)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm capitalize',
                selected === occasion.type ? 'bg-navy text-white' : 'bg-white text-navy-muted',
              )}
            >
              {occasion.title}
            </button>
          ))}
        </div>

        {isLoading ? (
          <LoadingState label="Loading templates…" />
        ) : isError ? (
          <EmptyState
            className="mt-10"
            title="Could not load templates"
            description={getApiErrorMessage(error)}
            actionLabel="Try again"
            onAction={() => void refetch()}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="No templates yet"
            description="Templates appear here after they are added in Admin."
          />
        ) : (
          <div className="mt-10 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((template) => (
              <TemplateCard key={template.id} template={template} to={templatePath(template.slug)} showBuy />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  )
}
