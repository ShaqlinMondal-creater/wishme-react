import type { Occasion } from '@/shared/types/occasion.ts'
import birthdayImage from '@/assets/home/occasion-birthday.png'
import anniversaryImage from '@/assets/home/occasion-anniversary.png'
import rakhiImage from '@/assets/home/occasion-rakhi.png'
import photaImage from '@/assets/home/occasion-phota.png'

export const occasions: Occasion[] = [
  {
    id: 'occ-birthday',
    slug: 'birthday',
    name: 'Birthday',
    tagline: 'A year, held with care',
    description:
      'Turn a birthday into a private cinematic moment — names, photos, music, and a message that feels handwritten.',
    image: birthdayImage,
  },
  {
    id: 'occ-anniversary',
    slug: 'anniversary',
    name: 'Anniversary',
    tagline: 'For the story you still share',
    description:
      'Celebrate a relationship with an elegant, slow-blooming wish that only the two of you need to understand.',
    image: anniversaryImage,
  },
  {
    id: 'occ-raksha-bandhan',
    slug: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    tagline: 'A thread, made digital',
    description:
      'Honour the bond between siblings with warmth, ritual, and a keepsake they can reopen any time.',
    image: rakhiImage,
  },
  {
    id: 'occ-bhai-phota',
    slug: 'bhai-phota',
    name: 'Bhai Phota',
    tagline: 'Blessing, light, and love',
    description:
      'Offer a blessing that feels intimate and festive — a personal ritual, not a forwarded greeting.',
    image: photaImage,
  },
]
