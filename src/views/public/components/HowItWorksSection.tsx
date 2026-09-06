import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { howItWorksImages } from '@/views/public/data/demo.ts'

const steps = [
  {
    number: '01',
    title: 'Choose an occasion',
    body: 'Birthday, anniversary, Raksha Bandhan, Bhai Phota — or another celebration that deserves more than a text.',
  },
  {
    number: '02',
    title: 'Personalize every detail',
    body: 'Names, titles, a private letter, photographs and a song. The template holds the form; you give it meaning.',
  },
  {
    number: '03',
    title: 'Share a private moment',
    body: 'Send a unique link when you are ready. They open it once, then keep it — a room they can walk back into.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-white">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">How it works</p>
        <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Three quiet steps</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.number} className="overflow-hidden rounded-3xl border border-line/80 bg-cream">
              <img src={howItWorksImages[index]} alt="" className="h-40 w-full object-cover" />
              <div className="p-7">
                <p className="font-display text-3xl text-gold">{step.number}</p>
                <h3 className="mt-2 font-display text-2xl text-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-navy-muted">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
