import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GuestPurchaseModal } from '@/shared/components/common/GuestPurchaseModal.tsx'
import { getButtonClasses, type ButtonSize } from '@/shared/components/ui/buttonStyles.ts'
import { purchasePath } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import type { Template } from '@/shared/types/template.ts'

export function BuyButton({
  template,
  size = 'sm',
  className,
  fullWidth = false,
}: {
  template: Template
  size?: ButtonSize
  className?: string
  fullWidth?: boolean
}) {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const classes = getButtonClasses({ size, fullWidth, className })

  if (isAuthenticated) {
    return (
      <Link to={purchasePath(template.slug)} className={classes}>
        Buy
      </Link>
    )
  }

  return (
    <>
      <button type="button" className={classes} onClick={() => setOpen(true)}>
        Buy
      </button>
      <GuestPurchaseModal template={template} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
