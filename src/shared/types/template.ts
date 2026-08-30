import type { OccasionSlug } from '@/shared/types/occasion.ts'

export type TemplateTone = 'blush' | 'gold' | 'midnight' | 'rose' | 'sage' | 'ivory'

export type Template = {
  id: string
  name: string
  occasion: OccasionSlug
  description: string
  thumbnail: TemplateTone
  cover: string
  premium: boolean
}
