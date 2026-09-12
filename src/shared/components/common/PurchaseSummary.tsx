import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { validateCoupon } from '@/services/coupons.service.ts'
import { getApiErrorMessage } from '@/services/http.ts'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { formatCouponDiscount } from '@/shared/lib/couponDisplay.ts'
import { formatRupees, GST_PERCENT, splitInclusiveGst } from '@/shared/lib/gst.ts'
import type { CouponQuote } from '@/shared/types/coupon.ts'
import type { Template } from '@/shared/types/template.ts'

export type PurchaseTarget = {
  to: string
  state?: unknown
}

export function PurchaseSummary({
  template,
  resolvePurchase,
  initialCode = '',
}: {
  template: Template
  resolvePurchase: (quote: CouponQuote | null) => PurchaseTarget
  initialCode?: string
}) {
  const listed = template.price
  const [code, setCode] = useState(initialCode.toUpperCase())
  const [quote, setQuote] = useState<CouponQuote | null>(null)
  const presetApplied = useRef(false)
  const applyMutation = useMutation({
    mutationFn: (nextCode: string) => validateCoupon({ code: nextCode, template: template.slug }),
    onSuccess: (nextQuote) => {
      setQuote(nextQuote)
      setCode(nextQuote.coupon.code)
    },
  })
  const split = quote
    ? { base: quote.base, tax: quote.tax, total: quote.payable }
    : splitInclusiveGst(listed)
  const taxPercent = quote?.tax_percent ?? GST_PERCENT
  const applyError = applyMutation.isError ? getApiErrorMessage(applyMutation.error) : undefined
  const purchase = resolvePurchase(quote)

  const applyCoupon = applyMutation.mutate

  useEffect(() => {
    const preset = initialCode.trim()

    if (!preset || listed <= 0 || presetApplied.current) {
      return
    }

    presetApplied.current = true
    setCode(preset.toUpperCase())
    applyCoupon(preset)
  }, [applyCoupon, initialCode, listed])

  function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextCode = code.trim()

    if (!nextCode) {
      return
    }

    applyMutation.mutate(nextCode)
  }

  function handleRemoveCoupon() {
    setQuote(null)
    setCode('')
    applyMutation.reset()
  }

  return (
    <div>
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Summary</p>
      <div className="mt-5 space-y-3 text-sm">
        {quote ? (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-navy-muted">Subtotal</span>
              <span className="text-navy">{formatRupees(quote.original_price)}</span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-red-600">Discount</span>
              <span className="font-medium text-red-600">−{formatRupees(quote.amount_off)}</span>
            </div>
          </>
        ) : null}
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-navy-muted">Price</span>
          <span className="text-navy">{formatRupees(split.base)}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-navy-muted">GST ({taxPercent}%)</span>
          <span className="text-navy">{formatRupees(split.tax)}</span>
        </div>
        <div className="border-t border-line pt-3">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-medium text-navy">Total</span>
            <span className="font-display text-3xl text-navy">{formatRupees(split.total)}</span>
          </div>
          <p className="mt-2 text-xs text-navy-muted">Including tax</p>
        </div>
      </div>

      <Link to={purchase.to} state={purchase.state} className="mt-6 block">
        <Button fullWidth>Purchase</Button>
      </Link>

      {listed > 0 ? (
        quote ? (
          <div className="mt-4 rounded-2xl border border-line bg-ivory px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium tracking-[0.08em] text-navy">{quote.coupon.code}</p>
                <p className="mt-1 text-xs text-red-600">
                  {quote.coupon.title} · {formatCouponDiscount(quote.coupon.discount_type, quote.coupon.amount)}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0 px-3" onClick={handleRemoveCoupon}>
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <form className="mt-4" onSubmit={handleApply}>
            <div className="flex items-end gap-2">
              <Input
                label="Coupon code"
                inputSize="sm"
                autoComplete="off"
                spellCheck={false}
                placeholder="WISHME50"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value.toUpperCase())
                  if (applyMutation.isError) {
                    applyMutation.reset()
                  }
                }}
              />
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="h-11 shrink-0 sm:h-10"
                isLoading={applyMutation.isPending}
                disabled={!code.trim()}
              >
                Apply
              </Button>
            </div>
            {applyError ? <p className="mt-2 text-sm text-red-600">{applyError}</p> : null}
          </form>
        )
      ) : null}
    </div>
  )
}
