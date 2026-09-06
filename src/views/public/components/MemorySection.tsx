import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { demoPillars } from '@/views/public/data/demo.ts'

export function MemorySection() {
  return (
    <section className="bg-white">
      <PageContainer width="wide" className="py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">The idea</p>
          <h2 className="mt-4 font-display text-3xl text-navy sm:text-4xl lg:text-5xl">
            Create a Memory, Not Just a Message
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
          <p className="mt-6 text-base leading-8 text-navy-muted">
            A forwarded greeting disappears. WISHME is for the birthday, the rakhi, the anniversary
            you want someone to reopen — a small, considered world made of their name, your words,
            and the things only you would remember.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {demoPillars.map((pillar) => (
            <article key={pillar.title} className="overflow-hidden rounded-3xl border border-line/80 bg-cream">
              <img src={pillar.image} alt="" className="h-40 w-full object-cover sm:h-44" />
              <div className="p-6 sm:p-7">
                <h3 className="font-display text-2xl text-navy">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-navy-muted">{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
