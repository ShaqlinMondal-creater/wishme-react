import type { OccasionSlug } from '@/types/occasion.ts'

export type TemplateTone = 'blush' | 'gold' | 'midnight' | 'rose' | 'sage' | 'ivory'

export type Template = {
  id: string
  name: string
  occasion: OccasionSlug
  description: string
  thumbnail: TemplateTone
  premium: boolean
}
