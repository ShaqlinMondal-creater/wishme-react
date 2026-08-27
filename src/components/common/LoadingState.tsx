import { cn } from '@/utils/cn.ts'

export type LoadingStateProps = {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Loading…', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-16', className)}>
      <div className="h-10 w-10 animate-pulse rounded-full border-2 border-gold-soft border-t-gold" />
      <p className="text-sm tracking-wide text-navy-muted">{label}</p>
    </div>
  )
}
