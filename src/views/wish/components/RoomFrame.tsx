import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'

type RoomFrameProps = {
  kicker: string
  title: string
  onBack: () => void
  children: ReactNode
  scroll?: boolean
}

export function RoomFrame({ kicker, title, onBack, children, scroll = true }: RoomFrameProps) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#070f1c] text-white">
      <div className="relative z-10 flex items-center gap-3 border-b border-white/10 bg-black/25 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-gold/30 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-gold-soft"
        >
          ← Back
        </button>
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.22em] text-gold uppercase">{kicker}</p>
          <p className="truncate font-display text-xl leading-tight lg:text-2xl">{title}</p>
        </div>
      </div>
      <div
        className={cn(
          'min-h-0 flex-1',
          scroll
            ? 'overflow-y-auto px-4 pt-4 pb-[max(1.2rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-10'
            : '',
        )}
      >
        <div className="mx-auto h-full w-full max-w-6xl">{children}</div>
      </div>
    </div>
  )
}
