import { Link } from 'react-router-dom'
import { BuyButton } from '@/shared/components/common/BuyButton.tsx'
import type { Template } from '@/shared/types/template.ts'
import { Card } from '@/shared/components/ui/Card.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { templatePath } from '@/shared/constants/routes.ts'
import { formatTemplatePrice, templateCoverSrc } from '@/shared/lib/templateDisplay.ts'
import { templateOccasionTitle } from '@/shared/lib/occasionDisplay.ts'

export type TemplateCardProps = {
  template: Template
  to?: string
  openInNewTab?: boolean
  showBuy?: boolean
}

export function TemplateCard({ template, to, openInNewTab, showBuy = false }: TemplateCardProps) {
  const detailTo = to ?? templatePath(template.slug)
  const media = (
    <div className="relative h-44 sm:h-52">
      <img src={templateCoverSrc(template)} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-navy/10 to-transparent" />
      <span className="absolute bottom-4 left-5 font-display text-3xl tracking-wide text-white">
        {template.name}
      </span>
    </div>
  )

  return (
    <Card padding="none" hover className="overflow-hidden">
      {to ? (
        <Link
          to={detailTo}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {media}
        </Link>
      ) : (
        media
      )}
      <div className="p-5">
        <p className="text-xs tracking-[0.18em] text-gold-deep uppercase">
          {templateOccasionTitle(template)}
        </p>
        <p className="mt-3 font-display text-4xl text-navy sm:text-5xl">{formatTemplatePrice(template.price)}</p>
        <p className="mt-3 text-sm leading-6 text-navy-muted">{template.description}</p>
        {showBuy ? (
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to={templatePath(template.slug)} className={getButtonClasses({ variant: 'secondary', size: 'sm' })}>
              Details
            </Link>
            <BuyButton template={template} />
          </div>
        ) : null}
      </div>
    </Card>
  )
}
