import { NavLink } from 'react-router-dom'
import type { ComponentType } from 'react'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { cn } from '@/shared/lib/cn.ts'

const primary: {
  to: string
  label: string
  end: boolean
  icon: ComponentType
}[] = [
  { to: ROUTES.admin, label: 'Overview', end: true, icon: HomeIcon },
  { to: ROUTES.adminTemplates, label: 'Templates', end: false, icon: TemplatesIcon },
  { to: ROUTES.adminUsers, label: 'Users', end: false, icon: UsersIcon },
  { to: ROUTES.adminPlans, label: 'Plans', end: false, icon: PlansIcon },
]

const settings: {
  to: string
  label: string
  end: boolean
  icon: ComponentType
}[] = [
  { to: ROUTES.adminCoupons, label: 'Coupons', end: true, icon: CouponIcon },
  { to: ROUTES.adminCouponUsage, label: 'Usage', end: true, icon: UsageIcon },
  { to: ROUTES.adminBills, label: 'Bills', end: false, icon: BillsIcon },
  { to: ROUTES.adminTemplateSettings, label: 'Occasions', end: false, icon: SettingsIcon },
  { to: ROUTES.adminLogs, label: 'Logs', end: false, icon: LogsIcon },
]

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full w-full flex-col bg-navy px-5 py-6 text-white lg:w-72">
      <Logo inverted to={ROUTES.admin} />
      <p className="mt-4 text-[10px] tracking-[0.28em] text-gold uppercase">Admin</p>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {primary.map((item) => (
          <SidebarLink key={item.to} item={item} onNavigate={onNavigate} />
        ))}
        <p className="mt-6 mb-2 px-4 text-[10px] tracking-[0.28em] text-gold uppercase">Settings</p>
        {settings.map((item) => (
          <SidebarLink key={item.to} item={item} onNavigate={onNavigate} />
        ))}
      </nav>
    </aside>
  )
}

function SidebarLink({
  item,
  onNavigate,
}: {
  item: { to: string; label: string; end: boolean; icon: ComponentType }
  onNavigate?: () => void
}) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm tracking-wide transition-colors',
          isActive ? 'bg-white/10 text-gold' : 'text-white/70 hover:bg-white/5 hover:text-white',
        )
      }
    >
      <item.icon />
      {item.label}
    </NavLink>
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

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 18.5c.6-2.8 2.5-4.3 4.5-4.3s3.9 1.5 4.5 4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16.5" cy="9" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19.8 18.5c-.4-2.2-1.7-3.4-3.3-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CouponIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <path d="M5 8.5 14.5 4l5 9.5L10 18.5 5 8.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="10.2" cy="9.2" r="1.1" fill="currentColor" />
    </svg>
  )
}

function BillsIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v13l-3-1.5-3 1.5-3-1.5-3 1.5V6A1.5 1.5 0 0 1 7 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 9h6M9 12.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PlansIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <path d="M5 16.5 12 5l7 11.5H5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 19.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 4.2v1.6M12 18.2v1.6M4.2 12h1.6M18.2 12h1.6M6.5 6.5l1.1 1.1M16.4 16.4l1.1 1.1M17.5 6.5l-1.1 1.1M7.6 16.4l-1.1 1.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LogsIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <path d="M7 5h10a1.5 1.5 0 0 1 1.5 1.5v13H5.5V6.5A1.5 1.5 0 0 1 7 5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9h6M9 12.5h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function UsageIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass()} fill="none" aria-hidden="true">
      <path d="M5 6.5h14M5 12h14M5 17.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
