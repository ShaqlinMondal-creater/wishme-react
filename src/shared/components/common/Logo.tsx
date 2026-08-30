import { Link } from 'react-router-dom'
import { APP_NAME, PARENT_BRAND } from '@/shared/constants/config.ts'
import { ROUTES } from '@/shared/constants/routes.ts'
import { cn } from '@/shared/lib/cn.ts'

export type LogoProps = {
  compact?: boolean
  inverted?: boolean
  className?: string
}

export function Logo({ compact = false, inverted = false, className }: LogoProps) {
  return (
    <Link
      to={ROUTES.home}
      className={cn('inline-flex min-w-0 items-center gap-2.5 sm:gap-3', className)}
      aria-label={APP_NAME}
    >
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl font-display text-[1.3rem] leading-none sm:h-10 sm:w-10 sm:text-[1.45rem]',
          inverted ? 'bg-gold text-navy' : 'bg-navy text-gold',
        )}
      >
        W
      </span>
      {compact ? null : (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              'font-display text-[1.15rem] tracking-[0.18em] sm:text-[1.35rem] sm:tracking-[0.22em]',
              inverted ? 'text-white' : 'text-navy',
            )}
          >
            {APP_NAME}
          </span>
          <span
            className={cn(
              'mt-1 text-[9px] tracking-[0.18em] uppercase sm:text-[10px] sm:tracking-[0.22em]',
              inverted ? 'text-gold-soft' : 'text-navy-muted',
            )}
          >
            by {PARENT_BRAND}
          </span>
        </span>
      )}
    </Link>
  )
}
