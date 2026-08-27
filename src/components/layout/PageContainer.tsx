import type { ReactNode } from 'react'
import { cn } from '@/utils/cn.ts'

export type PageContainerProps = {
  children: ReactNode
  className?: string
  width?: 'default' | 'narrow' | 'wide'
}

const widthClasses = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
} as const

export function PageContainer({
  children,
  className,
  width = 'default',
}: PageContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-8', widthClasses[width], className)}>
      {children}
    </div>
  )
}
