import type { Coupon, CouponAppliesTo, CouponDiscountType, CouponUse } from '@/shared/types/coupon.ts'
import { COUPON_APPLIES_LABELS, COUPON_DISCOUNT_LABELS } from '@/shared/types/coupon.ts'

export function formatCouponDiscount(type: CouponDiscountType, amount: number) {
  return type === 'percent' ? `${amount}% off` : `₹${amount} off`
}

export function couponAppliesLabel(appliesTo: CouponAppliesTo) {
  return COUPON_APPLIES_LABELS[appliesTo]
}

export function couponDiscountLabel(type: CouponDiscountType) {
  return COUPON_DISCOUNT_LABELS[type]
}

export function formatCouponUses(coupon: Pick<Coupon, 'used_count' | 'max_uses' | 'max_uses_per_user'>) {
  const total = coupon.max_uses == null ? 'Unlimited' : `${coupon.used_count} / ${coupon.max_uses}`
  return `${total} · ${coupon.max_uses_per_user} per person`
}

export function formatCouponWindow(startsAt: string | null, endsAt: string | null) {
  if (!startsAt && !endsAt) {
    return 'No date limit'
  }

  const start = startsAt ? formatCouponDate(startsAt) : 'Now'
  const end = endsAt ? formatCouponDate(endsAt) : 'Open'
  return `${start} → ${end}`
}

export function formatCouponUsePeriod(use: Pick<CouponUse, 'applied_to' | 'starts_at' | 'ends_at'>) {
  if (use.applied_to !== 'subscription' || (!use.starts_at && !use.ends_at)) {
    return '—'
  }

  return formatCouponWindow(use.starts_at, use.ends_at)
}

export function couponLifeLabel(coupon: Coupon) {
  if (!coupon.is_active) {
    return 'Inactive'
  }

  const now = Date.now()

  if (coupon.starts_at && new Date(coupon.starts_at).getTime() > now) {
    return 'Scheduled'
  }

  if (coupon.ends_at && new Date(coupon.ends_at).getTime() < now) {
    return 'Expired'
  }

  if (coupon.max_uses != null && coupon.used_count >= coupon.max_uses) {
    return 'Exhausted'
  }

  return 'Active'
}

export function toDateTimeLocal(value: string | null) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function fromDateTimeLocal(value: string) {
  if (!value.trim()) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toISOString()
}

function formatCouponDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
