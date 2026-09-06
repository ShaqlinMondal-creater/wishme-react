import { Card } from '@/shared/components/ui/Card.tsx'
import { getAdminCustomers } from '@/services/admin.service.ts'

export function AdminCustomersPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">People</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Customers</h1>
      <p className="mt-2 text-navy-muted">Demo accounts for now. Each customer can sign in and open their profile.</p>

      <div className="mt-8 grid gap-4">
        {getAdminCustomers().map((customer) => (
          <Card key={customer.id} hover>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl text-navy">{customer.name}</h2>
                <p className="mt-1 text-sm text-navy-muted">
                  {customer.email} · {customer.mobile}
                </p>
                <p className="mt-1 text-sm text-navy-muted">
                  {customer.wishes} {customer.wishes === 1 ? 'wish' : 'wishes'} · joined {customer.joined}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-[0.16em] text-gold-deep uppercase">{customer.plan}</span>
                <span className="rounded-full bg-ivory px-3 py-1 text-xs tracking-wide text-navy">{customer.status}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
