export type OccasionSlug =
  | 'birthday'
  | 'anniversary'
  | 'raksha-bandhan'
  | 'bhai-phota'

export type Occasion = {
  id: string
  slug: OccasionSlug
  name: string
  tagline: string
  description: string
}
