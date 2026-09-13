import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { demoStories } from '@/views/public/data/demo.ts'

export function StoriesSection() {
  return (
    <section className="scroll-mt-24 bg-cream">
      <PageContainer width="wide" className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Kept, then reopened</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-5xl">What it feels like to receive one</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {demoStories.map((story) => (
            <blockquote key={story.name} className="group relative isolate min-h-96 overflow-hidden rounded-[1.75rem] shadow-card">
              <img
                src={story.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="relative flex min-h-96 flex-col justify-end p-7 sm:p-8">
                <p className="font-display text-2xl leading-snug text-white">“{story.quote}”</p>
                <footer className="mt-6 text-sm text-gold-soft">
                  <span className="font-medium text-white">{story.name}</span>
                  <span className="mx-2 text-gold">·</span>
                  {story.occasion}
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
