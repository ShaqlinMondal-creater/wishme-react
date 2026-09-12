import { type FormEvent, useEffect, useState } from 'react'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { usePricingPlans } from '@/shared/hooks/usePricingPlans.ts'
import { cn } from '@/shared/lib/cn.ts'
import type { PricingPlan } from '@/shared/types/pricing.ts'

export function AdminPlansPage() {
  const plansQuery = usePricingPlans()
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [editing, setEditing] = useState<PricingPlan | null>(null)

  useEffect(() => {
    if (plansQuery.data) {
      setPlans(plansQuery.data)
    }
  }, [plansQuery.data])

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Subscriptions</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Plans</h1>
      <p className="mt-2 max-w-2xl text-navy-muted">
        How WISHME is sold. Edit a card to change price, copy, or features. Saving here is for this session until the plans API is live.
      </p>

      {plansQuery.isLoading ? (
        <LoadingState label="Loading plans…" />
      ) : plans.length === 0 ? (
        <EmptyState className="mt-8" title="No plans" description="Subscription plans will appear here." />
      ) : (
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onEdit={() => setEditing(plan)} />
          ))}
        </div>
      )}

      <EditPlanModal
        plan={editing}
        onClose={() => setEditing(null)}
        onSave={(next) => {
          setPlans((current) =>
            current.map((plan) => {
              if (plan.id === next.id) {
                return next
              }

              if (next.highlighted) {
                return { ...plan, highlighted: false }
              }

              return plan
            }),
          )
          setEditing(null)
        }}
      />
    </div>
  )
}

function PlanCard({ plan, onEdit }: { plan: PricingPlan; onEdit: () => void }) {
  const featured = plan.highlighted

  return (
    <Card tone={featured ? 'navy' : 'light'} className="relative flex h-full flex-col">
      <button
        type="button"
        aria-label={`Edit ${plan.name}`}
        className={cn(
          'absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors',
          featured ? 'bg-white/15 text-gold hover:bg-white/25' : 'bg-ivory text-navy hover:bg-sand',
        )}
        onClick={onEdit}
      >
        <PencilIcon />
      </button>

      {featured ? (
        <p className="text-[10px] tracking-[0.22em] text-gold uppercase">Most chosen</p>
      ) : (
        <p className="text-[10px] tracking-[0.22em] text-gold-deep uppercase">Plan</p>
      )}
      <p className={cn('mt-3 pr-12 text-sm tracking-wide', featured ? 'text-gold' : 'text-gold-deep')}>{plan.name}</p>
      <p className={cn('mt-3 font-display text-5xl', featured ? 'text-white' : 'text-navy')}>{plan.price}</p>
      <p className={cn('mt-1 text-sm', featured ? 'text-gold-soft' : 'text-navy-muted')}>{plan.cadence}</p>
      <p className={cn('mt-4 text-sm leading-6', featured ? 'text-gold-soft' : 'text-navy-muted')}>{plan.description}</p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <span className={cn('mt-0.5', featured ? 'text-gold' : 'text-gold-deep')} aria-hidden="true">
              <CheckIcon />
            </span>
            <span className={featured ? 'text-white' : 'text-navy'}>{feature}</span>
          </li>
        ))}
      </ul>
      <p
        className={cn(
          'mt-8 rounded-full px-4 py-3 text-center text-sm tracking-wide',
          featured ? 'bg-gold text-navy' : 'bg-ivory text-navy',
        )}
      >
        {plan.ctaLabel}
      </p>
    </Card>
  )
}

function EditPlanModal({
  plan,
  onClose,
  onSave,
}: {
  plan: PricingPlan | null
  onClose: () => void
  onSave: (plan: PricingPlan) => void
}) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [cadence, setCadence] = useState('')
  const [description, setDescription] = useState('')
  const [ctaLabel, setCtaLabel] = useState('')
  const [featuresText, setFeaturesText] = useState('')
  const [highlighted, setHighlighted] = useState(false)

  useEffect(() => {
    if (!plan) {
      return
    }

    setName(plan.name)
    setPrice(plan.price)
    setCadence(plan.cadence)
    setDescription(plan.description)
    setCtaLabel(plan.ctaLabel)
    setFeaturesText(plan.features.join('\n'))
    setHighlighted(plan.highlighted)
  }, [plan])

  return (
    <Modal isOpen={plan !== null} onClose={onClose} title="Edit plan">
      <form
        className="space-y-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          if (!plan) {
            return
          }

          onSave({
            ...plan,
            name: name.trim(),
            price: price.trim(),
            cadence: cadence.trim(),
            description: description.trim(),
            ctaLabel: ctaLabel.trim(),
            highlighted,
            features: featuresText
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean),
          })
        }}
      >
        <Input label="Name" inputSize="sm" value={name} onChange={(event) => setName(event.target.value)} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Price" inputSize="sm" value={price} onChange={(event) => setPrice(event.target.value)} />
          <Input label="Cadence" inputSize="sm" value={cadence} onChange={(event) => setCadence(event.target.value)} />
        </div>
        <label className="flex w-full flex-col gap-1.5 text-left">
          <span className="text-xs font-medium tracking-wide text-navy">Description</span>
          <textarea
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-sm text-navy outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)]"
          />
        </label>
        <label className="flex w-full flex-col gap-1.5 text-left">
          <span className="text-xs font-medium tracking-wide text-navy">Features</span>
          <textarea
            rows={5}
            value={featuresText}
            onChange={(event) => setFeaturesText(event.target.value)}
            className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-sm text-navy outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)]"
          />
          <span className="text-sm text-navy-muted">One feature per line.</span>
        </label>
        <Input
          label="Button label"
          inputSize="sm"
          value={ctaLabel}
          onChange={(event) => setCtaLabel(event.target.value)}
        />
        <div>
          <p className="text-xs font-medium tracking-wide text-navy">Featured card</p>
          <div className="mt-2 flex gap-2">
            <Button type="button" size="sm" variant={highlighted ? 'primary' : 'secondary'} onClick={() => setHighlighted(true)}>
              Featured
            </Button>
            <Button type="button" size="sm" variant={!highlighted ? 'primary' : 'secondary'} onClick={() => setHighlighted(false)}>
              Standard
            </Button>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  )
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M4 20h4.2L19 9.2 14.8 5 4 15.8V20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m13.5 6.3 4.2 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m5 12 5 5 9-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
