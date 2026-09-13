import { Link } from 'react-router-dom'
import occasionImage from '@/assets/home/occasion-rakhi.png'
import fillImage from '@/assets/home/story-meher.png'
import receiveImage from '@/assets/home/story-ananya.png'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'

const steps = [
  {
    number: '01',
    title: 'Choose the moment',
    body: 'Birthday, anniversary, Raksha Bandhan, Bhai Phota — then a template that already knows the rooms.',
    image: occasionImage,
    alt: 'A rakhi on silk beside a brass thali',
    focus: 'object-[center_70%]',
  },
  {
    number: '02',
    title: 'Fill it with them',
    body: 'Their name, your letter, photographs, a song, a gift. The template holds the form. You give it meaning.',
    image: fillImage,
    alt: 'Hands placing a photograph into a keepsake',
    focus: 'object-[center_45%]',
  },
  {
    number: '03',
    title: 'Send a private door',
    body: 'A unique link, when you are ready. They open it once, then keep it — a room they can walk back into.',
    image: receiveImage,
    alt: 'Someone opening a private wish on their phone',
    focus: 'object-[center_40%]',
  },
]

export function HowItWorksSection() {
  return (
    <section className="scroll-mt-24 bg-white">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">How it works</p>
          <Link
            to={ROUTES.templates}
            className="text-[11px] tracking-[0.18em] text-gold-deep uppercase transition-colors hover:text-navy"
          >
            Begin a wish
          </Link>
        </div>
        <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Three quiet steps</h2>
        <p className="mt-4 hidden items-center gap-2 text-[11px] tracking-[0.18em] text-gold-deep uppercase sm:flex">
          {steps.map((step, index) => (
            <span key={step.number} className="flex items-center gap-2">
              {index > 0 ? <span className="h-px w-5 bg-gold/70" aria-hidden="true" /> : null}
              {step.title}
            </span>
          ))}
        </p>

        <ol className="mt-8 grid auto-rows-fr gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-ivory shadow-soft">
              <div className="relative h-44 overflow-hidden sm:h-48">
                <img
                  src={step.image}
                  alt={step.alt}
                  className={`h-full w-full object-cover ${step.focus}`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[10px] tracking-[0.2em] text-gold uppercase">{step.number}</p>
                  <h3 className="mt-1 font-display text-2xl leading-tight text-white sm:text-[1.65rem]">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="flex-1 px-4 py-4 text-sm leading-6 text-navy-muted sm:px-5">{step.body}</p>
            </li>
          ))}
        </ol>
      </PageContainer>
    </section>
  )
}
