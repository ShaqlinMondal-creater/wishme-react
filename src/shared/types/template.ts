import type { Occasion } from '@/shared/types/occasion.ts'

export const TEMPLATE_PRICES = [149, 249, 499] as const

export type TemplatePrice = (typeof TEMPLATE_PRICES)[number]

export type Template = {
  id: number
  slug: string
  name: string
  description: string
  cover: string | null
  cover_id?: number | null
  occasion_id: number
  occasion: Occasion | null
  price: number
  has_letter: boolean
  has_stories: boolean
  has_moments: boolean
  has_privacy: boolean
  has_surprise_gift: boolean
  is_active: boolean
  content?: Record<string, unknown> | null
  created_at?: string
  updated_at?: string
}
