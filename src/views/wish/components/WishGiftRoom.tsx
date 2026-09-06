import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { RoomFrame } from '@/views/wish/components/RoomFrame.tsx'
import { wishGifts } from '@/views/wish/data/midnightToastRooms.ts'
import { cn } from '@/shared/lib/cn.ts'

type WishGiftRoomProps = {
  onBack: () => void
}

export function WishGiftRoom({ onBack }: WishGiftRoomProps) {
  const [chosenId, setChosenId] = useState<string | null>(null)
  const chosenRef = useRef<string | null>(null)
  const [revealedId, setRevealedId] = useState<string | null>(null)

  const claim = (id: string) => {
    if (chosenRef.current && chosenRef.current !== id) {
      return false
    }
    chosenRef.current = id
    setChosenId(id)
    return true
  }

  return (
    <RoomFrame kicker="Scratch" title="Surprise Gift" onBack={onBack} scroll={false}>
      <div className="flex h-full min-h-0 flex-col px-3 pt-3 pb-[max(0.8rem,env(safe-area-inset-bottom))] sm:px-0 sm:pt-4">
        <div className="mb-3 flex shrink-0 flex-col gap-1 sm:mb-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-sm leading-6 text-gold-soft">
            Nine foil tickets. Scratch only one — the rest stay sealed.
          </p>
          <p className="text-[11px] tracking-[0.16em] text-white/50 uppercase">
            {revealedId ? 'This one is yours' : chosenId ? 'Keep scratching this ticket' : 'Choose one'}
          </p>
        </div>
        <div className="mx-auto grid min-h-0 w-full max-w-5xl flex-1 grid-cols-3 grid-rows-3 gap-2 sm:gap-3 lg:max-w-6xl lg:gap-4">
          {wishGifts.map((gift, index) => (
            <ScratchCard
              key={gift.id}
              id={gift.id}
              number={String(index + 1).padStart(2, '0')}
              emoji={gift.emoji}
              title={gift.title}
              body={gift.body}
              chosenId={chosenId}
              revealed={revealedId === gift.id}
              onClaim={claim}
              onRevealed={() => setRevealedId(gift.id)}
            />
          ))}
        </div>
      </div>
    </RoomFrame>
  )
}

function ScratchCard({
  id,
  number,
  emoji,
  title,
  body,
  chosenId,
  revealed,
  onClaim,
  onRevealed,
}: {
  id: string
  number: string
  emoji: string
  title: string
  body: string
  chosenId: string | null
  revealed: boolean
  onClaim: (id: string) => boolean
  onRevealed: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scratching = useRef(false)
  const last = useRef<{ x: number; y: number } | null>(null)
  const started = useRef(false)
  const checkCount = useRef(0)
  const locked = Boolean(chosenId && chosenId !== id)

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }
    const { width, height } = canvas
    const gradient = context.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f3d98a')
    gradient.addColorStop(0.22, '#c4a35a')
    gradient.addColorStop(0.48, '#fff4c8')
    gradient.addColorStop(0.7, '#9c7b32')
    gradient.addColorStop(1, '#6a501c')
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)

    context.strokeStyle = 'rgba(255,246,212,0.32)'
    context.lineWidth = Math.max(1, width * 0.012)
    for (let i = -height; i < width + height; i += Math.max(6, width * 0.045)) {
      context.beginPath()
      context.moveTo(i, 0)
      context.lineTo(i + height, height)
      context.stroke()
    }

    context.fillStyle = 'rgba(255,255,255,0.08)'
    context.fillRect(0, 0, width, height * 0.18)

    context.fillStyle = 'rgba(11, 31, 58, 0.42)'
    context.font = `600 ${Math.max(11, width * 0.12)}px Outfit, sans-serif`
    context.textAlign = 'center'
    context.fillText('SCRATCH', width / 2, height / 2 + 4)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || revealed) {
      return
    }
    const layout = () => {
      if (started.current) {
        return
      }
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      paintFoil()
    }
    layout()
    const observer = new ResizeObserver(layout)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [paintFoil, revealed])

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return null
    }
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    }
  }

  const measure = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) {
      return
    }
    const sample = context.getImageData(0, 0, canvas.width, canvas.height).data
    let clear = 0
    const step = 20
    for (let i = 3; i < sample.length; i += step) {
      if (sample[i] < 48) {
        clear += 1
      }
    }
    if (clear / (sample.length / step) > 0.42) {
      onRevealed()
    }
  }

  const scratchAt = (event: PointerEvent<HTMLCanvasElement>) => {
    if (revealed || locked) {
      return
    }
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const next = point(event)
    if (!canvas || !context || !next) {
      return
    }
    context.globalCompositeOperation = 'destination-out'
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = canvas.width * 0.24
    context.beginPath()
    if (last.current) {
      context.moveTo(last.current.x, last.current.y)
      context.lineTo(next.x, next.y)
    } else {
      context.arc(next.x, next.y, canvas.width * 0.11, 0, Math.PI * 2)
    }
    context.stroke()
    last.current = next
    checkCount.current += 1
    if (checkCount.current % 5 === 0) {
      measure()
    }
  }

  return (
    <div
      className={cn(
        'wish-ticket relative min-h-0 overflow-hidden rounded-[0.7rem] transition-all duration-500 sm:rounded-xl',
        revealed && 'wish-ticket-won z-10',
        locked && 'wish-ticket-locked',
      )}
    >
      <div className="wish-ticket-notch wish-ticket-notch-left" />
      <div className="wish-ticket-notch wish-ticket-notch-right" />
      <div className="absolute inset-[4px] overflow-hidden rounded-[0.5rem] bg-[#15263f] sm:inset-[5px] sm:rounded-[0.65rem]">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-1.5 py-2 text-center sm:px-3">
          <p className="text-[8px] tracking-[0.2em] text-gold/75 sm:text-[10px]">{number}</p>
          <span className="mt-0.5 text-[1.15rem] sm:mt-1 sm:text-3xl" aria-hidden="true">
            {emoji}
          </span>
          <p className="mt-0.5 font-display text-[0.72rem] leading-tight text-white sm:mt-1 sm:text-lg">{title}</p>
          <p className="mt-0.5 hidden text-[10px] leading-4 text-gold-soft sm:mt-1 sm:block sm:text-xs sm:leading-5">
            {body}
          </p>
          <p className="mt-0.5 text-[8px] leading-3 text-gold-soft sm:hidden">{body}</p>
        </div>
        {!revealed ? (
          <>
            <canvas
              ref={canvasRef}
              className={cn('absolute inset-0 h-full w-full', locked ? 'pointer-events-none' : 'touch-none')}
              onPointerDown={(event) => {
                if (locked || !onClaim(id)) {
                  return
                }
                started.current = true
                event.currentTarget.setPointerCapture(event.pointerId)
                scratching.current = true
                last.current = null
                scratchAt(event)
              }}
              onPointerMove={(event) => {
                if (scratching.current) {
                  scratchAt(event)
                }
              }}
              onPointerUp={() => {
                scratching.current = false
                last.current = null
                measure()
              }}
            />
            {chosenId !== id ? (
              <span className="wish-foil-sheen pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light" />
            ) : null}
          </>
        ) : null}
        {locked ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#070f1c]/35">
            <p className="rounded-full border border-gold/35 bg-black/40 px-2 py-0.5 text-[8px] tracking-[0.18em] text-gold uppercase sm:text-[10px]">
              Sealed
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
