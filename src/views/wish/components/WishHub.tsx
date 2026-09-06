import glasses from '@/assets/wish/midnight/midnight-glasses.png'
import { Starfield } from '@/views/wish/components/Starfield.tsx'
import { WaxSeal } from '@/views/wish/components/WaxSeal.tsx'
import { wishRooms, type WishRoomId } from '@/views/wish/data/midnightToastRooms.ts'
import type { DemoWish } from '@/views/wish/data/demoWishes.ts'
import { cn } from '@/shared/lib/cn.ts'

type WishHubProps = {
  wish: DemoWish
  opened: Set<WishRoomId>
  onOpen: (id: WishRoomId) => void
  onBack: () => void
}

export function WishHub({ wish, opened, onOpen, onBack }: WishHubProps) {
  const done = opened.size

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#070f1c]">
      <img src={glasses} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
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
              For {wish.recipient}
            </h1>
            <p className="mt-2 max-w-xl text-xs leading-5 text-gold-soft sm:text-sm sm:leading-6">
              From {wish.from}. A private night in five pieces. Open them as you would a box left on the table.
            </p>
          </div>
          <p className="text-[11px] tracking-[0.16em] text-white/55">
            {done} of {wishRooms.length} opened
          </p>
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 grid-rows-3 gap-2 sm:mt-5 sm:gap-3 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          {wishRooms.map((room, index) => {
            const wide = room.id === 'gifts'
            const seen = opened.has(room.id)
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onOpen(room.id)}
                className={cn(
                  'wish-card-in group relative min-h-0 overflow-hidden rounded-2xl text-left sm:rounded-[1.4rem]',
                  'shadow-[0_18px_40px_-24px_rgb(0_0_0_/_0.8)] ring-1 ring-gold/40',
                  wide && 'col-span-2 lg:col-span-2',
                )}
                style={{ animationDelay: `${80 + index * 90}ms` }}
              >
                <img
                  src={room.cover}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
                <div className="absolute inset-px rounded-[0.9rem] ring-1 ring-white/10 sm:rounded-[1.32rem]" />
                <div className="relative flex h-full flex-col justify-end p-3 sm:p-4 lg:p-5">
                  <p className="text-[9px] tracking-[0.22em] text-gold uppercase sm:text-[10px]">{room.kicker}</p>
                  <p className="mt-0.5 font-display text-xl leading-none text-white sm:text-[1.65rem] lg:text-3xl">
                    {room.title}
                  </p>
                  <p className="mt-1 hidden text-[12px] leading-5 text-gold-soft/90 sm:block">{room.hint}</p>
                  <span
                    className={cn(
                      'mt-2 w-fit rounded-full px-2 py-0.5 text-[9px] tracking-[0.14em] uppercase sm:mt-2.5 sm:px-2.5 sm:text-[10px]',
                      seen ? 'bg-gold text-navy' : 'border border-gold/50 text-gold',
                    )}
                  >
                    {seen ? 'Opened' : 'Sealed'}
                  </span>
                </div>
                {room.id === 'letter' && !seen ? (
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <WaxSeal className="h-8 w-8 sm:h-9 sm:w-9" />
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
