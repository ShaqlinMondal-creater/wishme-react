import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'
import { Button } from '@/shared/components/ui/Button.tsx'

export type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-3xl border border-dashed border-line bg-cream px-6 py-14 text-center',
        className,
      )}
    >
      {icon ? <div className="mb-4 text-gold">{icon}</div> : null}
      <h3 className="font-display text-3xl text-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-navy-muted">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
