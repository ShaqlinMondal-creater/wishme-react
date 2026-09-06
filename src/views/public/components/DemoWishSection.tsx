import { Link } from 'react-router-dom'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { ROUTES } from '@/shared/constants/routes.ts'
import { demoWish } from '@/views/public/data/demo.ts'

export function DemoWishSection() {
  return (
    <section className="bg-cream">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">A demo wish</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Open it the way they would</h2>
          <p className="mt-4 text-navy-muted leading-7">
            This is a sample keepsake for {demoWish.recipient}. Names, photographs, a song and a
            private letter — the shape of every WISHME you make.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-line bg-white shadow-card lg:grid lg:grid-cols-2">
          <div className="relative min-h-72">
            <img
              src={demoWish.photos[0].src}
              alt={demoWish.photos[0].alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">{demoWish.occasion}</p>
              <p className="mt-2 font-display text-3xl text-white sm:text-4xl">For {demoWish.recipient}</p>
              <p className="mt-1 text-sm text-gold-soft">
                From {demoWish.from} · {demoWish.date}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <p className="font-display text-2xl leading-snug text-navy sm:text-3xl">
              “{demoWish.message}”
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {demoWish.photos.slice(1).map((photo) => (
                <img
                  key={photo.alt}
                  src={photo.src}
                  alt={photo.alt}
                  className="h-32 w-full rounded-2xl object-cover sm:h-40"
                />
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-ivory px-4 py-3">
              <div>
                <p className="text-[10px] tracking-[0.18em] text-gold-deep uppercase">Now playing</p>
                <p className="mt-1 text-sm text-navy">{demoWish.song}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-gold" aria-hidden="true">
                <PlayIcon />
              </span>
            </div>
            <Link
              to={ROUTES.createProject}
              className={getButtonClasses({ className: 'mt-8 w-full sm:w-auto', size: 'lg' })}
            >
              Make one like this
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px" fill="currentColor" aria-hidden="true">
      <path d="M8 5.8v12.4L19 12 8 5.8Z" />
    </svg>
  )
}
