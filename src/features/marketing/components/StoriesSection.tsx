import { PageContainer } from '@/shared/layout/PageContainer.tsx'
import { demoStories } from '@/features/marketing/data/demo.ts'

export function StoriesSection() {
  return (
    <section className="bg-cream">
      <PageContainer width="wide" className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Kept, then reopened</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">What it feels like to receive one</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {demoStories.map((story) => (
            <blockquote key={story.name} className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
              <img src={story.image} alt="" className="h-56 w-full object-cover" />
              <div className="p-7">
                <p className="font-display text-2xl leading-snug text-navy">“{story.quote}”</p>
                <footer className="mt-6 text-sm text-navy-muted">
                  <span className="font-medium text-navy">{story.name}</span>
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
