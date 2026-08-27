import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn.ts'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const

export function Card({
  padding = 'md',
  hover = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-line/80 bg-white shadow-soft',
        paddingClasses[padding],
        hover && 'transition-shadow duration-300 hover:shadow-card',
        className,
      )}
      {...props}
    />
  )
}
