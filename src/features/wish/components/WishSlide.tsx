import type { ReactNode } from 'react'
import { Starfield } from '@/features/wish/components/Starfield.tsx'
import type { StorySlide } from '@/features/wish/data/storyTypes.ts'
import { cn } from '@/shared/lib/cn.ts'

type WishSlideProps = {
  slide: StorySlide
  progress: number
  paused: boolean
}

export function WishSlide({ slide, progress, paused }: WishSlideProps) {
  if (slide.type === 'clock') {
    return <ClockSlide image={slide.image} progress={progress} paused={paused} />
  }

  if (slide.type === 'letter') {
    return <LetterSlide slide={slide} progress={progress} paused={paused} />
  }

  if (slide.type === 'film') {
    return <FilmSlide images={slide.images} caption={slide.caption} progress={progress} paused={paused} />
  }

  if (slide.type === 'toast') {
    return (
      <CinematicFrame image={slide.image} paused={paused} kenBurns="out">
        <p className="wish-rise text-[11px] tracking-[0.28em] text-gold uppercase">Midnight</p>
        <h2 className="wish-rise mt-3 font-display text-5xl text-white sm:text-6xl" style={{ animationDelay: '0.15s' }}>
          {slide.title}
        </h2>
        {slide.subtitle ? (
          <p className="wish-rise mt-3 text-gold-soft" style={{ animationDelay: '0.28s' }}>
            {slide.subtitle}
          </p>
        ) : null}
        <p className="wish-rise mt-8 text-6xl" style={{ animationDelay: '0.4s' }} aria-hidden="true">
          🥂
        </p>
      </CinematicFrame>
    )
  }

  if (slide.type === 'song') {
    return (
      <CinematicFrame image={slide.image} paused={paused} kenBurns="in">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">{slide.title}</p>
        <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">{slide.track}</h2>
        <div className="mt-10 flex h-16 items-end gap-1.5">
          {Array.from({ length: 14 }, (_, index) => (
            <span
              key={index}
              className={cn('wish-eq-bar w-1.5 rounded-full bg-gold sm:w-2', paused && 'wish-eq-paused')}
              style={{
                height: `${40 + ((index * 17) % 60)}%`,
                animationDelay: `${index * 0.08}s`,
              }}
            />
          ))}
        </div>
      </CinematicFrame>
    )
  }

  if (slide.type === 'celebrate') {
    return (
      <CinematicFrame image={slide.image} paused={paused} kenBurns="out">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">React</p>
        <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">{slide.title}</h2>
        <p className="mt-3 max-w-xs text-sm leading-6 text-gold-soft">
          Tap an emoji below — the way you would on a story. It stays in this night.
        </p>
      </CinematicFrame>
    )
  }

  if (slide.type === 'close') {
    return (
      <CinematicFrame image={slide.image} paused={paused} kenBurns="in">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Midnight Toast</p>
        <h2 className="mt-3 font-display text-5xl text-white sm:text-6xl">{slide.title}</h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-gold-soft">{slide.body}</p>
      </CinematicFrame>
    )
  }

  return (
    <CinematicFrame image={slide.image} paused={paused} kenBurns={slide.kenBurns ?? 'out'}>
      {slide.kicker ? (
        <p className="wish-rise text-[11px] tracking-[0.28em] text-gold uppercase">{slide.kicker}</p>
      ) : null}
      {slide.title ? (
        <h2 className="wish-rise mt-3 font-display text-4xl text-white sm:text-5xl" style={{ animationDelay: '0.12s' }}>
          {slide.title}
        </h2>
      ) : null}
      {slide.subtitle ? (
        <p className="wish-rise mt-3 text-gold-soft" style={{ animationDelay: '0.24s' }}>
          {slide.subtitle}
        </p>
      ) : null}
    </CinematicFrame>
  )
}

function CinematicFrame({
  image,
  kenBurns,
  paused,
  children,
}: {
  image: string
  kenBurns: 'in' | 'out'
  paused: boolean
  children: ReactNode
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Starfield paused={paused} />
      <img
        src={image}
        alt=""
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          kenBurns === 'in' ? 'wish-ken-in' : 'wish-ken-out',
          paused && 'wish-ken-paused',
        )}
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/35 to-navy/15" />
      <Sparkles paused={paused} />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-28 pt-16 sm:px-8">{children}</div>
    </div>
  )
}

function LetterSlide({
  slide,
  progress,
  paused,
}: {
  slide: Extract<StorySlide, { type: 'letter' }>
  progress: number
  paused: boolean
}) {
  const full = slide.lines.join('\n\n')
  const shown = full.slice(0, Math.max(1, Math.floor(progress * full.length)))

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={slide.image}
        alt=""
        className={cn('absolute inset-0 h-full w-full object-cover wish-ken-in', paused && 'wish-ken-paused')}
      />
      <div className="absolute inset-0 bg-navy/78" />
      <div className="absolute inset-x-0 top-[18%] px-6 sm:px-8">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">A letter</p>
        <p className="mt-6 font-display text-[1.65rem] leading-snug whitespace-pre-wrap text-gold-soft sm:text-3xl">
          {shown}
          <span className="animate-pulse text-gold">|</span>
        </p>
        {slide.signoff && progress > 0.72 ? (
          <p className="wish-rise mt-8 text-sm tracking-wide text-gold">{slide.signoff}</p>
        ) : null}
      </div>
    </div>
  )
}

function FilmSlide({
  images,
  caption,
  progress,
  paused,
}: {
  images: string[]
  caption?: string
  progress: number
  paused: boolean
}) {
  const index = Math.min(images.length - 1, Math.floor(progress * images.length))

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      {images.map((src, item) => (
        <img
          key={src}
          src={src}
          alt=""
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            item === index ? 'opacity-100' : 'opacity-0',
            item === index && (item % 2 === 0 ? 'wish-ken-out' : 'wish-ken-in'),
            paused && 'wish-ken-paused',
          )}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-navy/20" />
      {caption ? (
        <p className="absolute bottom-28 left-6 font-display text-4xl text-white sm:left-8 sm:text-5xl">{caption}</p>
      ) : null}
    </div>
  )
}

function ClockSlide({ image, progress, paused }: { image: string; progress: number; paused: boolean }) {
  const struck = progress > 0.62

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={image}
        alt=""
        className={cn('absolute inset-0 h-full w-full object-cover wish-ken-in', paused && 'wish-ken-paused')}
      />
      <div className="absolute inset-0 bg-navy/55" />
      <div className={cn('wish-gold-flash pointer-events-none absolute inset-0 bg-gold', paused && 'wish-ken-paused')} />
      <div className="absolute inset-x-0 top-[18%] flex flex-col items-center px-6">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Almost midnight</p>
        <div className="relative mt-8 h-40 w-40 rounded-full border border-gold/50 sm:h-48 sm:w-48">
          <span
            className={cn(
              'wish-clock-hour absolute top-1/2 left-1/2 h-[22%] w-[3px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-gold',
              paused && 'wish-ken-paused',
            )}
          />
          <span
            className={cn(
              'wish-clock-minute absolute top-1/2 left-1/2 h-[32%] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-gold-soft',
              paused && 'wish-ken-paused',
            )}
          />
          <span className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
        </div>
        <h2 className="mt-8 font-display text-5xl text-white sm:text-6xl">{struck ? 'It’s time' : '11:59'}</h2>
        <p className="mt-3 text-gold-soft">{struck ? 'Happy birthday, Riya' : 'Hold still'}</p>
      </div>
    </div>
  )
}

function Sparkles({ paused }: { paused: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {SPARK_SPOTS.map((spot) => (
        <span
          key={spot.id}
          className={cn('wish-spark absolute h-1 w-1 rounded-full bg-gold-soft', paused && 'wish-ken-paused')}
          style={{ left: spot.left, top: spot.top, animationDelay: spot.delay }}
        />
      ))}
    </div>
  )
}

const SPARK_SPOTS = [
  { id: 1, left: '12%', top: '18%', delay: '0s' },
  { id: 2, left: '78%', top: '22%', delay: '0.4s' },
  { id: 3, left: '88%', top: '48%', delay: '0.9s' },
  { id: 4, left: '16%', top: '62%', delay: '1.2s' },
  { id: 5, left: '64%', top: '14%', delay: '1.6s' },
  { id: 6, left: '42%', top: '28%', delay: '0.2s' },
]
