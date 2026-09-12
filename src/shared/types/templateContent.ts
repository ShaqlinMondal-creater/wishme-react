export type TemplateStorySlide = {
  id: string
  image: string
  kicker: string
  title: string
  subtitle: string
}

export type TemplateMomentItem = {
  image: string
  title: string
  body: string
  time: string
}

export type TemplatePrivacyScene = {
  image: string
  kicker: string
  title: string
  body: string
}

export type TemplatePrivacyRow = {
  label: string
  value: string
  detail: string
}

export type TemplateGiftItem = {
  id: string
  emoji: string
  title: string
  body: string
}

export type TemplateRoomCard = {
  title: string
  kicker: string
  hint: string
  cover: string
}

export type TemplateContent = {
  gate: {
    cover: string
    quote: string
    recipient: string
    from: string
    occasion: string
    body: string
    cta: string
    footer: string
  }
  hub: {
    cover: string
    intro: string
  }
  rooms: {
    letter: TemplateRoomCard & {
      date: string
      heading: string
      intro: string
      greeting: string
      body: string[]
      signoff: string
    }
    stories: TemplateRoomCard & {
      slides: TemplateStorySlide[]
    }
    moments: TemplateRoomCard & {
      intro: string
      items: TemplateMomentItem[]
    }
    privacy: TemplateRoomCard & {
      hero: TemplatePrivacyScene
      scenes: TemplatePrivacyScene[]
      rows: TemplatePrivacyRow[]
    }
    gifts: TemplateRoomCard & {
      intro: string
      items: TemplateGiftItem[]
    }
  }
}

export type WishRoomId = 'letter' | 'stories' | 'moments' | 'privacy' | 'gifts'
