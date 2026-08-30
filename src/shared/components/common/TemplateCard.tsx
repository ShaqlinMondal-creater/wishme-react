import { Link } from 'react-router-dom'
import type { Template } from '@/shared/types/template.ts'
import { Card } from '@/shared/components/ui/Card.tsx'

export type TemplateCardProps = {
  template: Template
  to?: string
  openInNewTab?: boolean
}

export function TemplateCard({ template, to, openInNewTab }: TemplateCardProps) {
  const content = (
    <Card padding="none" hover className="overflow-hidden">
      <div className="relative h-44 sm:h-52">
        <img src={template.cover} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-navy/10 to-transparent" />
        <span className="absolute bottom-4 left-5 font-display text-3xl tracking-wide text-white">
          {template.name}
        </span>
        {template.premium ? (
          <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-gold-deep uppercase">
            Premium
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <p className="text-xs tracking-[0.18em] text-gold-deep uppercase">
          {template.occasion.replaceAll('-', ' ')}
        </p>
        <p className="mt-2 text-sm leading-6 text-navy-muted">{template.description}</p>
      </div>
    </Card>
  )

  if (!to) {
    return content
  }

  return (
    <Link
      to={to}
      className="block"
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {content}
    </Link>
  )
}
