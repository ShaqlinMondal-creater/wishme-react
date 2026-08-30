import type { Template } from '@/shared/types/template.ts'
import goldenHour from '@/assets/home/template-golden-hour.png'
import midnightToast from '@/assets/home/template-midnight-toast.png'
import stillUs from '@/assets/home/template-still-us.png'
import firstLight from '@/assets/home/template-first-light.png'
import sacredThread from '@/assets/home/template-sacred-thread.png'
import rakhiAtelier from '@/assets/home/template-rakhi-atelier.png'
import photaBloom from '@/assets/home/template-phota-bloom.png'
import tilakGold from '@/assets/home/template-tilak-gold.png'

export const templates: Template[] = [
  {
    id: 'tpl-golden-hour',
    name: 'Golden Hour',
    occasion: 'birthday',
    description: 'Soft light, serif titles, and a slow reveal for a birthday that feels cinematic.',
    thumbnail: 'gold',
    cover: goldenHour,
    premium: false,
  },
  {
    id: 'tpl-midnight-toast',
    name: 'Midnight Toast',
    occasion: 'birthday',
    description: 'A night-sky sequence with a personal toast, photos, and a final wish.',
    thumbnail: 'midnight',
    cover: midnightToast,
    premium: true,
  },
  {
    id: 'tpl-still-us',
    name: 'Still Us',
    occasion: 'anniversary',
    description: 'A quiet, elegant timeline of two people — letters, dates, and a shared song.',
    thumbnail: 'rose',
    cover: stillUs,
    premium: true,
  },
  {
    id: 'tpl-first-light',
    name: 'First Light',
    occasion: 'anniversary',
    description: 'Warm ivory frames and a handwritten feel for a lasting anniversary note.',
    thumbnail: 'ivory',
    cover: firstLight,
    premium: false,
  },
  {
    id: 'tpl-sacred-thread',
    name: 'Sacred Thread',
    occasion: 'raksha-bandhan',
    description: 'Ritual colour, sibling photographs, and a blessing that unfolds with care.',
    thumbnail: 'blush',
    cover: sacredThread,
    premium: false,
  },
  {
    id: 'tpl-rakhi-atelier',
    name: 'Rakhi Atelier',
    occasion: 'raksha-bandhan',
    description: 'A premium, jewellery-box presentation with music and a private message.',
    thumbnail: 'gold',
    cover: rakhiAtelier,
    premium: true,
  },
  {
    id: 'tpl-phota-bloom',
    name: 'Phota Bloom',
    occasion: 'bhai-phota',
    description: 'Floral light, a blessing sequence, and space for a voice or written wish.',
    thumbnail: 'sage',
    cover: photaBloom,
    premium: false,
  },
  {
    id: 'tpl-tilak-gold',
    name: 'Tilak Gold',
    occasion: 'bhai-phota',
    description: 'A ceremonial, gold-accented experience made for a once-a-year blessing.',
    thumbnail: 'midnight',
    cover: tilakGold,
    premium: true,
  },
]
