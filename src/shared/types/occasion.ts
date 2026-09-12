export const OCCASION_TYPES = [
  'birthday',
  'anniversary',
  'bhai-phota',
  'raksha-bandhan',
  'proposal',
  'dating',
] as const

export type OccasionType = (typeof OCCASION_TYPES)[number]

export type OccasionSlug = OccasionType

export const OCCASION_TYPE_LABELS: Record<OccasionType, string> = {
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  'bhai-phota': 'Bhai Phota',
  'raksha-bandhan': 'Raksha Bandhan',
  proposal: 'Proposal',
  dating: 'Dating',
}

export type Occasion = {
  id: number
  title: string
  description: string
  type: OccasionType
  thumbnail_id: number | null
  thumbnail_url: string | null
  created_at?: string
  updated_at?: string
}
