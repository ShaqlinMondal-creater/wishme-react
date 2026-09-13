import letterImage from '@/assets/auth/login.png'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { demoPillars } from '@/views/public/data/demo.ts'

export function MemorySection() {
  return (
    <section className="scroll-mt-24 bg-cream">
      <PageContainer width="wide" className="py-16 sm:py-24">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-card lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative h-full min-h-[22rem] sm:min-h-[28rem]">
            <img
              src={letterImage}
              alt="A handwritten letter with a gold wax seal"
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy/50 via-transparent to-navy/10" />
            <p className="absolute inset-x-0 bottom-0 p-7 text-[11px] tracking-[0.22em] text-gold-soft uppercase sm:p-9">
              A letter they can walk back into
            </p>
          </div>

          <div className="flex flex-col justify-between bg-white p-7 sm:p-10 lg:p-12">
            <div>
              <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Why WISHME</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.12] text-navy sm:text-5xl">
                Create a memory, not just a message.
              </h2>
              <p className="mt-5 text-base leading-8 text-navy-muted">
                A forwarded greeting disappears. This is for the birthday, the rakhi, the anniversary
                you want someone to reopen — their name, your words, and the things only you would
                remember.
              </p>
            </div>

            <ul className="mt-10 divide-y divide-line/80 border-t border-line/80">
              {demoPillars.map((pillar, index) => (
                <li key={pillar.title} className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 py-5 first:pt-6 last:pb-0">
                  <p className="font-display text-2xl leading-none text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl leading-none text-navy">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy-muted">{pillar.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
