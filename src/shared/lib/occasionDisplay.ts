import birthdayImage from '@/assets/home/occasion-birthday.png'
import anniversaryImage from '@/assets/home/occasion-anniversary.png'
import rakhiImage from '@/assets/home/occasion-rakhi.png'
import photaImage from '@/assets/home/occasion-phota.png'
import { OCCASION_TYPE_LABELS, type Occasion, type OccasionType } from '@/shared/types/occasion.ts'
import type { Template } from '@/shared/types/template.ts'

const fallbackImages: Record<OccasionType, string> = {
  birthday: birthdayImage,
  anniversary: anniversaryImage,
  'raksha-bandhan': rakhiImage,
  'bhai-phota': photaImage,
  proposal: anniversaryImage,
  dating: birthdayImage,
}

export function occasionTypeLabel(type: string): string {
  return OCCASION_TYPE_LABELS[type as OccasionType] ?? type.replaceAll('-', ' ')
}

export function occasionDefaultImage(type: OccasionType | string): string {
  return fallbackImages[type as OccasionType] ?? birthdayImage
}

export function occasionImageSrc(occasion: Occasion): string {
  if (occasion.thumbnail_url) {
    return occasion.thumbnail_url
  }

  return occasionDefaultImage(occasion.type)
}

export function templateOccasion(template: Template): Occasion | null {
  return template.occasion ?? null
}

export function templateOccasionTitle(template: Template): string {
  return template.occasion?.title ?? occasionTypeLabel(String(template.occasion?.type ?? ''))
}
