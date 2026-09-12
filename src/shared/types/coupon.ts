export const COUPON_DISCOUNT_TYPES = ['flat', 'percent'] as const
export type CouponDiscountType = (typeof COUPON_DISCOUNT_TYPES)[number]

export const COUPON_APPLIES_TO = ['template', 'subscription', 'both'] as const
export type CouponAppliesTo = (typeof COUPON_APPLIES_TO)[number]

export const COUPON_DISCOUNT_LABELS: Record<CouponDiscountType, string> = {
  flat: 'Flat ₹',
  percent: 'Percent',
}

export const COUPON_APPLIES_LABELS: Record<CouponAppliesTo, string> = {
  template: 'Template',
  subscription: 'Subscription',
  both: 'Both',
}

export type Coupon = {
  id: number
  code: string
  title: string
  discount_type: CouponDiscountType
  amount: number
  applies_to: CouponAppliesTo
  is_active: boolean
  starts_at: string | null
  ends_at: string | null
  max_uses: number | null
  max_uses_per_user: number
  used_count: number
  created_at?: string
  updated_at?: string
}

export const COUPON_USE_APPLIED_TO = ['template', 'subscription'] as const
export type CouponUseAppliedTo = (typeof COUPON_USE_APPLIED_TO)[number]

export type PublicCoupon = Pick<Coupon, 'id' | 'code' | 'title' | 'discount_type' | 'amount' | 'applies_to'>

export type CouponQuote = {
  coupon: PublicCoupon
  original_price: number
  amount_off: number
  payable: number
  base: number
  tax: number
  tax_percent: number
}

export type CouponUse = {
  id: number
  coupon_id: number
  coupon_code: string | null
  coupon_title: string | null
  user_id: number
  user_name: string | null
  user_email: string | null
  applied_to: CouponUseAppliedTo
  amount_off: number
  original_price: number | null
  purchase_id: number | null
  starts_at: string | null
  ends_at: string | null
  created_at: string | null
}
