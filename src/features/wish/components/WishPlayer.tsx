import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { EmojiReactions } from '@/features/wish/components/EmojiReactions.tsx'
import { StoryProgress } from '@/features/wish/components/StoryProgress.tsx'
import { WishSlide } from '@/features/wish/components/WishSlide.tsx'
import type { DemoWish } from '@/features/wish/data/demoWishes.ts'

type WishPlayerProps = {
  wish: DemoWish
  onBack: () => void
}

const HOLD_MS = 420

export function WishPlayer({ wish, onBack }: WishPlayerProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ended, setEnded] = useState(false)
  const [progress, setProgress] = useState(0)
  const elapsedRef = useRef(0)
  const lastRef = useRef<number | null>(null)
  const advancedRef = useRef(false)
  const holdTimerRef = useRef<number | null>(null)
  const didHoldRef = useRef(false)

  const slide = wish.slides[index]
  const durationMs = slide?.durationMs ?? 0
  const lastIndex = wish.slides.length - 1

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0) {
        return
      }
      if (nextIndex >= wish.slides.length) {
        setEnded(true)
        setPaused(true)
        return
      }
      elapsedRef.current = 0
      lastRef.current = null
      advancedRef.current = false
      setProgress(0)
      setEnded(false)
      setPaused(false)
      setIndex(nextIndex)
    },
    [wish.slides.length],
  )

  const replay = () => {
    setPaused(false)
    goTo(0)
  }

  useEffect(() => {
    if (paused || ended || !slide) {
      lastRef.current = null
      return
    }

    let raf = 0
    const tick = (now: number) => {
      if (lastRef.current == null) {
        lastRef.current = now
      }
      elapsedRef.current += now - lastRef.current
      lastRef.current = now
      const nextProgress = Math.min(1, elapsedRef.current / durationMs)
      setProgress(nextProgress)
      if (nextProgress >= 1 && !advancedRef.current) {
        advancedRef.current = true
        goTo(index + 1)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, ended, goTo, index, paused, slide])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (ended) {
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(index - 1)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goTo(index + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ended, goTo, index])

  const clearHold = () => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }

  const startHold = () => {
    if (ended) {
      return
    }
    didHoldRef.current = false
    clearHold()
    holdTimerRef.current = window.setTimeout(() => {
      didHoldRef.current = true
      setPaused(true)
    }, HOLD_MS)
  }

  const finishHold = (direction: 'prev' | 'next') => {
    if (ended) {
      return
    }
    clearHold()
    if (didHoldRef.current) {
      setPaused(false)
      didHoldRef.current = false
      return
    }
    goTo(direction === 'prev' ? index - 1 : index + 1)
  }

  const onZonePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    startHold()
  }

  const onPointerCancelHold = () => {
    clearHold()
    if (didHoldRef.current && !ended) {
      setPaused(false)
    }
    didHoldRef.current = false
  }

  return (
    <div className="absolute inset-0 select-none" style={{ touchAction: 'manipulation' }} onContextMenu={(event) => event.preventDefault()}>
      {ended ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy px-8 text-center">
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Stories</p>
          <h2 className="mt-4 font-display text-4xl text-white">Kept for {wish.recipient}</h2>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gold-soft">The night can play again, or you can go back.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={onBack} className="rounded-full border border-gold/40 px-5 py-3 text-sm text-gold">
              Back
            </button>
            <button type="button" onClick={replay} className="rounded-full bg-gold px-5 py-3 text-sm text-navy">
              Play again
            </button>
          </div>
        </div>
      ) : slide ? (
        <>
          <WishSlide slide={slide} progress={progress} paused={paused} />

          <button
            type="button"
            aria-label="Previous"
            className="absolute inset-y-0 left-0 z-10 w-[34%] cursor-pointer"
            onPointerDown={onZonePointerDown}
            onPointerUp={() => finishHold('prev')}
            onPointerCancel={onPointerCancelHold}
          >
            <span className="pointer-events-none absolute top-1/2 left-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-2xl text-white lg:flex">
              ‹
            </span>
          </button>
          <button
            type="button"
            aria-label="Next"
            className="absolute inset-y-0 right-0 z-10 w-[66%] cursor-pointer"
            onPointerDown={onZonePointerDown}
            onPointerUp={() => finishHold('next')}
            onPointerCancel={onPointerCancelHold}
          >
            <span className="pointer-events-none absolute top-1/2 right-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-2xl text-white lg:flex">
              ›
            </span>
          </button>

          <div data-wish-ui="chrome" className="absolute inset-x-0 top-0 z-20 px-3 pt-[max(0.7rem,env(safe-area-inset-top))]">
            <StoryProgress count={wish.slides.length} index={index} progress={progress} />
            <div className="mt-3 flex items-center justify-between text-[11px] tracking-wide text-white/80">
              <button
                type="button"
                onClick={onBack}
                className="rounded-full border border-white/20 px-3 py-1 text-gold-soft"
              >
                Back
              </button>
              <p>
                {paused
                  ? 'Paused'
                  : index === 0
                    ? 'Tap right for next'
                    : index === lastIndex
                      ? 'Tap left for previous'
                      : 'Tap left or right'}
              </p>
            </div>
          </div>
          <EmojiReactions paused={paused} autoRain={slide.type === 'celebrate' || slide.type === 'toast'} />
        </>
      ) : null}
    </div>
  )
}
