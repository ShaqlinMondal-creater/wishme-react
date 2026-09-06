import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import letterImage from '@/assets/auth/login.png'
import giftImage from '@/assets/auth/register.png'
import { supportFaqs, supportTopics } from '@/views/public/data/support.ts'
import { PARENT_BRAND, SUPPORT_EMAIL } from '@/shared/constants/config.ts'
import { ROUTES } from '@/shared/constants/routes.ts'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { Input } from '@/shared/components/ui/Input.tsx'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'

export function SupportPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      return
    }

    const subject = encodeURIComponent(`WISHME support — ${name.trim()}`)
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`)
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <section className="relative overflow-hidden bg-navy">
        <img src={letterImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/70" />
        <PageContainer width="wide" className="relative py-16 sm:py-20 lg:py-24">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Support</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl text-white sm:text-5xl">We are here</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-gold-soft">
            A wish that will not open, an account that needs a quiet hand, or a note about what a
            keepsake should feel like — write to us. A {PARENT_BRAND} experience includes being
            answered.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className={getButtonClasses({ size: 'lg', className: 'mt-8' })}
          >
            Email {SUPPORT_EMAIL}
          </a>
        </PageContainer>
      </section>

      <section className="bg-white">
        <PageContainer width="wide" className="py-14 sm:py-20">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">How we can help</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Three doors, all open</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {supportTopics.map((topic) => (
              <article key={topic.title} className="rounded-3xl border border-line/80 bg-cream p-6 sm:p-7">
                <h3 className="font-display text-2xl text-navy">{topic.title}</h3>
                <p className="mt-3 text-sm leading-6 text-navy-muted">{topic.body}</p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-cream">
        <PageContainer width="wide" className="grid items-start gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Write</p>
            <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">A quieter inbox</h2>
            <p className="mt-4 text-navy-muted leading-7">
              Tell us what happened. We read every note. Most replies go out within one working
              day.
            </p>
            <img
              src={giftImage}
              alt="A gold-ribboned gift"
              className="mt-8 hidden h-64 w-full rounded-[1.75rem] object-cover lg:block"
            />
          </div>

          {sent ? (
            <div className="rounded-[1.75rem] border border-line bg-white p-8 shadow-soft">
              <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Sent</p>
              <h3 className="mt-2 font-display text-3xl text-navy">Your note is ready</h3>
              <p className="mt-3 text-sm leading-6 text-navy-muted">
                Your mail app should have opened to {SUPPORT_EMAIL}. If it did not, write to that
                address yourself — we will still be here.
              </p>
            </div>
          ) : (
            <form
              className="space-y-4 rounded-[1.75rem] border border-line bg-white p-6 shadow-soft sm:p-8"
              onSubmit={onSubmit}
            >
              <Input
                label="Name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className="flex flex-col gap-2 text-left">
                <label htmlFor="support-message" className="text-sm font-medium tracking-wide text-navy">
                  Message
                </label>
                <textarea
                  id="support-message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-base text-navy outline-none transition-shadow duration-200 focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)]"
                />
              </div>
              <button type="submit" className={getButtonClasses({ fullWidth: true })}>
                Send a note
              </button>
            </form>
          )}
        </PageContainer>
      </section>

      <section className="bg-white">
        <PageContainer width="narrow" className="py-14 sm:py-20">
          <p className="text-xs tracking-[0.28em] text-gold-deep uppercase">Questions</p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Often asked</h2>
          <div className="mt-10 space-y-8">
            {supportFaqs.map((item) => (
              <article key={item.question}>
                <h3 className="font-display text-2xl text-navy">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-navy-muted">{item.answer}</p>
              </article>
            ))}
          </div>
          <Link to={ROUTES.templates} className={getButtonClasses({ variant: 'secondary', className: 'mt-10' })}>
            Browse templates
          </Link>
        </PageContainer>
      </section>
    </>
  )
}
