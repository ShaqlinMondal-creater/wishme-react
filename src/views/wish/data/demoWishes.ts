import { midnightToastStory } from '@/views/wish/data/midnightToastStory.ts'
import { MIDNIGHT_TOAST_DEMO_TOKEN, WISH_TTL_HOURS } from '@/shared/constants/routes.ts'
import type { TemplateContent } from '@/shared/types/templateContent.ts'
import type { StorySlide } from '@/views/wish/data/storyTypes.ts'

export type DemoWish = {
  token: string
  templateId: string
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
    templateId: 'midnight-toast',
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

export function createCatalogueWish(
  template: { slug: string; name: string; occasion?: string | null },
  content: TemplateContent,
): DemoWish {
  return {
    token: `demo-${template.slug}`,
    templateId: template.slug,
    templateName: template.name,
    occasion: template.occasion || content.gate.occasion,
    recipient: content.gate.recipient,
    from: content.gate.from,
    wishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ttlHours: WISH_TTL_HOURS,
    slides: [],
  }
}
