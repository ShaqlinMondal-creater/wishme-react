import type { OccasionSlug } from '@/shared/types/occasion.ts'

export type ProjectStatus = 'draft' | 'published' | 'scheduled'

export type Project = {
  id: number
  user_id: number
  template_id: number
  purchase_id: number | null
  title: string
  recipient_name: string
  from_name: string
  content?: Record<string, unknown> | null
  status: ProjectStatus
  template_name?: string | null
  template_slug?: string | null
  template_cover?: string | null
  has_letter?: boolean
  has_stories?: boolean
  has_moments?: boolean
  has_privacy?: boolean
  has_surprise_gift?: boolean
  occasion?: OccasionSlug | null
  occasion_id?: number | null
  created_at?: string
  updated_at?: string
}
