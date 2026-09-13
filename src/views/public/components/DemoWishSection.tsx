import { Link } from 'react-router-dom'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { demoPath, MIDNIGHT_TOAST_SLUG, ROUTES } from '@/shared/constants/routes.ts'
import { demoWish } from '@/views/public/data/demo.ts'

export function DemoWishSection() {
  return (
    <section className="scroll-mt-24 bg-white">
      <PageContainer width="wide" className="py-16 sm:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">A sample wish</p>
            <h2 className="mt-3 font-display text-3xl text-navy sm:text-5xl">Open it the way they would</h2>
            <p className="mt-4 max-w-xl text-navy-muted leading-7">
              A keepsake for {demoWish.recipient} — names, photographs, a song and a private letter.
              This is the shape of every WISHME you make.
            </p>
          </div>
          <Link
            to={demoPath(MIDNIGHT_TOAST_SLUG)}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonClasses({ variant: 'secondary', size: 'sm', className: 'shrink-0' })}
          >
            Open Midnight Toast
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-ivory shadow-card lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-80 lg:min-h-[32rem]">
            <img
              src={demoWish.photos[0].src}
              alt={demoWish.photos[0].alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">{demoWish.occasion}</p>
              <p className="mt-2 font-display text-4xl text-white sm:text-5xl">For {demoWish.recipient}</p>
              <p className="mt-2 text-sm text-gold-soft">
                From {demoWish.from} · {demoWish.date}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-white p-7 sm:p-10">
            <div>
              <p className="font-display text-2xl leading-snug text-navy sm:text-3xl">
                “{demoWish.message}”
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {demoWish.photos.slice(1).map((photo) => (
                  <img
                    key={photo.alt}
                    src={photo.src}
                    alt={photo.alt}
                    className="h-36 w-full rounded-2xl object-cover sm:h-44"
                  />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-ivory px-4 py-3">
                <div>
                  <p className="text-[10px] tracking-[0.18em] text-gold-deep uppercase">Now playing</p>
                  <p className="mt-1 text-sm text-navy">{demoWish.song}</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold" aria-hidden="true">
                  <PlayIcon />
                </span>
              </div>
              <Link
                to={ROUTES.templates}
                className={getButtonClasses({ className: 'mt-6 w-full', size: 'lg' })}
              >
                Make one like this
              </Link>
            </div>
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
