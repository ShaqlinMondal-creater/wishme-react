import glasses from '@/assets/wish/midnight/midnight-glasses.png'
import { useState } from 'react'
import { Starfield } from '@/views/wish/components/Starfield.tsx'
import { WaxSeal } from '@/views/wish/components/WaxSeal.tsx'
import { WishGiftRoom } from '@/views/wish/components/WishGiftRoom.tsx'
import { WishHub } from '@/views/wish/components/WishHub.tsx'
import { WishLetterRoom } from '@/views/wish/components/WishLetterRoom.tsx'
import { WishMomentsRoom } from '@/views/wish/components/WishMomentsRoom.tsx'
import { WishPlayer } from '@/views/wish/components/WishPlayer.tsx'
import { WishPrivacyRoom } from '@/views/wish/components/WishPrivacyRoom.tsx'
import type { DemoWish } from '@/views/wish/data/demoWishes.ts'
import type { WishRoomId } from '@/views/wish/data/midnightToastRooms.ts'

type WishShellProps = {
  wish: DemoWish
}

type View = 'gate' | 'hub' | WishRoomId

export function WishShell({ wish }: WishShellProps) {
  const [view, setView] = useState<View>('gate')
  const [opened, setOpened] = useState<Set<WishRoomId>>(new Set())

  const openRoom = (id: WishRoomId) => {
    setOpened((current) => new Set(current).add(id))
    setView(id)
  }

  const backToHub = () => setView('hub')

  return (
    <div className="relative min-h-svh w-full bg-[#070f1c]">
      <div className="relative h-svh w-full overflow-hidden">
        {view === 'gate' ? (
          <Gate wish={wish} onOpen={() => setView('hub')} />
        ) : null}
        {view === 'hub' ? (
          <WishHub wish={wish} opened={opened} onOpen={openRoom} onBack={() => setView('gate')} />
        ) : null}
        {view === 'letter' ? <WishLetterRoom onBack={backToHub} /> : null}
        {view === 'stories' ? <WishPlayer wish={wish} onBack={backToHub} /> : null}
        {view === 'moments' ? <WishMomentsRoom onBack={backToHub} /> : null}
        {view === 'privacy' ? <WishPrivacyRoom onBack={backToHub} /> : null}
        {view === 'gifts' ? <WishGiftRoom onBack={backToHub} /> : null}
      </div>
    </div>
  )
}

function Gate({ wish, onOpen }: { wish: DemoWish; onOpen: () => void }) {
  return (
    <button
      type="button"
      className="absolute inset-0 overflow-hidden"
      onClick={onOpen}
      aria-label={`Open the night for ${wish.recipient}`}
    >
      <img
        src={glasses}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-[62%_center]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-navy/35 to-[#070f1c] lg:bg-linear-to-r lg:from-[#070f1c]/90 lg:via-[#070f1c]/45 lg:to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#070f1c] via-transparent to-transparent lg:hidden" />
      <Starfield />
      <div className="wish-grain" />

      <div className="relative flex h-full items-end justify-center px-5 pb-[max(1.4rem,env(safe-area-inset-bottom))] sm:px-8 lg:items-center lg:justify-start lg:px-16 lg:pb-0 xl:px-24">
        <div className="w-full max-w-md rounded-[1.6rem] border border-gold/20 bg-black/25 px-5 py-6 text-center backdrop-blur-md sm:px-7 sm:py-8 lg:max-w-lg lg:bg-black/20 lg:text-left lg:backdrop-blur-sm">
          <div className="wish-rise flex justify-center lg:justify-start">
            <WaxSeal className="h-16 w-16 lg:h-[4.5rem] lg:w-[4.5rem]" />
          </div>
          <p className="wish-rise mt-5 text-[11px] tracking-[0.34em] text-gold uppercase" style={{ animationDelay: '0.08s' }}>
            {wish.templateName}
          </p>
          <p
            className="wish-rise mt-4 font-display text-[1.35rem] leading-8 text-gold-soft italic sm:text-[1.5rem] sm:leading-9"
            style={{ animationDelay: '0.16s' }}
          >
            When the city went quiet, he still wanted to say your name.
          </p>
          <h1
            className="wish-rise mt-5 font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.24s' }}
          >
            For {wish.recipient}
          </h1>
          <p className="wish-rise mt-4 text-sm tracking-wide text-white/75" style={{ animationDelay: '0.32s' }}>
            A private {wish.occasion.toLowerCase()} from {wish.from}
          </p>
          <p
            className="wish-rise mx-auto mt-4 max-w-sm text-sm leading-6 text-gold-soft/90 lg:mx-0"
            style={{ animationDelay: '0.4s' }}
          >
            Not a message. A night made only for you — a sealed letter, stories, the moments he kept, and one gift
            behind gold foil.
          </p>
          <span
            className="wish-rise wish-seal-cta mt-7 inline-flex items-center justify-center rounded-full border border-gold/55 bg-gold/10 px-6 py-2.5 text-sm tracking-[0.14em] text-gold uppercase"
            style={{ animationDelay: '0.5s' }}
          >
            Open the night
          </span>
          <p className="wish-rise mt-4 text-[11px] leading-5 tracking-wide text-white/45" style={{ animationDelay: '0.58s' }}>
            Five rooms. This link is only yours. Open for 72 hours, then the door closes.
          </p>
        </div>
      </div>
    </button>
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
