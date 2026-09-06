import { NavLink } from 'react-router-dom'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import { cn } from '@/shared/lib/cn.ts'

const items = [
  { to: ROUTES.admin, label: 'Overview', end: true },
  { to: ROUTES.adminCustomers, label: 'Customers', end: false },
  { to: ROUTES.adminWishes, label: 'Wishes', end: false },
  { to: ROUTES.adminProfile, label: 'Profile', end: false },
]

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth()

  return (
    <aside className="flex h-full w-full flex-col bg-navy px-5 py-6 text-white lg:w-72">
      <Logo inverted to={ROUTES.admin} />
      <p className="mt-4 text-[10px] tracking-[0.28em] text-gold uppercase">Admin</p>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'rounded-2xl px-4 py-3 text-sm tracking-wide transition-colors',
                isActive ? 'bg-white/10 text-gold' : 'text-white/70 hover:bg-white/5 hover:text-white',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-medium">{user?.name ?? 'Admin'}</p>
        <p className="mt-1 truncate text-xs text-gold-soft">{user?.email}</p>
        <button type="button" onClick={() => void logout()} className="mt-4 text-sm text-gold hover:text-white">
          Sign out
        </button>
      </div>
    </aside>
  )
}
