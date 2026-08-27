import { Link } from 'react-router-dom'
import logoMark from '@/assets/logo-mark.svg'
import { APP_NAME, PARENT_BRAND } from '@/constants/config.ts'
import { ROUTES } from '@/constants/routes.ts'
import { cn } from '@/utils/cn.ts'

export type LogoProps = {
  compact?: boolean
  inverted?: boolean
}

export function Logo({ compact = false, inverted = false }: LogoProps) {
  return (
    <Link to={ROUTES.home} className="inline-flex items-center gap-3">
      <img
        src={logoMark}
        alt=""
        className={cn('h-10 w-10 rounded-2xl', inverted && 'brightness-110')}
      />
      {compact ? null : (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-[1.35rem] tracking-[0.22em]',
              inverted ? 'text-white' : 'text-navy',
            )}
          >
            {APP_NAME}
          </span>
          <span
            className={cn(
              'mt-1 text-[10px] uppercase tracking-[0.22em]',
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
