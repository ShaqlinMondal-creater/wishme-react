import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { RoomFrame } from '@/features/wish/components/RoomFrame.tsx'
import { wishMoments } from '@/features/wish/data/midnightToastRooms.ts'

type WishMomentsRoomProps = {
  onBack: () => void
}

const tilts = [-2.4, 1.8, -1.2, 2.1, -1.6]

export function WishMomentsRoom({ onBack }: WishMomentsRoomProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = gridRef.current
    if (!root) {
      return
    }

    const cards = root.querySelectorAll<HTMLElement>('[data-polaroid]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      gsap.from(cards, {
        y: reduced ? 12 : 56,
        opacity: 0,
        rotate: (index) => (reduced ? 0 : tilts[index] ?? 0) * 2.4,
        scale: reduced ? 1 : 0.86,
        duration: reduced ? 0.35 : 0.95,
        stagger: reduced ? 0.04 : 0.14,
        ease: 'back.out(1.5)',
        clearProps: 'transform',
      })
    }, root)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <RoomFrame kicker="Kept" title="Moments" onBack={onBack}>
      <p className="mb-5 max-w-2xl text-sm leading-6 text-gold-soft">
        Polaroids from the night — a photograph, a time, a sentence he would not send in a chat.
      </p>
      <div ref={gridRef} className="grid grid-cols-1 gap-5 pb-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {wishMoments.map((moment, index) => (
          <article
            key={moment.title}
            data-polaroid
            className="wish-polaroid-live group relative w-full cursor-default bg-[#f6f0e6] p-2.5 pb-4 shadow-[0_18px_40px_-22px_rgb(0_0_0_/_0.75)]"
            style={{ ['--tilt' as string]: `${tilts[index] ?? 0}deg` }}
          >
            <div className="relative overflow-hidden bg-navy">
              <img
                src={moment.image}
                alt=""
                className="wish-polaroid-zoom h-44 w-full object-cover sm:h-52 lg:h-56"
              />
              <span className="absolute top-2 right-2 rounded-sm bg-black/45 px-1.5 py-0.5 text-[10px] tracking-[0.14em] text-gold-soft uppercase">
                {moment.time}
              </span>
            </div>
            <div className="px-1 pt-3">
              <p className="font-display text-xl italic text-navy">{moment.title}</p>
              <p className="mt-1 font-display text-[0.95rem] leading-5 text-navy-muted">{moment.body}</p>
            </div>
          </article>
        ))}
      </div>
    </RoomFrame>
  )
}
