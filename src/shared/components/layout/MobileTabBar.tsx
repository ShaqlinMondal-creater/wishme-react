import type { ReactNode } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import { cn } from '@/shared/lib/cn.ts'

export function MobileTabBar() {
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()

  const templatesTo = isAuthenticated ? ROUTES.dashboardTemplates : ROUTES.templates
  const subscriptionsTo = isAuthenticated ? ROUTES.billing : ROUTES.pricing
  const settingsTo = isAuthenticated ? ROUTES.profile : ROUTES.login

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      aria-label="Primary"
    >
      <div className="relative bg-cream/95 pb-[max(0.35rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-18px_rgb(11_31_58_/_0.22)] backdrop-blur-md">
        <svg
          className="pointer-events-none absolute top-0 left-1/2 h-7 w-32 -translate-x-1/2 -translate-y-[99%] text-cream"
          viewBox="0 0 128 28"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M0 28c18 0 28-28 64-28s46 28 64 28H0Z" />
        </svg>

        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-[48%] rounded-full bg-cream"
          aria-hidden="true"
        />

        <Link
          to={ROUTES.createProject}
          aria-label="Create a wish"
          className={cn(
            'absolute top-0 left-1/2 z-10 flex h-[3.65rem] w-[3.65rem] -translate-x-1/2 -translate-y-[52%] items-center justify-center rounded-full bg-navy text-gold shadow-lift',
            pathname.startsWith(ROUTES.createProject) && 'outline-2 outline-offset-2 outline-gold',
          )}
        >
          <CameraIcon />
        </Link>

        <div className="grid h-[3.85rem] grid-cols-5 items-end px-1">
          <TabLink
            to={templatesTo}
            label="Templates"
            isActive={pathname.startsWith(ROUTES.templates) || pathname.startsWith(ROUTES.dashboardTemplates)}
          >
            <GridIcon />
          </TabLink>
          <TabLink to={ROUTES.support} label="Support" isActive={pathname.startsWith(ROUTES.support)}>
            <SupportIcon />
          </TabLink>
          <div aria-hidden="true" />
          <TabLink
            to={subscriptionsTo}
            label="Plans"
            isActive={pathname.startsWith(subscriptionsTo) || pathname === ROUTES.pricing}
          >
            <CrownIcon />
          </TabLink>
          <TabLink to={settingsTo} label="Settings" isActive={pathname.startsWith(settingsTo)}>
            <SettingsIcon />
          </TabLink>
        </div>
      </div>
    </nav>
  )
}

function TabLink({
  to,
  label,
  isActive,
  children,
}: {
  to: string
  label: string
  isActive: boolean
  children: ReactNode
}) {
  return (
    <NavLink
      to={to}
      className={cn(
        'flex flex-col items-center justify-end gap-1 pb-2 text-[9px] tracking-[0.1em] uppercase',
        isActive ? 'text-navy' : 'text-navy-muted',
      )}
    >
      <span className={cn(isActive ? 'text-gold-deep' : 'text-navy-muted')}>{children}</span>
      {label}
    </NavLink>
  )
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M8.2 7.2 9.1 5.6A1.2 1.2 0 0 1 10.15 5h3.7c.4 0 .77.22.97.57l.9 1.63H18a2 2 0 0 1 2 2v8.3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.2a2 2 0 0 1 2-2h2.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.1" r="3.1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" aria-hidden="true">
      <path
        d="M12 20.5c.7 0 3.2-.7 5.2-2.7 2-2 2.8-4.5 2.8-5.8 0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.3.8 3.8 2.8 5.8 2 2 4.5 2.7 5.2 2.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9.6 10.4a2.4 2.4 0 0 1 4.8 0c0 1.6-2.4 1.5-2.4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="16.1" r="0.7" fill="currentColor" />
    </svg>
  )
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" aria-hidden="true">
      <path
        d="M4.5 16.5 6 8.5l4 3.5L12 6.5l2 5.5 4-3.5 1.5 8H4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M5 19.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" aria-hidden="true">
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
