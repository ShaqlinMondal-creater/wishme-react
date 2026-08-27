import { PageContainer } from '@/components/layout/PageContainer.tsx'

const steps = [
  {
    number: '01',
    title: 'Choose an occasion',
    body: 'Birthday, anniversary, Raksha Bandhan, Bhai Phota — or another celebration that deserves more than a text.',
  },
  {
    number: '02',
    title: 'Personalize every detail',
    body: 'Names, titles, messages, photographs, video and music. The template holds the form; you give it meaning.',
  },
  {
    number: '03',
    title: 'Share a private moment',
    body: 'Publish when you are ready. A unique link, QR, optional password and schedule will follow in later phases.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-cream">
      <PageContainer width="wide" className="py-20">
        <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">How it works</p>
        <h2 className="mt-3 font-display text-4xl text-navy">Three quiet steps</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="rounded-3xl bg-white p-7 shadow-soft">
              <p className="font-display text-3xl text-gold">{step.number}</p>
              <h3 className="mt-4 font-display text-2xl text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-navy-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
