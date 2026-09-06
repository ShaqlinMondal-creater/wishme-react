import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { templatePreviews } from '@/views/public/data/templatePreviews.ts'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { TemplateCard } from '@/shared/components/common/TemplateCard.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { createWishPath, MIDNIGHT_TOAST_DEMO_TOKEN, ROUTES, templateOpenTarget, wishPath } from '@/shared/constants/routes.ts'
import { occasions } from '@/shared/data/occasions.ts'
import { useTemplates } from '@/shared/hooks/useTemplates.ts'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { cn } from '@/shared/lib/cn.ts'

export function TemplateDetailPage() {
  const { templateId } = useParams()
  const { data: templates, isLoading } = useTemplates()
  const template = templates?.find((item) => item.id === templateId)
  const preview = template ? templatePreviews[template.id] : undefined
  const occasion = occasions.find((item) => item.slug === template?.occasion)
  const related =
    templates?.filter((item) => item.occasion === template?.occasion && item.id !== template?.id) ?? []

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

  if (!template || !preview) {
    return <Navigate to={ROUTES.templates} replace />
  }

  if (template.id === 'tpl-midnight-toast') {
    return <Navigate to={wishPath(MIDNIGHT_TOAST_DEMO_TOKEN)} replace />
  }

  const isDark = preview.mood === 'dark'

  return (
    <>
      <section className="border-b border-line/80 bg-ivory">
        <PageContainer
          width="wide"
          className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-[11px] tracking-[0.22em] text-gold-deep uppercase">Preview</p>
            <p className="mt-1 text-sm text-navy-muted">
              This is {template.name} the way they would open it — a private keepsake, not a card in
              a feed.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={ROUTES.templates}
              className={getButtonClasses({ variant: 'secondary', size: 'sm' })}
            >
              Gallery
            </Link>
            <Link to={createWishPath(template.id)} className={getButtonClasses({ size: 'sm' })}>
              Use this template
            </Link>
          </div>
        </PageContainer>
      </section>

      <article className={cn(isDark ? 'bg-navy text-white' : 'bg-cream text-navy')}>
        <div className="relative min-h-[72vh] overflow-hidden sm:min-h-[78vh]">
          <img src={template.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className={cn(
              'absolute inset-0',
              isDark
                ? 'bg-linear-to-t from-navy via-navy/55 to-navy/20'
                : 'bg-linear-to-t from-navy/80 via-navy/25 to-transparent',
            )}
          />
          <PageContainer width="wide" className="relative flex min-h-[72vh] flex-col justify-end py-12 sm:min-h-[78vh] sm:py-16">
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
              {occasion?.name ?? template.occasion.replaceAll('-', ' ')}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-5xl text-white sm:text-6xl lg:text-7xl">
              For {preview.recipient}
            </h1>
            <p className="mt-3 text-gold-soft">
              From {preview.from} · {preview.date}
            </p>
            {template.premium ? (
              <span className="mt-6 w-fit rounded-full bg-white/15 px-3 py-1 text-[10px] tracking-[0.18em] text-gold uppercase backdrop-blur-sm">
                Premium
              </span>
            ) : null}
          </PageContainer>
        </div>

        <PageContainer width="narrow" className="py-14 sm:py-20">
          <p
            className={cn(
              'font-display text-3xl leading-snug sm:text-4xl',
              isDark ? 'text-gold-soft' : 'text-navy',
            )}
          >
            {preview.title}
          </p>
          <div
            className={cn(
              'mt-8 rounded-[2rem] p-7 shadow-card sm:p-10',
              isDark ? 'bg-navy-soft/80 text-gold-soft' : 'bg-white text-navy',
            )}
          >
            <p className="font-display text-2xl leading-relaxed sm:text-[1.7rem]">
              “{preview.letter}”
            </p>
            <p className={cn('mt-8 text-sm tracking-wide', isDark ? 'text-gold' : 'text-gold-deep')}>
              — {preview.from}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {preview.photos.map((photo, index) => (
              <img
                key={photo.alt}
                src={photo.src}
                alt={photo.alt}
                className={cn(
                  'h-40 w-full rounded-[1.5rem] object-cover sm:h-52',
                  index === 0 && 'col-span-2 h-52 sm:h-72',
                )}
              />
            ))}
          </div>

          <div
            className={cn(
              'mt-10 flex items-center justify-between gap-4 rounded-2xl px-5 py-4',
              isDark ? 'bg-white/8' : 'bg-ivory',
            )}
          >
            <div>
              <p
                className={cn(
                  'text-[10px] tracking-[0.18em] uppercase',
                  isDark ? 'text-gold' : 'text-gold-deep',
                )}
              >
                Now playing
              </p>
              <p className={cn('mt-1 text-sm', isDark ? 'text-white' : 'text-navy')}>{preview.song}</p>
            </div>
            <span
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full',
                isDark ? 'bg-gold text-navy' : 'bg-navy text-gold',
              )}
              aria-hidden="true"
            >
              <PlayIcon />
            </span>
          </div>

          <p
            className={cn(
              'mt-12 text-center font-display text-xl',
              isDark ? 'text-gold-soft' : 'text-navy-muted',
            )}
          >
            Kept for {preview.recipient}. Reopen any time.
          </p>
        </PageContainer>
      </article>

      <section className="bg-white">
        <PageContainer width="wide" className="py-14 sm:py-20">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">{template.name}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy sm:text-4xl">
            Make one with their name, your photographs, a song.
          </h2>
          <p className="mt-4 max-w-xl text-navy-muted leading-7">{template.description}</p>
          <Link
            to={createWishPath(template.id)}
            className={getButtonClasses({ size: 'lg', className: 'mt-8' })}
          >
            Use this template
          </Link>

          {related.length > 0 ? (
            <div className="mt-16">
              <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Same occasion</p>
              <h3 className="mt-3 font-display text-2xl text-navy sm:text-3xl">Other beginnings</h3>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {related.map((item) => {
                  const open = templateOpenTarget(item.id)
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
            </div>
          ) : null}
        </PageContainer>
      </section>
    </>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px" fill="currentColor" aria-hidden="true">
      <path d="M8 5.8v12.4L19 12 8 5.8Z" />
    </svg>
  )
}
