import { PageContainer } from '@/components/layout/PageContainer.tsx'

export function MemorySection() {
  return (
    <section className="bg-white">
      <PageContainer width="narrow" className="py-20 text-center sm:py-24">
        <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">The idea</p>
        <h2 className="mt-4 font-display text-4xl text-navy sm:text-5xl">
          Create a Memory, Not Just a Message
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        <p className="mt-6 text-base leading-8 text-navy-muted">
          A forwarded greeting disappears. WISHME is for the birthday, the rakhi, the anniversary
          you want someone to reopen — a small, considered world made of their name, your words,
          and the things only you would remember.
        </p>
      </PageContainer>
    </section>
  )
}
