import type { PricingPlan } from '@/types/pricing.ts'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'keepsake',
    name: 'Keepsake',
    price: 'Free',
    cadence: 'to begin',
    description: 'Create a beautiful wish and share it privately when you are ready.',
    features: [
      'Core templates',
      'Personal names and messages',
      'Private share link (coming soon)',
      'Watermarked preview',
    ],
    highlighted: false,
    ctaLabel: 'Start free',
  },
  {
    id: 'signature',
    name: 'Signature',
    price: '₹299',
    cadence: 'one-time wish',
    description: 'A premium, ad-free experience for a single unforgettable moment.',
    features: [
      'Premium templates',
      'Photos, video and music',
      'Password and schedule (coming soon)',
      'QR share card (coming soon)',
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
      'All Signature features',
      'Multiple wishes a year',
      'Priority new occasions',
      'Family profile (coming soon)',
    ],
    highlighted: false,
    ctaLabel: 'Coming soon',
  },
]
