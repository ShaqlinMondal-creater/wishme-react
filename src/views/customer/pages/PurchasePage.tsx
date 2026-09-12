import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTemplate } from '@/services/catalog.service.ts'
import { getApiErrorMessage } from '@/services/http.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { PurchaseSummary } from '@/shared/components/common/PurchaseSummary.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { createWishPath, ROUTES, templateOpenTarget, templatePath } from '@/shared/constants/routes.ts'
import { GST_PERCENT } from '@/shared/lib/gst.ts'
import { templateOccasionTitle } from '@/shared/lib/occasionDisplay.ts'
import { enabledRoomLabels, templateCoverSrc } from '@/shared/lib/templateDisplay.ts'

export function PurchasePage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialCode = searchParams.get('coupon') ?? ''
  const templateQuery = useQuery({
    queryKey: [...queryKeys.templates, slug],
    queryFn: () => getTemplate(slug),
    enabled: Boolean(slug),
  })
  const template = templateQuery.data
  const preview = template ? templateOpenTarget(template.slug) : null

  if (templateQuery.isLoading) {
    return <LoadingState label="Opening purchase…" />
  }

  if (templateQuery.isError || !template) {
    return (
      <EmptyState
        title="Template not found"
        description={templateQuery.error ? getApiErrorMessage(templateQuery.error) : 'This template is not in the catalogue.'}
        actionLabel="Browse templates"
        onAction={() => navigate(ROUTES.templates)}
      />
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Purchase</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Confirm this template</h1>
      <p className="mt-2 max-w-2xl text-navy-muted">
        Listed price includes {GST_PERCENT}% GST. Payment with Razorpay comes next.
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Card padding="none" className="overflow-hidden">
          <img src={templateCoverSrc(template)} alt="" className="h-56 w-full object-cover sm:h-72" />
          <div className="p-5 sm:p-6">
            <p className="text-[10px] tracking-[0.2em] text-gold-deep uppercase">
              {templateOccasionTitle(template)}
            </p>
            <h2 className="mt-2 font-display text-3xl text-navy">{template.name}</h2>
            <p className="mt-3 text-sm leading-6 text-navy-muted">{template.description}</p>
            <p className="mt-4 text-xs tracking-[0.16em] text-gold-deep uppercase">Rooms</p>
            <p className="mt-1 text-sm text-navy">{enabledRoomLabels(template).join(' · ') || 'None yet'}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {preview ? (
                <Link
                  to={preview.to}
                  target={preview.openInNewTab ? '_blank' : undefined}
                  rel={preview.openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button variant="secondary" size="sm">
                    Preview
                  </Button>
                </Link>
              ) : null}
              <Link to={templatePath(template.slug)}>
                <Button variant="ghost" size="sm">
                  Back to details
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="lg:sticky lg:top-24">
          <PurchaseSummary
            template={template}
            initialCode={initialCode}
            resolvePurchase={() => ({ to: createWishPath(template.slug) })}
          />
        </Card>
      </div>
    </div>
  )
}
