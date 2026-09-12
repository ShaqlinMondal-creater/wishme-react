import { Card } from '@/shared/components/ui/Card.tsx'
import { getAdminWishes } from '@/services/admin.service.ts'
import { useAdminUsers } from '@/shared/hooks/useAdminUsers.ts'

export function AdminOverviewPage() {
  const usersQuery = useAdminUsers({ limit: 5, offset: 0 })
  const users = usersQuery.data?.users ?? []
  const userCount = usersQuery.data?.total ?? users.length
  const wishes = getAdminWishes()

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Admin</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Studio</h1>
      <p className="mt-2 text-navy-muted">
        Registered users from the API. Wish figures are still a preview until that module is live.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Users" value={userCount} />
        <Stat label="Wishes" value={wishes.length} />
        <Stat label="Published" value={wishes.filter((wish) => wish.status === 'Published').length} />
        <Stat label="Open links" value={wishes.filter((wish) => wish.opens.startsWith('Open')).length} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-2xl text-navy">Recent users</h2>
          {users.length === 0 ? (
            <p className="mt-5 text-sm text-navy-muted">No users yet.</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {users.map((user) => (
                <li key={user.id} className="flex items-center justify-between gap-3 border-b border-line/70 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-navy">{user.name}</p>
                    <p className="text-sm text-navy-muted">{user.email}</p>
                  </div>
                  <span className="text-xs tracking-[0.16em] text-gold-deep uppercase">
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <h2 className="font-display text-2xl text-navy">Live wishes</h2>
          <ul className="mt-5 space-y-3">
            {wishes.slice(0, 3).map((wish) => (
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
