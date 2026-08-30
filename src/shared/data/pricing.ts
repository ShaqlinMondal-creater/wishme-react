import type { PricingPlan } from '@/shared/types/pricing.ts'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'keepsake',
    name: 'Keepsake',
    price: 'Free',
    cadence: 'to begin',
    description: 'Create a beautiful wish and share it privately when you are ready.',
    features: [
      'Core templates',
      'Personal names and a private letter',
      'Private share link',
      'Reopen anytime',
    ],
    highlighted: false,
    ctaLabel: 'Start free',
  },
  {
    id: 'signature',
    name: 'Signature',
    price: '₹299',
    cadence: 'one-time wish',
    description: 'A premium, ad-free keepsake for a single unforgettable moment.',
    features: [
      'Premium templates',
      'Photographs, video and music',
      'Password-protected link',
      'QR share card',
    ],
    highlighted: true,
    ctaLabel: 'Choose Signature',
  },
  {
    id: 'wishme-plus',
    name: 'WishMe+',
    price: '₹499',
    cadence: 'per year',
    description: 'For the person who never misses a birthday, festival or anniversary.',
    features: [
      'Everything in Signature',
      'Multiple wishes a year',
      'New occasions first',
      'A quieter family profile',
    ],
    highlighted: false,
    ctaLabel: 'Start WishMe+',
  },
]
