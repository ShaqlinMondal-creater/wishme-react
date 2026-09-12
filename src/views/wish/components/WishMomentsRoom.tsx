import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { RoomFrame } from '@/views/wish/components/RoomFrame.tsx'
import { WishMedia } from '@/views/wish/components/WishMedia.tsx'
import { EditPencil } from '@/views/wish/components/EditPencil.tsx'
import { wishMoments } from '@/views/wish/data/midnightToastRooms.ts'
import { useWishEditor } from '@/views/wish/content/WishEditorContext.tsx'

type WishMomentsRoomProps = {
  onBack: () => void
}

const tilts = [-2.4, 1.8, -1.2, 2.1, -1.6]

export function WishMomentsRoom({ onBack }: WishMomentsRoomProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const editor = useWishEditor()
  const intro = editor?.content.rooms.moments.intro ?? 'Polaroids from the night — a photograph, a time, a sentence he would not send in a chat.'
  const items = editor?.content.rooms.moments.items ?? wishMoments

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
    <RoomFrame kicker="Kept" title={editor?.content.rooms.moments.title ?? 'Moments'} onBack={onBack}>
      <div className="relative mb-5 max-w-2xl">
        <p className="text-sm leading-6 text-gold-soft">{intro}</p>
        {editor?.enabled ? (
          <EditPencil label="Moments intro" onClick={() => editor.onEdit('rooms.moments.intro', 'Moments intro', 'textarea')} />
        ) : null}
      </div>
      <div ref={gridRef} className="grid grid-cols-1 gap-5 pb-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map((moment, index) => (
          <article
            key={`${moment.title}-${index}`}
            data-polaroid
            className="wish-polaroid-live group relative w-full cursor-default bg-[#f6f0e6] p-2.5 pb-4 shadow-[0_18px_40px_-22px_rgb(0_0_0_/_0.75)]"
            style={{ ['--tilt' as string]: `${tilts[index] ?? 0}deg` }}
          >
            <div className="relative overflow-hidden bg-navy">
              <WishMedia src={moment.image} className="wish-polaroid-zoom h-44 w-full object-cover sm:h-52 lg:h-56" />
              {editor?.enabled ? (
                <EditPencil
                  label="Moment image"
                  onClick={() => editor.onEdit(`rooms.moments.items.${index}.image`, `${moment.title} image`, 'media')}
                />
              ) : null}
              <span className="absolute top-2 left-2 rounded-sm bg-black/45 px-1.5 py-0.5 text-[10px] tracking-[0.14em] text-gold-soft uppercase">
                {moment.time}
              </span>
            </div>
            <div className="relative px-1 pt-3">
              <p className="font-display text-xl italic text-navy">{moment.title}</p>
              <p className="mt-1 font-display text-[0.95rem] leading-5 text-navy-muted">{moment.body}</p>
              {editor?.enabled ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-navy px-2 py-0.5 text-[10px] text-gold"
                    onClick={() => editor.onEdit(`rooms.moments.items.${index}.title`, 'Moment title', 'text')}
                  >
                    Title
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-navy px-2 py-0.5 text-[10px] text-gold"
                    onClick={() => editor.onEdit(`rooms.moments.items.${index}.body`, 'Moment text', 'textarea')}
                  >
                    Text
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-navy px-2 py-0.5 text-[10px] text-gold"
                    onClick={() => editor.onEdit(`rooms.moments.items.${index}.time`, 'Moment time', 'text')}
                  >
                    Time
                  </button>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </RoomFrame>
  )
}
