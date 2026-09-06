export type StorySlide =
  | {
      id: string
      durationMs: number
      type: 'cinematic'
      image: string
      kicker?: string
      title?: string
      subtitle?: string
      kenBurns?: 'in' | 'out'
    }
  | {
      id: string
      durationMs: number
      type: 'clock'
      image: string
    }
  | {
      id: string
      durationMs: number
      type: 'letter'
      image: string
      lines: string[]
      signoff?: string
    }
  | {
      id: string
      durationMs: number
      type: 'film'
      images: string[]
      caption?: string
    }
  | {
      id: string
      durationMs: number
      type: 'toast'
      image: string
      title: string
      subtitle?: string
    }
  | {
      id: string
      durationMs: number
      type: 'song'
      image: string
      title: string
      track: string
    }
  | {
      id: string
      durationMs: number
      type: 'celebrate'
      image: string
      title: string
    }
  | {
      id: string
      durationMs: number
      type: 'close'
      image: string
      title: string
      body: string
    }
