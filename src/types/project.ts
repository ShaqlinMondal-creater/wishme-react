import type { OccasionSlug } from '@/types/occasion.ts'

export type ProjectStatus = 'draft' | 'published' | 'scheduled'

export type Project = {
  id: string
  title: string
  occasion: OccasionSlug
  templateId: string
  status: ProjectStatus
  recipientName: string
  updatedAt: string
}
