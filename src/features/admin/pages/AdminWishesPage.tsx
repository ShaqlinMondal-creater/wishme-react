import { Card } from '@/shared/components/ui/Card.tsx'
import { demoAdminWishes } from '@/features/admin/data/demoAdmin.ts'

export function AdminWishesPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Keepsakes</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Wishes</h1>
      <p className="mt-2 text-navy-muted">Published, scheduled, and draft wishes in this demo studio.</p>

      <div className="mt-8 grid gap-4">
        {demoAdminWishes.map((wish) => (
          <Card key={wish.id} hover>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl text-navy">{wish.title}</h2>
                <p className="mt-1 text-sm text-navy-muted">
                  {wish.template} · {wish.customer} → {wish.recipient}
                </p>
                <p className="mt-1 text-sm text-navy-muted">{wish.opens}</p>
              </div>
              <span className="text-xs tracking-[0.16em] text-gold-deep uppercase">{wish.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
