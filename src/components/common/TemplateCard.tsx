import { Link } from 'react-router-dom'
import type { Template, TemplateTone } from '@/types/template.ts'
import { Card } from '@/components/ui/Card.tsx'
import { cn } from '@/utils/cn.ts'

export type TemplateCardProps = {
  template: Template
  to?: string
}

const toneClasses: Record<TemplateTone, string> = {
  blush: 'from-[#f3d7d0] to-[#f7eee6]',
  gold: 'from-[#ead7a8] to-[#f6f0e2]',
  midnight: 'from-[#0b1f3a] to-[#2c3f5a]',
  rose: 'from-[#e8c9c4] to-[#f4ece4]',
  sage: 'from-[#d5e0d2] to-[#f3f0e8]',
  ivory: 'from-[#f4eee4] to-[#fffdf8]',
}

export function TemplateCard({ template, to }: TemplateCardProps) {
  const content = (
    <Card padding="none" hover className="overflow-hidden">
      <div
        className={cn(
          'relative flex h-44 items-end bg-linear-to-br px-5 py-4',
          toneClasses[template.thumbnail],
          template.thumbnail === 'midnight' ? 'text-white' : 'text-navy',
        )}
      >
        <span className="font-display text-3xl tracking-wide">{template.name}</span>
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
    <Link to={to} className="block">
      {content}
    </Link>
  )
}
