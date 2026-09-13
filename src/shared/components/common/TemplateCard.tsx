import { Link } from 'react-router-dom'
import { BuyButton } from '@/shared/components/common/BuyButton.tsx'
import type { Template } from '@/shared/types/template.ts'
import { Card } from '@/shared/components/ui/Card.tsx'
import { templatePath } from '@/shared/constants/routes.ts'
import { cn } from '@/shared/lib/cn.ts'
import { formatTemplatePrice, templateCoverSrc } from '@/shared/lib/templateDisplay.ts'
import { templateOccasionTitle } from '@/shared/lib/occasionDisplay.ts'

export type TemplateCardProps = {
  template: Template
  to?: string
  openInNewTab?: boolean
  showBuy?: boolean
  size?: 'md' | 'lg'
}

const coverFocus: Record<string, string> = {
  'first-light': 'object-[80%_70%]',
  'golden-hour': 'object-[center_55%]',
  'midnight-toast': 'object-[center_38%]',
  'still-us': 'object-[center_40%]',
}

export function TemplateCard({
  template,
  to,
  openInNewTab,
  showBuy = false,
  size = 'md',
}: TemplateCardProps) {
  const detailTo = to ?? templatePath(template.slug)
  const occasion = templateOccasionTitle(template)
  const featured = size === 'lg'
  const linkRel = openInNewTab ? 'noopener noreferrer' : undefined

  const media = (
    <div className="relative h-full overflow-hidden">
      <img
        src={templateCoverSrc(template)}
        alt=""
        className={cn(
          'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105',
          coverFocus[template.slug] ?? 'object-center',
        )}
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/25 to-transparent" />
      <div className={cn('absolute inset-x-0 bottom-0 p-4', featured && 'sm:p-5')}>
        {occasion ? (
          <p className="text-[10px] tracking-[0.2em] text-gold uppercase">{occasion}</p>
        ) : null}
        <h3
          className={cn(
            'font-display leading-tight text-white',
            occasion ? 'mt-1' : '',
            featured ? 'text-3xl' : 'text-2xl sm:text-[1.65rem]',
          )}
        >
          {template.name}
        </h3>
      </div>
    </div>
  )

  return (
    <Card padding="none" hover className="group flex h-full flex-col overflow-hidden">
      {to ? (
        <Link
          to={detailTo}
          target={openInNewTab ? '_blank' : undefined}
          rel={linkRel}
          className={cn('block overflow-hidden', featured ? 'h-52 sm:h-60' : 'h-44 sm:h-52')}
        >
          {media}
        </Link>
      ) : (
        <div className={cn('overflow-hidden', featured ? 'h-52 sm:h-60' : 'h-44 sm:h-52')}>{media}</div>
      )}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="font-display text-2xl leading-none text-navy">{formatTemplatePrice(template.price)}</p>
        {showBuy ? <BuyButton template={template} className="shrink-0" /> : null}
      </div>
    </Card>
  )
}
