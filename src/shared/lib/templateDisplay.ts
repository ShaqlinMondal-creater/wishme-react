import midnightToast from '@/assets/home/template-midnight-toast.png'
import goldenHour from '@/assets/home/template-golden-hour.png'
import stillUs from '@/assets/home/template-still-us.png'
import firstLight from '@/assets/home/template-first-light.png'
import sacredThread from '@/assets/home/template-sacred-thread.png'
import rakhiAtelier from '@/assets/home/template-rakhi-atelier.png'
import photaBloom from '@/assets/home/template-phota-bloom.png'
import tilakGold from '@/assets/home/template-tilak-gold.png'

const bundledCovers: Record<string, string> = {
  'midnight-toast': midnightToast,
  'golden-hour': goldenHour,
  'still-us': stillUs,
  'first-light': firstLight,
  'sacred-thread': sacredThread,
  'rakhi-atelier': rakhiAtelier,
  'phota-bloom': photaBloom,
  'tilak-gold': tilakGold,
}

export function templateDefaultCover(slug: string): string {
  return bundledCovers[slug] ?? midnightToast
}

export function templateCoverSrc(template: { slug: string; cover?: string | null }) {
  if (template.cover && (/^(https?:\/\/|data:|blob:)/.test(template.cover) || template.cover.startsWith('/'))) {
    return template.cover
  }

  return bundledCovers[template.slug] ?? midnightToast
}

export function formatTemplatePrice(price: number) {
  return `₹${price}`
}

export type TemplateRoomFlags = {
  has_letter: boolean
  has_stories: boolean
  has_moments: boolean
  has_privacy: boolean
  has_surprise_gift: boolean
}

export const TEMPLATE_ROOM_LABELS = [
  { id: 'letter', key: 'has_letter', label: 'Letter' },
  { id: 'stories', key: 'has_stories', label: 'Stories' },
  { id: 'moments', key: 'has_moments', label: 'Moments' },
  { id: 'privacy', key: 'has_privacy', label: 'Privacy' },
  { id: 'gifts', key: 'has_surprise_gift', label: 'Surprise gift' },
] as const

export type TemplateRoomId = (typeof TEMPLATE_ROOM_LABELS)[number]['id']

export const ALL_TEMPLATE_ROOMS: TemplateRoomId[] = TEMPLATE_ROOM_LABELS.map((room) => room.id)

export function enabledRoomIds(template?: Partial<TemplateRoomFlags> | null): TemplateRoomId[] {
  if (!template || typeof template.has_letter !== 'boolean') {
    return [...ALL_TEMPLATE_ROOMS]
  }

  return TEMPLATE_ROOM_LABELS.filter((room) => Boolean(template[room.key])).map((room) => room.id)
}

export function enabledRoomLabels(template: TemplateRoomFlags) {
  return TEMPLATE_ROOM_LABELS.filter((room) => template[room.key]).map((room) => room.label)
}
