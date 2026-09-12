import type { TemplateContent } from '@/shared/types/templateContent.ts'
import { MIDNIGHT_TOAST_SLUG } from '@/shared/constants/routes.ts'
import { templateCoverSrc } from '@/shared/lib/templateDisplay.ts'
import { defaultMidnightToastContent } from '@/views/wish/content/defaultContent.ts'

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isEnginePlaceholder(src: string) {
  return src.startsWith('builtin:midnight-')
}

function withTemplateCover(src: string, cover: string) {
  return isEnginePlaceholder(src) ? cover : src
}

export function mergeTemplateContent(saved: unknown): TemplateContent {
  const defaults = defaultMidnightToastContent()

  if (!isRecord(saved)) {
    return defaults
  }

  const rooms = isRecord(saved.rooms) ? saved.rooms : {}
  const gate = isRecord(saved.gate) ? saved.gate : {}
  const hub = isRecord(saved.hub) ? saved.hub : {}
  const letter = isRecord(rooms.letter) ? rooms.letter : {}
  const stories = isRecord(rooms.stories) ? rooms.stories : {}
  const moments = isRecord(rooms.moments) ? rooms.moments : {}
  const privacy = isRecord(rooms.privacy) ? rooms.privacy : {}
  const gifts = isRecord(rooms.gifts) ? rooms.gifts : {}

  return {
    gate: { ...defaults.gate, ...stringBag(gate, defaults.gate) },
    hub: { ...defaults.hub, ...stringBag(hub, defaults.hub) },
    rooms: {
      letter: {
        ...defaults.rooms.letter,
        ...stringBag(letter, defaults.rooms.letter),
        body: stringList(letter.body, defaults.rooms.letter.body),
      },
      stories: {
        ...defaults.rooms.stories,
        ...stringBag(stories, defaults.rooms.stories),
        slides: Array.isArray(stories.slides) ? (stories.slides as TemplateContent['rooms']['stories']['slides']) : defaults.rooms.stories.slides,
      },
      moments: {
        ...defaults.rooms.moments,
        ...stringBag(moments, defaults.rooms.moments),
        items: Array.isArray(moments.items) ? (moments.items as TemplateContent['rooms']['moments']['items']) : defaults.rooms.moments.items,
      },
      privacy: {
        ...defaults.rooms.privacy,
        ...stringBag(privacy, defaults.rooms.privacy),
        hero: isRecord(privacy.hero)
          ? { ...defaults.rooms.privacy.hero, ...stringBag(privacy.hero, defaults.rooms.privacy.hero) }
          : defaults.rooms.privacy.hero,
        scenes: Array.isArray(privacy.scenes)
          ? (privacy.scenes as TemplateContent['rooms']['privacy']['scenes'])
          : defaults.rooms.privacy.scenes,
        rows: Array.isArray(privacy.rows)
          ? (privacy.rows as TemplateContent['rooms']['privacy']['rows'])
          : defaults.rooms.privacy.rows,
      },
      gifts: {
        ...defaults.rooms.gifts,
        ...stringBag(gifts, defaults.rooms.gifts),
        items: Array.isArray(gifts.items) ? (gifts.items as TemplateContent['rooms']['gifts']['items']) : defaults.rooms.gifts.items,
      },
    },
  }
}

export function contentForTemplate(template: {
  slug: string
  cover?: string | null
  content?: Record<string, unknown> | null
  occasion?: { title?: string; type?: string } | null
}): TemplateContent {
  const content = mergeTemplateContent(template.content)
  const saved = isRecord(template.content) ? template.content : null
  const gate = saved && isRecord(saved.gate) ? saved.gate : null
  const occasion = typeof gate?.occasion === 'string' ? gate.occasion.trim() : ''

  if (occasion === '') {
    content.gate.occasion = template.occasion?.title ?? template.occasion?.type ?? content.gate.occasion
  }

  if (!template.slug || template.slug === MIDNIGHT_TOAST_SLUG) {
    return content
  }

  return applyTemplateCoverFallback(content, templateCoverSrc(template))
}

export function contentForTemplateDemo(template: {
  slug: string
  cover?: string | null
  content?: Record<string, unknown> | null
  occasion?: { title?: string; type?: string } | null
}): TemplateContent {
  return contentForTemplate(template)
}

function applyTemplateCoverFallback(content: TemplateContent, cover: string): TemplateContent {
  const next = structuredClone(content)

  next.gate.cover = withTemplateCover(next.gate.cover, cover)
  next.hub.cover = withTemplateCover(next.hub.cover, cover)
  next.rooms.letter.cover = withTemplateCover(next.rooms.letter.cover, cover)
  next.rooms.stories.cover = withTemplateCover(next.rooms.stories.cover, cover)
  next.rooms.stories.slides = next.rooms.stories.slides.map((slide) => ({
    ...slide,
    image: withTemplateCover(slide.image, cover),
  }))
  next.rooms.moments.cover = withTemplateCover(next.rooms.moments.cover, cover)
  next.rooms.moments.items = next.rooms.moments.items.map((item) => ({
    ...item,
    image: withTemplateCover(item.image, cover),
  }))
  next.rooms.privacy.cover = withTemplateCover(next.rooms.privacy.cover, cover)
  next.rooms.privacy.hero.image = withTemplateCover(next.rooms.privacy.hero.image, cover)
  next.rooms.privacy.scenes = next.rooms.privacy.scenes.map((scene) => ({
    ...scene,
    image: withTemplateCover(scene.image, cover),
  }))
  next.rooms.gifts.cover = withTemplateCover(next.rooms.gifts.cover, cover)

  return next
}

function stringBag<T extends Record<string, unknown>>(input: Record<string, unknown>, fallback: T): Partial<T> {
  const next: Record<string, unknown> = {}

  for (const key of Object.keys(fallback)) {
    const value = input[key]
    if (typeof value === 'string') {
      next[key] = value
    }
  }

  return next as Partial<T>
}

function stringList(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter((item): item is string => typeof item === 'string')
}

export function getByPath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current === null || current === undefined) {
      return undefined
    }

    if (Array.isArray(current) && /^\d+$/.test(key)) {
      return current[Number(key)]
    }

    if (isRecord(current)) {
      return current[key]
    }

    return undefined
  }, source)
}

export function setByPath<T>(source: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const clone = structuredClone(source) as unknown
  let cursor: unknown = clone

  for (let index = 0; index < keys.length - 1; index += 1) {
    const key = keys[index]
    if (Array.isArray(cursor) && /^\d+$/.test(key)) {
      cursor = cursor[Number(key)]
      continue
    }

    if (isRecord(cursor)) {
      cursor = cursor[key]
    }
  }

  const last = keys[keys.length - 1]
  if (Array.isArray(cursor) && /^\d+$/.test(last)) {
    cursor[Number(last)] = value
  } else if (isRecord(cursor)) {
    cursor[last] = value
  }

  return clone as T
}

const COUNT_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five']

export function fillContentVars(text: string, vars: { from: string; count: number }) {
  const word = COUNT_WORDS[vars.count] ?? String(vars.count)
  const Count = word.charAt(0).toUpperCase() + word.slice(1)

  return text.replaceAll('{from}', vars.from).replaceAll('{Count}', Count).replaceAll('{count}', word)
}
