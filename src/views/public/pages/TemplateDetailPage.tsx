import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { TemplateCard } from '@/shared/components/common/TemplateCard.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import {
  createWishPath,
  ROUTES,
  templateOpenTarget,
} from '@/shared/constants/routes.ts'
import { useTemplates } from '@/shared/hooks/useTemplates.ts'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { enabledRoomLabels, formatTemplatePrice, templateCoverSrc } from '@/shared/lib/templateDisplay.ts'
import { templateOccasionTitle } from '@/shared/lib/occasionDisplay.ts'

export function TemplateDetailPage() {
  const { templateId } = useParams()
  const { data: templates, isLoading, isError, refetch } = useTemplates()
  const template = templates?.find((item) => item.slug === templateId)
  const related =
    templates?.filter((item) => item.occasion_id === template?.occasion_id && item.id !== template?.id) ?? []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [templateId])

  if (isLoading) {
    return (
      <section className="bg-cream">
        <LoadingState label="Opening the wish…" />
      </section>
    )
  }

  if (isError) {
    return (
      <section className="bg-cream py-16">
        <PageContainer>
          <EmptyState
            title="Could not load this template"
            description="The catalogue could not be reached. Try again in a moment."
            actionLabel="Try again"
            onAction={() => void refetch()}
          />
        </PageContainer>
      </section>
    )
  }

  if (!template) {
    return <Navigate to={ROUTES.templates} replace />
  }

  const preview = templateOpenTarget(template.slug)

  return (
    <>
      <section className="border-b border-line/80 bg-ivory">
        <PageContainer
          width="wide"
          className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-[11px] tracking-[0.22em] text-gold-deep uppercase">Template</p>
            <p className="mt-1 text-sm text-navy-muted">
              {template.name} — {formatTemplatePrice(template.price)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={ROUTES.templates}
              className={getButtonClasses({ variant: 'secondary', size: 'sm' })}
            >
              Gallery
            </Link>
            <Link
              to={preview.to}
              target={preview.openInNewTab ? '_blank' : undefined}
              rel={preview.openInNewTab ? 'noopener noreferrer' : undefined}
              className={getButtonClasses({ variant: 'secondary', size: 'sm' })}
            >
              Preview
            </Link>
            <Link to={createWishPath(template.slug)} className={getButtonClasses({ size: 'sm' })}>
              Use this template
            </Link>
          </div>
        </PageContainer>
      </section>

      <article className="bg-cream text-navy">
        <div className="relative min-h-[56vh] overflow-hidden sm:min-h-[64vh]">
          <img src={templateCoverSrc(template)} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/25 to-transparent" />
          <PageContainer width="wide" className="relative flex min-h-[56vh] flex-col justify-end py-12 sm:min-h-[64vh] sm:py-16">
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
              {templateOccasionTitle(template)}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-5xl text-white sm:text-6xl">{template.name}</h1>
            <p className="mt-3 text-gold-soft">{formatTemplatePrice(template.price)}</p>
          </PageContainer>
        </div>

        <PageContainer width="narrow" className="py-14 sm:py-20">
          <p className="text-navy-muted leading-7">{template.description}</p>
          <p className="mt-8 text-xs tracking-[0.18em] text-gold-deep uppercase">Rooms included</p>
          <p className="mt-2 text-navy">{enabledRoomLabels(template).join(' · ') || 'None yet'}</p>
          <Link
            to={createWishPath(template.slug)}
            className={getButtonClasses({ size: 'lg', className: 'mt-10' })}
          >
            Use this template
          </Link>
        </PageContainer>
      </article>

      {related.length > 0 ? (
        <section className="bg-white">
          <PageContainer width="wide" className="py-14 sm:py-20">
            <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Same occasion</p>
            <h3 className="mt-3 font-display text-2xl text-navy sm:text-3xl">Other beginnings</h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((item) => {
                const open = templateOpenTarget(item.slug)
                return (
                  <TemplateCard
                    key={item.id}
                    template={item}
                    to={open.to}
                    openInNewTab={open.openInNewTab}
                  />
                )
              })}
            </div>
          </PageContainer>
        </section>
      ) : null}
    </>
  )
}
