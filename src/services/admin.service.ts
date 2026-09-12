import { apiClient } from '@/services/http.ts'
import { uploadTemplateMedia } from '@/services/uploads.service.ts'
import { demoAdminStats, demoAdminWishes, type DemoWishRow } from '@/shared/data/demoAdmin.ts'
import type { Coupon, CouponAppliesTo, CouponDiscountType, CouponUse, CouponUseAppliedTo } from '@/shared/types/coupon.ts'
import type { Occasion, OccasionType } from '@/shared/types/occasion.ts'
import type { Template } from '@/shared/types/template.ts'
import type { UploadPayload } from '@/shared/types/upload.ts'
import type { User } from '@/shared/types/user.ts'

export type AdminUsersQuery = {
  search?: string
  status?: 'active' | 'inactive'
  role?: 'customer' | 'admin'
  limit?: number
  offset?: number
}

export type AdminUsersPayload = {
  users: User[]
  total: number
  limit: number
  offset: number
}

export type AdminUserPayload = {
  user: User
}

export type UpdateAdminUserInput = {
  name?: string
  email?: string
  mobile_no?: string | null
  dob?: string | null
  role?: 'customer' | 'admin'
  is_active?: boolean
  password?: string
}

export type AdminTemplatesPayload = {
  templates: Template[]
}

export type AdminTemplatePayload = {
  template: Template
}

export type TemplateInput = {
  slug: string
  name: string
  description: string
  occasion_id: number
  price: number
  has_letter: boolean
  has_stories: boolean
  has_moments: boolean
  has_privacy: boolean
  has_surprise_gift: boolean
  is_active: boolean
}

export type AdminTemplatesQuery = {
  search?: string
  occasion_id?: number
  status?: 'active' | 'inactive'
}

export async function fetchAdminUsers(query: AdminUsersQuery = {}): Promise<AdminUsersPayload> {
  const params = new URLSearchParams()

  if (query.search) {
    params.set('search', query.search)
  }

  if (query.status) {
    params.set('status', query.status)
  }

  if (query.role) {
    params.set('role', query.role)
  }

  if (query.limit != null) {
    params.set('limit', String(query.limit))
  }

  if (query.offset != null) {
    params.set('offset', String(query.offset))
  }

  const qs = params.toString()

  return apiClient<AdminUsersPayload>(`/admin/users${qs ? `?${qs}` : ''}`)
}

export async function updateAdminUser(id: number, input: UpdateAdminUserInput): Promise<AdminUserPayload> {
  return apiClient<AdminUserPayload>(`/admin/users/${id}`, {
    method: 'POST',
    body: input,
  })
}

export async function deleteAdminUser(id: number): Promise<null> {
  return apiClient<null>(`/admin/users/${id}`, { method: 'DELETE' })
}

export async function fetchAdminTemplates(query: AdminTemplatesQuery = {}): Promise<AdminTemplatesPayload> {
  const params = new URLSearchParams()

  if (query.search) {
    params.set('search', query.search)
  }

  if (query.occasion_id != null) {
    params.set('occasion_id', String(query.occasion_id))
  }

  if (query.status) {
    params.set('status', query.status)
  }

  const qs = params.toString()

  return apiClient<AdminTemplatesPayload>(`/admin/templates${qs ? `?${qs}` : ''}`)
}

export async function createAdminTemplate(input: TemplateInput): Promise<AdminTemplatePayload> {
  return apiClient<AdminTemplatePayload>('/admin/templates', {
    method: 'POST',
    body: input,
  })
}

export type TemplateBulkCreatePayload = {
  created_count: number
  skipped_count: number
  covers_attached: number
  missing_occasions: string[]
  created: Template[]
  skipped: Template[]
}

export async function bulkCreateAdminTemplates(): Promise<TemplateBulkCreatePayload> {
  return apiClient<TemplateBulkCreatePayload>('/admin/templates/bulk-create', {
    method: 'POST',
  })
}

export async function updateAdminTemplate(id: number, input: TemplateInput): Promise<AdminTemplatePayload> {
  return apiClient<AdminTemplatePayload>(`/admin/templates/${id}`, {
    method: 'POST',
    body: input,
  })
}

export async function deleteAdminTemplate(id: number): Promise<null> {
  return apiClient<null>(`/admin/templates/${id}`, { method: 'DELETE' })
}

export async function fetchAdminTemplate(id: number): Promise<AdminTemplatePayload> {
  return apiClient<AdminTemplatePayload>(`/admin/templates/${id}`)
}

export async function updateAdminTemplateContent(
  id: number,
  content: Record<string, unknown>,
): Promise<AdminTemplatePayload> {
  return apiClient<AdminTemplatePayload>(`/admin/templates/${id}/content`, {
    method: 'POST',
    body: { content },
  })
}

export async function uploadAdminTemplateMedia(
  id: number,
  body: FormData,
): Promise<UploadPayload> {
  return uploadTemplateMedia(id, body)
}

export type OccasionInput = {
  title: string
  description: string
  type: OccasionType
}

export type AdminOccasionPayload = {
  occasion: Occasion
}

export async function createAdminOccasion(input: OccasionInput): Promise<AdminOccasionPayload> {
  return apiClient<AdminOccasionPayload>('/admin/occasions', {
    method: 'POST',
    body: input,
  })
}

export async function updateAdminOccasion(id: number, input: OccasionInput): Promise<AdminOccasionPayload> {
  return apiClient<AdminOccasionPayload>(`/admin/occasions/${id}`, {
    method: 'POST',
    body: input,
  })
}

export async function deleteAdminOccasion(id: number): Promise<null> {
  return apiClient<null>(`/admin/occasions/${id}`, { method: 'DELETE' })
}

export type OccasionBulkCreatePayload = {
  created_count: number
  skipped_count: number
  templates_linked: number
  created: Occasion[]
  skipped: Occasion[]
}

export async function bulkCreateAdminOccasions(): Promise<OccasionBulkCreatePayload> {
  return apiClient<OccasionBulkCreatePayload>('/admin/occasions/bulk-create', {
    method: 'POST',
  })
}

export type CouponInput = {
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
}

export type AdminCouponsQuery = {
  applies_to?: CouponAppliesTo
  status?: 'active' | 'inactive'
}

export type AdminCouponsPayload = {
  coupons: Coupon[]
}

export type AdminCouponPayload = {
  coupon: Coupon
}

export async function fetchAdminCoupons(query: AdminCouponsQuery = {}): Promise<AdminCouponsPayload> {
  const params = new URLSearchParams()

  if (query.applies_to) {
    params.set('applies_to', query.applies_to)
  }

  if (query.status) {
    params.set('status', query.status)
  }

  const qs = params.toString()

  return apiClient<AdminCouponsPayload>(`/admin/coupons${qs ? `?${qs}` : ''}`)
}

export async function createAdminCoupon(input: CouponInput): Promise<AdminCouponPayload> {
  return apiClient<AdminCouponPayload>('/admin/coupons', {
    method: 'POST',
    body: input,
  })
}

export async function updateAdminCoupon(id: number, input: CouponInput): Promise<AdminCouponPayload> {
  return apiClient<AdminCouponPayload>(`/admin/coupons/${id}`, {
    method: 'POST',
    body: input,
  })
}

export async function deleteAdminCoupon(id: number): Promise<null> {
  return apiClient<null>(`/admin/coupons/${id}`, { method: 'DELETE' })
}

export type AdminCouponUsesQuery = {
  coupon_id?: number
  applied_to?: CouponUseAppliedTo
  search?: string
  used_from?: string
  used_to?: string
  limit?: number
  offset?: number
}

export type AdminCouponUsesPayload = {
  uses: CouponUse[]
  total: number
  limit: number
  offset: number
}

export async function fetchAdminCouponUses(query: AdminCouponUsesQuery = {}): Promise<AdminCouponUsesPayload> {
  const params = new URLSearchParams()

  if (query.coupon_id != null) {
    params.set('coupon_id', String(query.coupon_id))
  }

  if (query.applied_to) {
    params.set('applied_to', query.applied_to)
  }

  if (query.search) {
    params.set('search', query.search)
  }

  if (query.used_from) {
    params.set('used_from', query.used_from)
  }

  if (query.used_to) {
    params.set('used_to', query.used_to)
  }

  if (query.limit != null) {
    params.set('limit', String(query.limit))
  }

  if (query.offset != null) {
    params.set('offset', String(query.offset))
  }

  const qs = params.toString()

  return apiClient<AdminCouponUsesPayload>(`/admin/coupons/uses${qs ? `?${qs}` : ''}`)
}

export function getAdminStats() {
  return demoAdminStats
}

export function getAdminWishes(): DemoWishRow[] {
  return demoAdminWishes
}
