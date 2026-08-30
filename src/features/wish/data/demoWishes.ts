import { midnightToastStory } from '@/features/wish/data/midnightToastStory.ts'
import { MIDNIGHT_TOAST_DEMO_TOKEN, WISH_TTL_HOURS } from '@/shared/constants/routes.ts'
import type { StorySlide } from '@/features/wish/data/storyTypes.ts'

export type DemoWish = {
  token: string
  templateId: 'tpl-midnight-toast'
  templateName: string
  occasion: string
  recipient: string
  from: string
  wishedAt: string
  ttlHours: number
  slides: StorySlide[]
}

export const demoWishes: Record<string, DemoWish> = {
  [MIDNIGHT_TOAST_DEMO_TOKEN]: {
    token: MIDNIGHT_TOAST_DEMO_TOKEN,
    templateId: 'tpl-midnight-toast',
    templateName: 'Midnight Toast',
    occasion: 'Birthday',
    recipient: 'Riya',
    from: 'Arjun',
    wishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ttlHours: WISH_TTL_HOURS,
    slides: midnightToastStory,
  },
}

export function getDemoWish(token: string) {
  return demoWishes[token]
}
