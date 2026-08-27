import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoadingState } from '@/components/common/LoadingState.tsx'
import { TemplateCard } from '@/components/common/TemplateCard.tsx'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { useOccasions } from '@/hooks/useOccasions.ts'
import { useTemplates } from '@/hooks/useTemplates.ts'
import type { OccasionSlug } from '@/types/occasion.ts'
import { cn } from '@/utils/cn.ts'

export function TemplatesPage() {
  const [params, setParams] = useSearchParams()
  const { data: occasions } = useOccasions()
  const { data: templates, isLoading } = useTemplates()
  const selected = params.get('occasion')

  const filtered = useMemo(() => {
    if (!templates) {
      return []
    }

    if (!selected) {
      return templates
    }

    return templates.filter((template) => template.occasion === selected)
  }, [selected, templates])

  const setOccasion = (slug: OccasionSlug | 'all') => {
    const next = new URLSearchParams(params)
    if (slug === 'all') {
      next.delete('occasion')
    } else {
      next.set('occasion', slug)
    }
    setParams(next)
  }

  return (
    <section className="bg-cream py-16">
      <PageContainer width="wide">
        <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Gallery</p>
        <h1 className="mt-3 font-display text-5xl text-navy">Templates</h1>
        <p className="mt-3 max-w-2xl text-navy-muted">
          Choose a starting point. Personalization and the editor will arrive in a later phase.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setOccasion('all')}
            className={cn(
              'rounded-full px-4 py-2 text-sm',
              !selected ? 'bg-navy text-white' : 'bg-white text-navy-muted',
            )}
          >
            All
          </button>
          {occasions?.map((occasion) => (
            <button
              key={occasion.id}
              type="button"
              onClick={() => setOccasion(occasion.slug)}
              className={cn(
                'rounded-full px-4 py-2 text-sm capitalize',
                selected === occasion.slug ? 'bg-navy text-white' : 'bg-white text-navy-muted',
              )}
            >
              {occasion.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <LoadingState label="Loading templates…" />
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((template) => (
              <TemplateCard key={template.id} template={template} to={ROUTES.createProject} />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  )
}
