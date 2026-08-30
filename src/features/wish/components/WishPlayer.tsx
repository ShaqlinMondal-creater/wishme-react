import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { EmojiReactions } from '@/features/wish/components/EmojiReactions.tsx'
import { StoryProgress } from '@/features/wish/components/StoryProgress.tsx'
import { WishSlide } from '@/features/wish/components/WishSlide.tsx'
import type { DemoWish } from '@/features/wish/data/demoWishes.ts'

type WishPlayerProps = {
  wish: DemoWish
}

export function WishPlayer({ wish }: WishPlayerProps) {
  const [opened, setOpened] = useState(false)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ended, setEnded] = useState(false)
  const [progress, setProgress] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const elapsedRef = useRef(0)
  const lastRef = useRef<number | null>(null)
  const advancedRef = useRef(false)
  const holdTimerRef = useRef<number | null>(null)
  const didHoldRef = useRef(false)

  const slide = wish.slides[index]
  const durationMs = slide?.durationMs ?? 0

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
      setIndex(nextIndex)
    },
    [wish.slides.length],
  )

  const replay = () => {
    setOpened(true)
    setPaused(false)
    goTo(0)
  }

  useEffect(() => {
    if (!opened || paused || ended || !slide) {
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
  }, [durationMs, ended, goTo, index, opened, paused, slide])

  const clearHold = () => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!opened || ended) {
      return
    }
    if ((event.target as HTMLElement).closest('[data-wish-ui]')) {
      return
    }
    didHoldRef.current = false
    holdTimerRef.current = window.setTimeout(() => {
      didHoldRef.current = true
      setPaused(true)
    }, 150)
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!opened || ended) {
      return
    }
    if ((event.target as HTMLElement).closest('[data-wish-ui]')) {
      return
    }
    clearHold()
    if (didHoldRef.current) {
      setPaused(false)
      return
    }
    const bounds = stageRef.current?.getBoundingClientRect()
    if (!bounds) {
      return
    }
    const x = event.clientX - bounds.left
    if (x < bounds.width * 0.3) {
      goTo(index - 1)
    } else {
      goTo(index + 1)
    }
  }

  const onPointerLeave = () => {
    clearHold()
    if (didHoldRef.current && opened && !ended) {
      setPaused(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-black">
      <div
        ref={stageRef}
        className="relative h-svh w-full overflow-hidden bg-navy select-none md:h-[min(100svh,920px)] md:max-w-[430px] md:rounded-[1.6rem] md:shadow-lift"
        style={{ touchAction: 'manipulation' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerLeave}
        onPointerLeave={onPointerLeave}
        onContextMenu={(event) => event.preventDefault()}
      >
        {!opened ? (
          <Gate wish={wish} onOpen={() => setOpened(true)} />
        ) : ended ? (
          <EndCard wish={wish} onReplay={replay} />
        ) : slide ? (
          <>
            <WishSlide slide={slide} progress={progress} paused={paused} />
            <div className="absolute inset-x-0 top-0 z-20 px-3 pt-[max(0.7rem,env(safe-area-inset-top))]">
              <StoryProgress count={wish.slides.length} index={index} progress={progress} />
              <div className="mt-3 flex items-center justify-between text-[11px] tracking-wide text-white/80">
                <p>
                  {wish.from} · {wish.occasion}
                </p>
                <p>{paused ? 'Paused' : 'Hold to pause'}</p>
              </div>
            </div>
            <EmojiReactions paused={paused} autoRain={slide.type === 'celebrate' || slide.type === 'toast'} />
          </>
        ) : null}
      </div>
    </div>
  )
}

function Gate({ wish, onOpen }: { wish: DemoWish; onOpen: () => void }) {
  return (
    <button
      type="button"
      className="absolute inset-0 flex flex-col items-center justify-center bg-navy px-8 text-center"
      onClick={onOpen}
    >
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">{wish.templateName}</p>
      <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">For {wish.recipient}</h1>
      <p className="mt-3 text-gold-soft">
        From {wish.from} · {wish.occasion}
      </p>
      <p className="mt-10 rounded-full border border-gold/40 px-5 py-2 text-sm text-gold">Tap to open</p>
      <p className="mt-8 max-w-xs text-xs leading-5 text-white/45">
        A private link. It stays open for 72 hours after the wish.
      </p>
    </button>
  )
}

function EndCard({ wish, onReplay }: { wish: DemoWish; onReplay: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy px-8 text-center">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Kept</p>
      <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">For {wish.recipient}</h2>
      <p className="mt-4 max-w-xs text-sm leading-6 text-gold-soft">
        The night can be opened again while the link is still alive.
      </p>
      <button
        type="button"
        onClick={onReplay}
        className="mt-10 rounded-full bg-gold px-6 py-3 text-sm text-navy"
      >
        Play again
      </button>
    </div>
  )
}

export function WishClosed({ reason }: { reason: 'invalid' | 'expired' }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-navy px-6 text-center">
      <div className="max-w-sm">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">WishMe</p>
        <h1 className="mt-4 font-display text-4xl text-white">
          {reason === 'expired' ? 'This wish has closed' : 'This link is not a wish'}
        </h1>
        <p className="mt-4 text-sm leading-7 text-gold-soft">
          {reason === 'expired'
            ? 'A WISHME link stays open for 72 hours after the wishing date and time. Then the door closes.'
            : 'The token does not match a keepsake we can open.'}
        </p>
      </div>
    </div>
  )
}
