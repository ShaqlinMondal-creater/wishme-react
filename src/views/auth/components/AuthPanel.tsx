import type { ReactNode } from 'react'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { PARENT_BRAND } from '@/shared/constants/config.ts'

type AuthPanelProps = {
  image: string
  imageAlt: string
  panelEyebrow: string
  panelQuote: string
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

export function AuthPanel({
  image,
  imageAlt,
  panelEyebrow,
  panelQuote,
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthPanelProps) {
  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr] lg:grid-cols-2 lg:grid-rows-none">
      <div className="relative h-[22vh] min-h-28 max-h-48 sm:h-56 sm:max-h-none lg:h-auto lg:min-h-svh">
        <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-12">
          <p className="text-[10px] tracking-[0.28em] text-gold uppercase sm:text-[11px]">{panelEyebrow}</p>
          <p className="mt-1.5 max-w-lg font-display text-[1.65rem] leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
            {panelQuote}
          </p>
        </div>
      </div>

      <section className="flex min-h-0 flex-col bg-cream lg:min-h-svh">
        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col px-5 py-5 sm:px-10 sm:py-8 lg:px-14">
          <Logo />

          <div className="flex flex-1 flex-col justify-center py-4 sm:py-5">
            <p className="text-[10px] tracking-[0.24em] text-gold-deep uppercase sm:text-[11px]">{eyebrow}</p>
            <h1 className="mt-1.5 font-display text-[1.85rem] leading-none text-navy sm:text-[2.1rem]">{title}</h1>
            <p className="mt-2 max-w-[36ch] text-sm leading-6 text-navy-muted">{description}</p>
            <div className="mt-4 sm:mt-5">{children}</div>
            <div className="mt-4">{footer}</div>
          </div>

          <p className="pt-2 text-[10px] tracking-[0.18em] text-navy-muted uppercase sm:text-[11px]">
            A {PARENT_BRAND} experience
          </p>
        </div>
      </section>
    </div>
  )
}
