import letterCover from '@/assets/wish/midnight/midnight-letter.png'
import storiesCover from '@/assets/wish/midnight/midnight-glasses.png'
import momentsCover from '@/assets/wish/midnight/midnight-cake.png'
import privacyCover from '@/assets/wish/midnight/midnight-clock.png'
import giftCover from '@/assets/wish/midnight/midnight-gift.png'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'

const rooms = [
  {
    number: '01',
    title: 'Letter',
    body: 'The first door. A private note in your voice, with their name where it belongs.',
    image: letterCover,
    alt: 'A sealed letter, a candle and a fountain pen',
  },
  {
    number: '02',
    title: 'Stories',
    body: 'What you remember together — lines that would never survive a group chat.',
    image: storiesCover,
    alt: 'Two gold-rimmed glasses in candlelight',
  },
  {
    number: '03',
    title: 'Moments',
    body: 'Photographs and film, held still. The terrace light. The drive. The cake.',
    image: momentsCover,
    alt: 'A small cream cake with a single gold candle',
  },
  {
    number: '04',
    title: 'Privacy',
    body: 'A room only they can open. The wish is not a post. It is for one person.',
    image: privacyCover,
    alt: 'A gold clock at midnight beside a candle',
  },
  {
    number: '05',
    title: 'Surprise gift',
    body: 'Something waiting at the end — a last door, after they have walked through the rest.',
    image: giftCover,
    alt: 'A cream gift with a gold ribbon',
  },
]

export function RoomsSection() {
  return (
    <section className="scroll-mt-24 border-y border-line/80 bg-ivory">
      <PageContainer width="wide" className="py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Inside a wish</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-5xl">Five rooms, one person</h2>
          <p className="mt-4 text-navy-muted leading-7">
            Every template is a small house. You choose which doors are open. They walk through them
            in their own time.
          </p>
          <p className="mt-5 hidden flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.18em] text-gold-deep uppercase sm:flex">
            {rooms.map((room, index) => (
              <span key={room.number} className="flex items-center gap-2">
                {index > 0 ? <span className="h-px w-5 bg-gold/70" aria-hidden="true" /> : null}
                {room.title}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pb-0 lg:snap-none">
          {rooms.map((room) => (
            <article
              key={room.title}
              className="group flex w-[min(17.5rem,78vw)] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-soft lg:w-auto lg:min-w-0"
            >
              <div className="relative h-52 overflow-hidden sm:h-56 lg:h-60">
                <img
                  src={room.image}
                  alt={room.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[10px] tracking-[0.2em] text-gold uppercase">{room.number}</p>
                  <h3 className="mt-1 font-display text-2xl leading-tight text-white">{room.title}</h3>
                </div>
              </div>
              <p className="flex-1 p-5 text-sm leading-6 text-navy-muted">{room.body}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
