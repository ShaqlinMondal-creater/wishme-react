import { Card } from '@/shared/components/ui/Card.tsx'
import { demoAdminCustomers, demoAdminStats, demoAdminWishes } from '@/features/admin/data/demoAdmin.ts'

export function AdminOverviewPage() {

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Admin</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Studio</h1>
      <p className="mt-2 text-navy-muted">
        Demo figures for now. Customers, wishes, and open links at a glance.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Customers" value={demoAdminStats.customers} />
        <Stat label="Wishes" value={demoAdminStats.wishes} />
        <Stat label="Published" value={demoAdminStats.published} />
        <Stat label="Open links" value={demoAdminStats.openLinks} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-2xl text-navy">Recent customers</h2>
          <ul className="mt-5 space-y-3">
            {demoAdminCustomers.slice(0, 3).map((customer) => (
              <li key={customer.id} className="flex items-center justify-between gap-3 border-b border-line/70 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-navy">{customer.name}</p>
                  <p className="text-sm text-navy-muted">{customer.email}</p>
                </div>
                <span className="text-xs tracking-[0.16em] text-gold-deep uppercase">{customer.plan}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-2xl text-navy">Live wishes</h2>
          <ul className="mt-5 space-y-3">
            {demoAdminWishes.slice(0, 3).map((wish) => (
              <li key={wish.id} className="flex items-center justify-between gap-3 border-b border-line/70 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-navy">{wish.title}</p>
                  <p className="text-sm text-navy-muted">
                    {wish.customer} → {wish.recipient}
                  </p>
                </div>
                <span className="text-xs tracking-[0.16em] text-gold-deep uppercase">{wish.status}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <p className="text-sm text-navy-muted">{label}</p>
      <p className="mt-2 font-display text-4xl text-navy">{value}</p>
    </Card>
  )
}
