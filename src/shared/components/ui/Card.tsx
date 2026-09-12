import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn.ts'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  tone?: 'light' | 'navy'
  hover?: boolean
}

const paddingClasses = {
  none: '',
  sm: 'p-4 sm:p-5',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
} as const

const toneClasses = {
  light: 'border-line/80 bg-white text-navy shadow-soft',
  navy: 'border-gold bg-navy text-white shadow-lift',
} as const

export function Card({
  padding = 'md',
  tone = 'light',
  hover = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border',
        toneClasses[tone],
        paddingClasses[padding],
        hover && 'transition-shadow duration-300 hover:shadow-card',
        className,
      )}
      {...props}
    />
  )
}
