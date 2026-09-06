import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/cn.ts'

export const WISH_EMOJIS = ['🥂', '✨', '💛', '🎂', '🌙', '💫', '🥰', '🔥'] as const

type Burst = {
  id: number
  emoji: string
  left: number
  drift: string
}

type EmojiReactionsProps = {
  paused: boolean
  autoRain?: boolean
  onReact?: (emoji: string) => void
}

export function EmojiReactions({ paused, autoRain, onReact }: EmojiReactionsProps) {
  const [bursts, setBursts] = useState<Burst[]>([])

  const spawn = (emoji: string, left = 18 + Math.random() * 64) => {
    const id = Date.now() + Math.random()
    setBursts((current) => [
      ...current.slice(-18),
      { id, emoji, left, drift: `${Math.random() * 48 - 24}px` },
    ])
    onReact?.(emoji)
  }

  useEffect(() => {
    if (!autoRain || paused) {
      return
    }

    const id = window.setInterval(() => {
      const emoji = WISH_EMOJIS[Math.floor(Math.random() * WISH_EMOJIS.length)]
      spawn(emoji)
    }, 420)

    return () => window.clearInterval(id)
  }, [autoRain, paused])

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {bursts.map((burst) => (
          <span
            key={burst.id}
            className="wish-float-emoji absolute bottom-[18%] text-3xl sm:text-4xl"
            style={{ left: `${burst.left}%`, ['--wish-drift' as string]: burst.drift }}
            onAnimationEnd={() => setBursts((current) => current.filter((item) => item.id !== burst.id))}
          >
            {burst.emoji}
          </span>
        ))}
      </div>

      <div
        data-wish-ui
        className="absolute inset-x-0 bottom-0 z-20 px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))]"
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-1 rounded-full bg-black/35 px-2 py-2 backdrop-blur-md">
          {WISH_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full text-lg transition-transform sm:h-10 sm:w-10 sm:text-xl',
                'active:scale-125',
              )}
              aria-label={`Send ${emoji}`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation()
                spawn(emoji)
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
