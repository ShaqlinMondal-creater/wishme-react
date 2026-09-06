import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { TemplateCard } from '@/shared/components/common/TemplateCard.tsx'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { templateOpenTarget } from '@/shared/constants/routes.ts'
import { useOccasions } from '@/shared/hooks/useOccasions.ts'
import { useTemplates } from '@/shared/hooks/useTemplates.ts'
import type { OccasionSlug } from '@/shared/types/occasion.ts'
import { cn } from '@/shared/lib/cn.ts'

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
              onClick={() => setOccasion(occasion.slug)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm capitalize',
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
            {filtered.map((template) => {
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
        )}
      </PageContainer>
    </section>
  )
}
