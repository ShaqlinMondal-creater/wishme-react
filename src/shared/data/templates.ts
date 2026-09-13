import type { Occasion, OccasionType } from '@/shared/types/occasion.ts'
import { OCCASION_TYPE_LABELS } from '@/shared/types/occasion.ts'
import type { Template } from '@/shared/types/template.ts'
import goldenHour from '@/assets/home/template-golden-hour.png'
import midnightToast from '@/assets/home/template-midnight-toast.png'
import stillUs from '@/assets/home/template-still-us.png'
import firstLight from '@/assets/home/template-first-light.png'
import sacredThread from '@/assets/home/template-sacred-thread.png'
import rakhiAtelier from '@/assets/home/template-rakhi-atelier.png'
import photaBloom from '@/assets/home/template-phota-bloom.png'
import tilakGold from '@/assets/home/template-tilak-gold.png'

const occasionByType: Record<OccasionType, Occasion> = {
  birthday: demoOccasion(1, 'birthday'),
  anniversary: demoOccasion(2, 'anniversary'),
  'raksha-bandhan': demoOccasion(3, 'raksha-bandhan'),
  'bhai-phota': demoOccasion(4, 'bhai-phota'),
  proposal: demoOccasion(5, 'proposal'),
  dating: demoOccasion(6, 'dating'),
}

function demoOccasion(id: number, type: OccasionType): Occasion {
  return {
    id,
    title: OCCASION_TYPE_LABELS[type],
    description: '',
    type,
    thumbnail_id: null,
    thumbnail_url: null,
  }
}

function withOccasion(type: OccasionType, template: Omit<Template, 'occasion' | 'occasion_id'>): Template {
  const occasion = occasionByType[type]
  return { ...template, occasion_id: occasion.id, occasion }
}

export const templates: Template[] = [
  withOccasion('birthday', {
    id: 1,
    slug: 'golden-hour',
    name: 'Golden Hour',
    description: 'Soft light, serif titles, and a slow reveal for a birthday that feels cinematic.',
    cover: goldenHour,
    price: 149,
    has_letter: true,
    has_stories: true,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: false,
    is_active: true,
  }),
  withOccasion('birthday', {
    id: 2,
    slug: 'midnight-toast',
    name: 'Midnight Toast',
    description: 'A night-sky sequence with a personal toast, photos, and a final wish.',
    cover: midnightToast,
    price: 249,
    has_letter: true,
    has_stories: true,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: true,
    is_active: true,
  }),
  withOccasion('anniversary', {
    id: 3,
    slug: 'still-us',
    name: 'Still Us',
    description: 'A quiet, elegant timeline of two people — letters, dates, and a shared song.',
    cover: stillUs,
    price: 249,
    has_letter: true,
    has_stories: false,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: false,
    is_active: true,
  }),
  withOccasion('anniversary', {
    id: 4,
    slug: 'first-light',
    name: 'First Light',
    description: 'Warm ivory frames and a handwritten feel for a lasting anniversary note.',
    cover: firstLight,
    price: 149,
    has_letter: true,
    has_stories: false,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: false,
    is_active: true,
  }),
  withOccasion('raksha-bandhan', {
    id: 5,
    slug: 'sacred-thread',
    name: 'Sacred Thread',
    description: 'Ritual colour, sibling photographs, and a blessing that unfolds with care.',
    cover: sacredThread,
    price: 149,
    has_letter: true,
    has_stories: false,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: false,
    is_active: true,
  }),
  withOccasion('raksha-bandhan', {
    id: 6,
    slug: 'rakhi-atelier',
    name: 'Rakhi Atelier',
    description: 'A premium, jewellery-box presentation with music and a private message.',
    cover: rakhiAtelier,
    price: 499,
    has_letter: true,
    has_stories: true,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: true,
    is_active: true,
  }),
  withOccasion('bhai-phota', {
    id: 7,
    slug: 'phota-bloom',
    name: 'Phota Bloom',
    description: 'Floral light, a blessing sequence, and space for a voice or written wish.',
    cover: photaBloom,
    price: 149,
    has_letter: true,
    has_stories: false,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: false,
    is_active: true,
  }),
  withOccasion('bhai-phota', {
    id: 8,
    slug: 'tilak-gold',
    name: 'Tilak Gold',
    description: 'A ceremonial, gold-accented experience made for a once-a-year blessing.',
    cover: tilakGold,
    price: 499,
    has_letter: true,
    has_stories: true,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: true,
    is_active: true,
  }),
]
