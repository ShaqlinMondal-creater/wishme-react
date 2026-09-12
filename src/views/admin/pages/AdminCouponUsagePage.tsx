import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getApiErrorMessage } from '@/services/http.ts'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAdminCouponUses } from '@/shared/hooks/useAdminCouponUses.ts'
import { useAdminCoupons } from '@/shared/hooks/useAdminCoupons.ts'
import { cn } from '@/shared/lib/cn.ts'
import { formatCouponUsePeriod } from '@/shared/lib/couponDisplay.ts'
import { formatDateTime } from '@/shared/lib/formatDate.ts'
import type { CouponUse, CouponUseAppliedTo } from '@/shared/types/coupon.ts'

const USAGE_LIMIT = 25

export function AdminCouponUsagePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const couponParam = Number(searchParams.get('coupon') ?? '')
  const couponId = Number.isFinite(couponParam) && couponParam > 0 ? couponParam : null
  const [search, setSearch] = useState('')
  const [appliedTo, setAppliedTo] = useState<CouponUseAppliedTo | 'all'>('all')
  const [usedFrom, setUsedFrom] = useState('')
  const [usedTo, setUsedTo] = useState('')
  const [offset, setOffset] = useState(0)
  const debouncedSearch = useDebouncedValue(search.trim(), 400)

  useEffect(() => {
    setOffset(0)
  }, [couponId, appliedTo, usedFrom, usedTo, debouncedSearch])

  const couponsQuery = useAdminCoupons()
  const coupons = couponsQuery.data?.coupons ?? []
  const usageQuery = useAdminCouponUses({
    coupon_id: couponId ?? undefined,
    applied_to: appliedTo === 'all' ? undefined : appliedTo,
    search: debouncedSearch || undefined,
    used_from: usedFrom || undefined,
    used_to: usedTo || undefined,
    limit: USAGE_LIMIT,
    offset,
  })
  const uses = usageQuery.data?.uses ?? []
  const total = usageQuery.data?.total ?? 0
  const from = total === 0 ? 0 : offset + 1
  const to = Math.min(offset + USAGE_LIMIT, total)
  const hasFilters =
    couponId != null || appliedTo !== 'all' || Boolean(debouncedSearch) || Boolean(usedFrom) || Boolean(usedTo)

  const setCouponFilter = (value: string) => {
    if (value === 'all') {
      setSearchParams({})
      return
    }

    setSearchParams({ coupon: value })
  }

  const clearFilters = () => {
    setSearch('')
    setAppliedTo('all')
    setUsedFrom('')
    setUsedTo('')
    setSearchParams({})
  }

  return (
    <div className="mx-auto max-w-[90rem]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Offers</p>
          <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Usage</h1>
          <p className="mt-2 text-navy-muted">
            Filter by coupon, template or subscription, customer, and the date it was used.
          </p>
        </div>
        <Link to={ROUTES.adminCoupons} className="text-sm tracking-wide text-gold-deep hover:text-navy">
          Back to coupons
        </Link>
      </div>

      {usageQuery.isError ? (
        <EmptyState
          className="mt-8"
          title="Could not load usage"
          description={getApiErrorMessage(usageQuery.error)}
          actionLabel="Try again"
          onAction={() => void usageQuery.refetch()}
        />
      ) : (
        <Card className="mt-8" padding="none">
          <div className="grid gap-3 border-b border-line/80 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Input
                label="Search"
                inputSize="sm"
                value={search}
                placeholder="Code, name, or email"
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <FilterSelect
              label="Coupon"
              value={couponId == null ? 'all' : String(couponId)}
              className="sm:w-full"
              onChange={setCouponFilter}
              options={[
                { value: 'all', label: 'All codes' },
                ...coupons.map((item) => ({ value: String(item.id), label: item.code })),
              ]}
            />
            <FilterSelect
              label="Applied to"
              value={appliedTo}
              className="sm:w-full"
              onChange={(value) => setAppliedTo(value as CouponUseAppliedTo | 'all')}
              options={[
                { value: 'all', label: 'All' },
                { value: 'template', label: 'Template' },
                { value: 'subscription', label: 'Subscription' },
              ]}
            />
            <Input
              label="From"
              inputSize="sm"
              type="date"
              value={usedFrom}
              onChange={(event) => setUsedFrom(event.target.value)}
            />
            <Input
              label="To"
              inputSize="sm"
              type="date"
              value={usedTo}
              onChange={(event) => setUsedTo(event.target.value)}
            />
          </div>
          {hasFilters ? (
            <div className="border-b border-line/80 px-4 py-2 sm:px-5">
              <button type="button" className="text-xs tracking-wide text-gold-deep hover:text-navy" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : null}

          {usageQuery.isLoading ? (
            <LoadingState label="Loading usage…" />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-[60rem] w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-line/80 bg-ivory/70 text-xs tracking-[0.12em] text-navy-muted uppercase">
                      <th className="px-5 py-3 font-medium">Code</th>
                      <th className="px-5 py-3 font-medium">Customer</th>
                      <th className="px-5 py-3 font-medium">Applied to</th>
                      <th className="px-5 py-3 font-medium">Off</th>
                      <th className="px-5 py-3 font-medium">Original</th>
                      <th className="px-5 py-3 font-medium">Period</th>
                      <th className="px-5 py-3 font-medium">Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uses.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-10 text-center text-navy-muted">
                          {hasFilters
                            ? 'No uses match these filters.'
                            : 'No uses yet. Rows appear when a customer applies a coupon at checkout.'}
                        </td>
                      </tr>
                    ) : (
                      uses.map((row) => <UsageRow key={row.id} row={row} />)
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-3 border-t border-line/80 px-5 py-4 text-sm text-navy-muted sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Showing {from}–{to} of {total}
                  {usageQuery.isFetching && !usageQuery.isLoading ? ' · Updating…' : ''}
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={offset === 0}
                    onClick={() => setOffset((current) => Math.max(0, current - USAGE_LIMIT))}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={to >= total}
                    onClick={() => setOffset((current) => current + USAGE_LIMIT)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  )
}

function UsageRow({ row }: { row: CouponUse }) {
  return (
    <tr className="border-b border-line/60 last:border-0">
      <td className="px-5 py-3 font-medium whitespace-nowrap text-navy">{row.coupon_code || '—'}</td>
      <td className="px-5 py-3">
        <p className="font-medium whitespace-nowrap text-navy">{row.user_name || 'Removed account'}</p>
        <p className="text-xs text-navy-muted">{row.user_email || '—'}</p>
      </td>
      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">
        {row.applied_to === 'subscription' ? 'Subscription' : 'Template'}
      </td>
      <td className="px-5 py-3 whitespace-nowrap text-navy">₹{row.amount_off}</td>
      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">
        {row.original_price == null ? '—' : `₹${row.original_price}`}
      </td>
      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">{formatCouponUsePeriod(row)}</td>
      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">
        {row.created_at ? formatDateTime(row.created_at) : '—'}
      </td>
    </tr>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}) {
  const id = `usage-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={cn('flex w-full flex-col gap-1.5 text-left', className)}>
      <label htmlFor={id} className="text-xs font-medium tracking-wide text-navy">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-2xl border border-line bg-ivory px-3 text-sm text-navy outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)] sm:h-10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
