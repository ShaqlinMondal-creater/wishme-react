import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createAdminCoupon,
  deleteAdminCoupon,
  updateAdminCoupon,
  type CouponInput,
} from '@/services/admin.service.ts'
import { ApiError, firstFieldError, getApiErrorMessage } from '@/services/http.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { adminCouponUsagePath } from '@/shared/constants/routes.ts'
import { useAdminCoupons } from '@/shared/hooks/useAdminCoupons.ts'
import { cn } from '@/shared/lib/cn.ts'
import {
  couponAppliesLabel,
  couponLifeLabel,
  formatCouponDiscount,
  formatCouponUses,
  formatCouponWindow,
  fromDateTimeLocal,
  toDateTimeLocal,
} from '@/shared/lib/couponDisplay.ts'
import {
  COUPON_APPLIES_LABELS,
  COUPON_APPLIES_TO,
  COUPON_DISCOUNT_LABELS,
  COUPON_DISCOUNT_TYPES,
  type Coupon,
  type CouponAppliesTo,
} from '@/shared/types/coupon.ts'
import type { ApiErrorBag } from '@/services/types.ts'

export function AdminCouponsPage() {
  const queryClient = useQueryClient()
  const [appliesTo, setAppliesTo] = useState<CouponAppliesTo | 'all'>('all')
  const [editing, setEditing] = useState<Coupon | 'new' | null>(null)
  const [removing, setRemoving] = useState<Coupon | null>(null)

  const couponsQuery = useAdminCoupons({
    applies_to: appliesTo === 'all' ? undefined : appliesTo,
  })
  const coupons = couponsQuery.data?.coupons ?? []

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.adminCoupons })
    void queryClient.invalidateQueries({ queryKey: queryKeys.adminCouponUses })
  }

  return (
    <div className="mx-auto max-w-[90rem]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Offers</p>
          <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Coupons</h1>
          <p className="mt-2 text-navy-muted">
            Codes for template price, subscription price, or both. Flat rupees or a percent.
          </p>
        </div>
        <Button onClick={() => setEditing('new')}>Add coupon</Button>
      </div>

      <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <FilterChip label="All" isActive={appliesTo === 'all'} onClick={() => setAppliesTo('all')} />
        {COUPON_APPLIES_TO.map((value) => (
          <FilterChip
            key={value}
            label={COUPON_APPLIES_LABELS[value]}
            isActive={appliesTo === value}
            onClick={() => setAppliesTo(value)}
          />
        ))}
      </div>

      {couponsQuery.isLoading ? (
        <LoadingState label="Loading coupons…" />
      ) : couponsQuery.isError ? (
        <EmptyState
          className="mt-8"
          title="Could not load coupons"
          description={getApiErrorMessage(couponsQuery.error)}
          actionLabel="Try again"
          onAction={() => void couponsQuery.refetch()}
        />
      ) : coupons.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No coupons yet"
          description="Add a code for template checkout, a plan, or both."
          actionLabel="Add coupon"
          onAction={() => setEditing('new')}
        />
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {coupons.map((coupon) => {
            const life = couponLifeLabel(coupon)

            return (
              <Card key={coupon.id} padding="none" hover className="overflow-hidden">
                <div className="relative bg-navy px-5 py-4">
                  <p className="text-[10px] tracking-[0.22em] text-gold uppercase">Coupon</p>
                  <p className="mt-1 font-display text-2xl tracking-[0.08em] text-white">{coupon.code}</p>
                  <div className="absolute top-3 right-3 flex gap-1">
                    <button
                      type="button"
                      aria-label={`Edit ${coupon.code}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy shadow-soft hover:bg-gold"
                      onClick={() => setEditing(coupon)}
                    >
                      <PencilIcon />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${coupon.code}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-700 shadow-soft hover:bg-red-50"
                      onClick={() => setRemoving(coupon)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="min-w-0 truncate font-display text-2xl leading-none text-navy">{coupon.title}</h2>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-[10px] tracking-wide',
                        life === 'Active' ? 'bg-gold-soft text-navy' : 'bg-ivory text-navy-muted',
                      )}
                    >
                      {life}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-4xl text-navy">
                    {formatCouponDiscount(coupon.discount_type, coupon.amount)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-ivory px-2.5 py-0.5 text-[10px] tracking-wide text-navy">
                      {couponAppliesLabel(coupon.applies_to)}
                    </span>
                    <span className="rounded-full bg-ivory px-2.5 py-0.5 text-[10px] tracking-wide text-navy">
                      {coupon.discount_type === 'percent' ? 'Percent' : 'Flat'}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-navy-muted">{formatCouponUses(coupon)}</p>
                  <p className="mt-1 text-xs text-navy-muted">{formatCouponWindow(coupon.starts_at, coupon.ends_at)}</p>
                  <Link
                    to={adminCouponUsagePath(coupon.id)}
                    className="mt-3 text-xs tracking-wide text-gold-deep hover:text-navy"
                  >
                    Usage
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <CouponFormModal
        coupon={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          refresh()
          setEditing(null)
        }}
      />
      <DeleteCouponModal
        coupon={removing}
        onClose={() => setRemoving(null)}
        onDeleted={() => {
          refresh()
          setRemoving(null)
        }}
      />
    </div>
  )
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-4 py-2 text-sm',
        isActive ? 'bg-navy text-white' : 'bg-white text-navy-muted',
      )}
    >
      {label}
    </button>
  )
}

type CouponForm = {
  code: string
  title: string
  discount_type: CouponInput['discount_type']
  amount: number
  applies_to: CouponAppliesTo
  is_active: boolean
  starts_at: string
  ends_at: string
  max_uses: string
  max_uses_per_user: number
}

function emptyForm(): CouponForm {
  return {
    code: '',
    title: '',
    discount_type: 'percent',
    amount: 10,
    applies_to: 'both',
    is_active: true,
    starts_at: '',
    ends_at: '',
    max_uses: '',
    max_uses_per_user: 1,
  }
}

function formFromCoupon(coupon: Coupon): CouponForm {
  return {
    code: coupon.code,
    title: coupon.title,
    discount_type: coupon.discount_type,
    amount: coupon.amount,
    applies_to: coupon.applies_to,
    is_active: coupon.is_active,
    starts_at: toDateTimeLocal(coupon.starts_at),
    ends_at: toDateTimeLocal(coupon.ends_at),
    max_uses: coupon.max_uses == null ? '' : String(coupon.max_uses),
    max_uses_per_user: coupon.max_uses_per_user,
  }
}

function payloadFromForm(form: CouponForm): CouponInput {
  const maxUses = form.max_uses.trim() === '' ? null : Math.floor(Number(form.max_uses))

  return {
    code: form.code.trim().toUpperCase(),
    title: form.title.trim(),
    discount_type: form.discount_type,
    amount: Math.max(1, Math.floor(form.amount || 0)),
    applies_to: form.applies_to,
    is_active: form.is_active,
    starts_at: fromDateTimeLocal(form.starts_at),
    ends_at: fromDateTimeLocal(form.ends_at),
    max_uses: maxUses != null && Number.isFinite(maxUses) ? maxUses : null,
    max_uses_per_user: Math.max(1, Math.floor(form.max_uses_per_user || 1)),
  }
}

function CouponFormModal({
  coupon,
  onClose,
  onSaved,
}: {
  coupon: Coupon | 'new' | null
  onClose: () => void
  onSaved: () => void
}) {
  const isNew = coupon === 'new'
  const [form, setForm] = useState<CouponForm>(emptyForm)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<ApiErrorBag>()

  useEffect(() => {
    if (coupon === null) {
      return
    }

    setForm(coupon === 'new' ? emptyForm() : formFromCoupon(coupon))
    setError('')
    setFieldErrors(undefined)
  }, [coupon])

  const mutation = useMutation({
    mutationFn: async () => {
      if (coupon === null) {
        throw new Error('No coupon selected.')
      }

      const input = payloadFromForm(form)

      return coupon === 'new' ? createAdminCoupon(input) : updateAdminCoupon(coupon.id, input)
    },
    onSuccess: onSaved,
    onError: (caught) => {
      setError(getApiErrorMessage(caught))
      setFieldErrors(caught instanceof ApiError ? caught.errors : undefined)
    },
  })

  const setField = <K extends keyof CouponForm>(key: K, value: CouponForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <Modal
      isOpen={coupon !== null}
      onClose={onClose}
      title={isNew ? 'Add coupon' : 'Edit coupon'}
      className="max-w-xl"
      titleClassName="text-2xl"
    >
      <form
        className="space-y-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          <Input
            label="Code"
            inputSize="sm"
            value={form.code}
            error={firstFieldError(fieldErrors, 'code')}
            onChange={(event) => setField('code', event.target.value.toUpperCase())}
          />
          <Input
            label="Title"
            inputSize="sm"
            value={form.title}
            error={firstFieldError(fieldErrors, 'title')}
            onChange={(event) => setField('title', event.target.value)}
          />
        </div>

        <div>
          <p className="text-xs font-medium tracking-wide text-navy">Discount</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {COUPON_DISCOUNT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={cn(
                  'rounded-full px-2.5 py-1 text-[11px] tracking-wide',
                  form.discount_type === type ? 'bg-navy text-white' : 'bg-ivory text-navy-muted',
                )}
                onClick={() => {
                  setForm((current) => ({
                    ...current,
                    discount_type: type,
                    amount: type === 'percent' ? Math.min(current.amount, 100) : current.amount,
                  }))
                }}
              >
                {COUPON_DISCOUNT_LABELS[type]}
              </button>
            ))}
          </div>
          <div className="mt-2.5">
            <Input
              label={form.discount_type === 'percent' ? 'Percent off' : 'Rupees off'}
              inputSize="sm"
              type="number"
              min={1}
              max={form.discount_type === 'percent' ? 100 : 999999}
              step={1}
              value={String(form.amount)}
              error={firstFieldError(fieldErrors, 'amount')}
              onChange={(event) => setField('amount', Math.max(1, Math.floor(Number(event.target.value) || 0)))}
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium tracking-wide text-navy">Applies to</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {COUPON_APPLIES_TO.map((value) => (
              <button
                key={value}
                type="button"
                className={cn(
                  'rounded-full px-2.5 py-1 text-[11px] tracking-wide',
                  form.applies_to === value ? 'bg-navy text-white' : 'bg-ivory text-navy-muted',
                )}
                onClick={() => setField('applies_to', value)}
              >
                {COUPON_APPLIES_LABELS[value]}
              </button>
            ))}
          </div>
          {firstFieldError(fieldErrors, 'applies_to') ? (
            <p className="mt-1 text-sm text-red-600">{firstFieldError(fieldErrors, 'applies_to')}</p>
          ) : null}
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          <Input
            label="Starts"
            inputSize="sm"
            type="datetime-local"
            value={form.starts_at}
            error={firstFieldError(fieldErrors, 'starts_at')}
            onChange={(event) => setField('starts_at', event.target.value)}
          />
          <Input
            label="Ends"
            inputSize="sm"
            type="datetime-local"
            value={form.ends_at}
            error={firstFieldError(fieldErrors, 'ends_at')}
            onChange={(event) => setField('ends_at', event.target.value)}
          />
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          <Input
            label="Max uses"
            inputSize="sm"
            type="number"
            min={1}
            placeholder="Unlimited"
            value={form.max_uses}
            error={firstFieldError(fieldErrors, 'max_uses')}
            onChange={(event) => setField('max_uses', event.target.value)}
          />
          <Input
            label="Per person"
            inputSize="sm"
            type="number"
            min={1}
            value={String(form.max_uses_per_user)}
            error={firstFieldError(fieldErrors, 'max_uses_per_user')}
            onChange={(event) =>
              setField('max_uses_per_user', Math.max(1, Math.floor(Number(event.target.value) || 1)))
            }
          />
        </div>

        {error ? <p className="text-xs text-red-600">{error}</p> : null}

        <div className="flex items-center justify-between gap-3 border-t border-line/80 pt-3">
          <button
            type="button"
            role="switch"
            aria-checked={form.is_active}
            onClick={() => setField('is_active', !form.is_active)}
            className="flex items-center gap-2 text-xs tracking-wide text-navy"
          >
            <span
              className={cn(
                'relative h-5 w-9 rounded-full transition-colors',
                form.is_active ? 'bg-navy' : 'bg-line',
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform',
                  form.is_active && 'translate-x-4',
                )}
              />
            </span>
            {form.is_active ? 'Active' : 'Inactive'}
          </button>
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={mutation.isPending}>
              {isNew ? 'Create' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

function DeleteCouponModal({
  coupon,
  onClose,
  onDeleted,
}: {
  coupon: Coupon | null
  onClose: () => void
  onDeleted: () => void
}) {
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [coupon])

  const mutation = useMutation({
    mutationFn: () => {
      if (!coupon) {
        throw new Error('No coupon selected.')
      }
      return deleteAdminCoupon(coupon.id)
    },
    onSuccess: onDeleted,
    onError: (caught) => setError(getApiErrorMessage(caught)),
  })

  return (
    <Modal isOpen={coupon !== null} onClose={onClose} title="Delete coupon">
      <p className="text-sm leading-6 text-navy-muted">
        Remove {coupon?.code}? This does not refund past uses.
      </p>
      {error ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}
      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" isLoading={mutation.isPending} onClick={() => mutation.mutate()}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
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

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 7h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 7V5h4v2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M7 7l1 12h8l1-12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 11v5M14 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
