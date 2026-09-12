import { PurchaseSummary } from '@/shared/components/common/PurchaseSummary.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { ROUTES, purchasePath } from '@/shared/constants/routes.ts'
import { enabledRoomLabels, templateCoverSrc } from '@/shared/lib/templateDisplay.ts'
import { templateOccasionTitle } from '@/shared/lib/occasionDisplay.ts'
import type { Template } from '@/shared/types/template.ts'

export function GuestPurchaseModal({
  template,
  isOpen,
  onClose,
}: {
  template: Template
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm this template"
      className="max-h-[min(92svh,52rem)] max-w-3xl sm:max-w-4xl"
      titleClassName="text-2xl sm:text-3xl"
    >
      <p className="text-sm text-navy-muted">
        Listed price includes 18% GST. Sign in to complete purchase. Payment with Razorpay comes next.
      </p>
      <div className="mt-5 grid items-start gap-6 sm:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <img
            src={templateCoverSrc(template)}
            alt=""
            className="h-44 w-full rounded-2xl object-cover sm:h-56"
          />
          <p className="mt-4 text-[10px] tracking-[0.2em] text-gold-deep uppercase">
            {templateOccasionTitle(template)}
          </p>
          <h3 className="mt-2 font-display text-2xl text-navy sm:text-3xl">{template.name}</h3>
          <p className="mt-3 text-sm leading-6 text-navy-muted">{template.description}</p>
          <p className="mt-4 text-xs tracking-[0.16em] text-gold-deep uppercase">Rooms</p>
          <p className="mt-1 text-sm text-navy">{enabledRoomLabels(template).join(' · ') || 'None yet'}</p>
        </div>
        <PurchaseSummary
          template={template}
          resolvePurchase={(quote) => ({
            to: ROUTES.login,
            state: { from: purchasePath(template.slug, quote?.coupon.code) },
          })}
        />
      </div>
    </Modal>
  )
}
