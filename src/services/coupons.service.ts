import { apiClient } from '@/services/http.ts'
import type { CouponQuote } from '@/shared/types/coupon.ts'

export type ValidateCouponInput = {
  code: string
  template: string
}

export async function validateCoupon(input: ValidateCouponInput): Promise<CouponQuote> {
  return apiClient<CouponQuote>('/coupons/validate', {
    method: 'POST',
    body: {
      code: input.code.trim().toUpperCase(),
      template: input.template,
    },
  })
}
