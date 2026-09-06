import { useState } from 'react'
import letterImage from '@/assets/wish/midnight/midnight-letter.png'
import { RoomFrame } from '@/views/wish/components/RoomFrame.tsx'
import { WaxSeal } from '@/views/wish/components/WaxSeal.tsx'
import { wishLetter } from '@/views/wish/data/midnightToastRooms.ts'
import { cn } from '@/shared/lib/cn.ts'

type WishLetterRoomProps = {
  onBack: () => void
}

type Phase = 'sealed' | 'opening' | 'opened'

export function WishLetterRoom({ onBack }: WishLetterRoomProps) {
  const [phase, setPhase] = useState<Phase>('sealed')
  const opened = phase === 'opened'

  const openLetter = () => {
    if (phase !== 'sealed') {
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('opened')
      return
    }
    setPhase('opening')
    window.setTimeout(() => setPhase('opened'), 1100)
  }

  return (
    <RoomFrame kicker={opened ? 'Opened' : 'Sealed'} title="Letter" onBack={onBack}>
      {!opened ? (
        <div className="grid h-full min-h-[min(28rem,calc(100svh-8rem))] items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <button
            type="button"
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
            onClick={openLetter}
            disabled={phase === 'opening'}
            aria-label="Open the letter"
          >
            <div className={cn('wish-env', phase === 'opening' && 'is-opening')}>
              <div className="wish-env-body relative aspect-[5/3] w-full rounded-[0.2rem] shadow-[0_28px_60px_-28px_rgb(0_0_0_/_0.75)]">
                <img src={letterImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-linear-to-br from-[#efe2c4] via-[#c9b07a] to-[#8a6a32]" />
                <div className="wish-env-sheet absolute inset-x-[11%] top-[22%] bottom-[10%] overflow-hidden rounded-[0.12rem] bg-[#f4eee4] shadow-inner">
                  <p className="px-4 pt-4 font-display text-lg italic text-navy/70 sm:text-xl">{wishLetter.greeting}</p>
                  <p className="mt-2 hidden px-4 font-display text-sm italic text-navy-muted sm:block">
                    When the city went quiet…
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[46%] bg-linear-to-b from-[#d8c49a] to-[#b8944e] shadow-[0_-8px_18px_-12px_rgb(0_0_0_/_0.35)]" />
                <div className="wish-env-flap absolute inset-x-0 top-0 z-10 h-[58%] origin-top">
                  <div
                    className="absolute inset-0 bg-linear-to-b from-[#efe2c4] via-[#d4b56a] to-[#b0893a]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                  />
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      backgroundImage: `url(${letterImage})`,
                      backgroundSize: 'cover',
                    }}
                  />
                </div>
                <span className="wish-env-seal absolute top-[42%] left-1/2 z-20 -translate-x-1/2">
                  <WaxSeal className="h-16 w-16 lg:h-[5.25rem] lg:w-[5.25rem]" />
                </span>
              </div>
            </div>
          </button>

          <div className="mx-auto max-w-md text-center lg:mx-0 lg:text-left">
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">{wishLetter.date}</p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">For Riya, in his hand</h2>
            <p className="mt-3 text-sm leading-7 text-gold-soft">
              A page he would not send in a chat. Open it once, the way you would a letter left on the table.
            </p>
            <button
              type="button"
              className="wish-seal-cta mt-6 rounded-full border border-gold/50 bg-gold/10 px-6 py-2.5 text-sm tracking-[0.12em] text-gold uppercase"
              onClick={openLetter}
              disabled={phase === 'opening'}
            >
              Open the letter
            </button>
            <p className="mt-3 text-[11px] tracking-wide text-white/40">Written once. Only for you.</p>
          </div>
        </div>
      ) : (
        <article className="wish-paper-lift wish-paper relative mx-auto mt-2 max-w-2xl overflow-hidden rounded-[0.35rem] px-6 py-8 text-navy shadow-[0_20px_50px_-28px_rgb(0_0_0_/_0.65)] sm:px-10 sm:py-12 lg:mt-6">
          <div className="wish-grain opacity-40" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[10px] tracking-[0.22em] text-gold-deep uppercase">{wishLetter.date}</p>
              <WaxSeal className="h-10 w-10 opacity-90" />
            </div>
            <p className="mt-6 font-display text-[2rem] italic">{wishLetter.greeting}</p>
            {wishLetter.body.map((paragraph) => (
              <p key={paragraph} className="mt-5 font-display text-[1.2rem] leading-8 italic text-navy-soft">
                {paragraph}
              </p>
            ))}
            <p className="mt-10 font-display text-lg leading-8 italic whitespace-pre-line text-gold-deep">
              {wishLetter.signoff}
            </p>
          </div>
        </article>
      )}
    </RoomFrame>
  )
}
