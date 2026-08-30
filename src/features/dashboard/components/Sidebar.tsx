import { NavLink } from 'react-router-dom'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/features/auth/hooks/useAuth.ts'
import { useUiStore } from '@/shared/store/uiStore.ts'
import { cn } from '@/shared/lib/cn.ts'

const items = [
  { to: ROUTES.dashboard, label: 'Overview', end: true },
  { to: ROUTES.projects, label: 'My Projects', end: false },
  { to: ROUTES.dashboardTemplates, label: 'Templates', end: false },
  { to: ROUTES.billing, label: 'Billing', end: false },
  { to: ROUTES.profile, label: 'Profile', end: false },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const closeMobileSidebar = useUiStore((state) => state.closeMobileSidebar)

  return (
    <aside className="flex h-full w-full flex-col border-r border-line bg-cream/70 px-5 py-6 lg:w-72">
      <Logo />
      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={closeMobileSidebar}
            className={({ isActive }) =>
              cn(
                'rounded-2xl px-4 py-3 text-sm tracking-wide transition-colors',
                isActive
                  ? 'bg-white text-navy shadow-soft'
                  : 'text-navy-muted hover:bg-white/70 hover:text-navy',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="rounded-3xl bg-white p-4 shadow-soft">
        <p className="text-sm font-medium text-navy">{user?.name ?? 'Guest'}</p>
        <p className="mt-1 truncate text-xs text-navy-muted">{user?.email}</p>
        <button
          type="button"
          onClick={() => {
            closeMobileSidebar()
            void logout()
          }}
          className="mt-4 text-sm text-gold-deep hover:text-navy"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
