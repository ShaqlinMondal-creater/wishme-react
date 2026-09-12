import { Starfield } from '@/views/wish/components/Starfield.tsx'
import { WaxSeal } from '@/views/wish/components/WaxSeal.tsx'
import { WishMedia } from '@/views/wish/components/WishMedia.tsx'
import { EditPencil } from '@/views/wish/components/EditPencil.tsx'
import type { WishRoomId } from '@/shared/types/templateContent.ts'
import type { DemoWish } from '@/views/wish/data/demoWishes.ts'
import { useWishEditor } from '@/views/wish/content/WishEditorContext.tsx'
import { fillContentVars } from '@/views/wish/content/mergeContent.ts'
import { ALL_TEMPLATE_ROOMS } from '@/shared/lib/templateDisplay.ts'
import { cn } from '@/shared/lib/cn.ts'

type WishHubProps = {
  wish: DemoWish
  opened: Set<WishRoomId>
  onOpen: (id: WishRoomId) => void
  onBack: () => void
}

export function WishHub({ wish, opened, onOpen, onBack }: WishHubProps) {
  const editor = useWishEditor()
  const rooms = editor?.content.rooms
  const enabled = new Set(editor?.enabledRooms ?? ALL_TEMPLATE_ROOMS)
  const cards = [
    { id: 'letter' as const, room: rooms?.letter },
    { id: 'stories' as const, room: rooms?.stories },
    { id: 'moments' as const, room: rooms?.moments },
    { id: 'privacy' as const, room: rooms?.privacy },
    { id: 'gifts' as const, room: rooms?.gifts },
  ].filter(({ id, room }) => room && enabled.has(id))
  const recipient = editor?.content.gate.recipient ?? wish.recipient
  const from = editor?.content.gate.from ?? wish.from
  const intro = fillContentVars(
    editor?.content.hub.intro ?? 'From {from}. A private night in {count} pieces. Open them as you would a box left on the table.',
    { from, count: cards.length },
  )
  const cover = editor?.content.hub.cover
  const done = [...opened].filter((id) => enabled.has(id)).length

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#070f1c]">
      {cover ? (
        <WishMedia src={cover} className="absolute inset-0 h-full w-full object-cover opacity-55" />
      ) : null}
      {editor?.enabled ? (
        <EditPencil label="Hub background" onClick={() => editor.onEdit('hub.cover', 'Hub background', 'media')} />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-b from-navy/50 via-navy/55 to-[#070f1c]" />
      <Starfield />
      <div className="wish-grain" />

      <div className="relative flex min-h-0 flex-1 flex-col px-3 pt-[max(0.7rem,env(safe-area-inset-top))] pb-[max(0.8rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-10">
        <div className="flex shrink-0 flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-gold/30 bg-black/20 px-3 py-1.5 text-xs tracking-wide text-gold-soft"
            >
              ← Back
            </button>
            <p className="mt-3 text-[10px] tracking-[0.32em] text-gold uppercase sm:text-[11px]">{wish.templateName}</p>
            <h1 className="mt-1 font-display text-[2rem] leading-none text-white sm:text-4xl lg:text-5xl">
              For {recipient}
            </h1>
            <div className="relative max-w-xl">
              <p className="mt-2 text-xs leading-5 text-gold-soft sm:text-sm sm:leading-6">{intro}</p>
              {editor?.enabled ? (
                <EditPencil label="Hub intro" onClick={() => editor.onEdit('hub.intro', 'Hub intro', 'textarea')} />
              ) : null}
            </div>
          </div>
          <p className="text-[11px] tracking-[0.16em] text-white/55">
            {done} of {cards.length} opened
          </p>
        </div>

        <div className={cn(
          'mt-3 grid min-h-0 flex-1 gap-2 sm:mt-5 sm:gap-3 lg:gap-5',
          cards.length >= 5 && 'grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2',
          cards.length === 4 && 'grid-cols-2 grid-rows-2',
          cards.length === 3 && 'grid-cols-1 sm:grid-cols-3',
          cards.length === 2 && 'grid-cols-1 sm:grid-cols-2',
          cards.length <= 1 && 'grid-cols-1',
        )}>
          {cards.length === 0 ? (
            <p className="self-center text-sm text-gold-soft">No rooms are on for this template.</p>
          ) : null}
          {cards.map(({ id, room }, index) => {
            if (!room) {
              return null
            }

            const wide = id === 'gifts' && cards.length >= 5
            const seen = opened.has(id)
            return (
              <article
                key={id}
                role="button"
                tabIndex={0}
                onClick={() => onOpen(id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onOpen(id)
                  }
                }}
                className={cn(
                  'wish-card-in group relative min-h-0 cursor-pointer overflow-hidden rounded-2xl text-left sm:rounded-[1.4rem]',
                  'shadow-[0_18px_40px_-24px_rgb(0_0_0_/_0.8)] ring-1 ring-gold/40',
                  wide && 'col-span-2 lg:col-span-2',
                )}
                style={{ animationDelay: `${80 + index * 90}ms` }}
              >
                <WishMedia
                  src={room.cover}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-active:scale-105"
                />
                {editor?.enabled ? (
                  <EditPencil
                    label={`${room.title} cover`}
                    onClick={() => editor.onEdit(`rooms.${id}.cover`, `${room.title} cover`, 'media')}
                  />
                ) : null}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
                <div className="absolute inset-px rounded-[0.9rem] ring-1 ring-white/10 sm:rounded-[1.32rem]" />
                <div className="relative flex h-full flex-col justify-end p-3 sm:p-4 lg:p-5">
                  <p className="text-[9px] tracking-[0.22em] text-gold uppercase sm:text-[10px]">{room.kicker}</p>
                  <p className="mt-0.5 font-display text-xl leading-none text-white sm:text-[1.65rem] lg:text-3xl">
                    {room.title}
                  </p>
                  <p className="mt-1 hidden text-[12px] leading-5 text-gold-soft/90 sm:block">{room.hint}</p>
                  {editor?.enabled ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-full bg-gold px-2 py-0.5 text-[10px] text-navy"
                        onClick={(event) => {
                          event.stopPropagation()
                          editor.onEdit(`rooms.${id}.kicker`, `${room.title} kicker`, 'text')
                        }}
                      >
                        Kicker
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-gold px-2 py-0.5 text-[10px] text-navy"
                        onClick={(event) => {
                          event.stopPropagation()
                          editor.onEdit(`rooms.${id}.title`, `${room.title} title`, 'text')
                        }}
                      >
                        Title
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-gold px-2 py-0.5 text-[10px] text-navy"
                        onClick={(event) => {
                          event.stopPropagation()
                          editor.onEdit(`rooms.${id}.hint`, `${room.title} hint`, 'text')
                        }}
                      >
                        Hint
                      </button>
                    </div>
                  ) : (
                    <span
                      className={cn(
                        'mt-2 w-fit rounded-full px-2 py-0.5 text-[9px] tracking-[0.14em] uppercase sm:mt-2.5 sm:px-2.5 sm:text-[10px]',
                        seen ? 'bg-gold text-navy' : 'border border-gold/50 text-gold',
                      )}
                    >
                      {seen ? 'Opened' : 'Sealed'}
                    </span>
                  )}
                </div>
                {id === 'letter' && !seen && !editor?.enabled ? (
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <WaxSeal className="h-8 w-8 sm:h-9 sm:w-9" />
                  </span>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
