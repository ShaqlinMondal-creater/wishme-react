import { NavLink } from 'react-router-dom'
import type { ComponentType } from 'react'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useUiStore } from '@/shared/store/uiStore.ts'
import { cn } from '@/shared/lib/cn.ts'

const items: {
  to: string
  label: string
  end: boolean
  icon: ComponentType
}[] = [
  { to: ROUTES.dashboard, label: 'Overview', end: true, icon: HomeIcon },
  { to: ROUTES.projects, label: 'My Projects', end: false, icon: ProjectsIcon },
  { to: ROUTES.dashboardTemplates, label: 'Templates', end: false, icon: TemplatesIcon },
  { to: ROUTES.billing, label: 'Billing', end: false, icon: BillingIcon },
  { to: ROUTES.profile, label: 'Profile', end: false, icon: ProfileIcon },
]

export function Sidebar() {
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
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm tracking-wide transition-colors',
                isActive
                  ? 'bg-white text-navy shadow-soft'
                  : 'text-navy-muted hover:bg-white/70 hover:text-navy',
              )
            }
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

function iconClass() {
  return 'h-[1.15rem] w-[1.15rem] shrink-0'
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <path d="M4 11 12 4l8 7v8a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19v-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <path d="M4.5 8.5h15v10a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18.5v-10Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function TemplatesIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function BillingIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="2.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 19c.8-3.2 3-4.8 6-4.8s5.2 1.6 6 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
