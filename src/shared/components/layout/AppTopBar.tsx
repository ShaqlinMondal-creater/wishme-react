import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import { getInitials } from '@/shared/lib/initials.ts'
import { isAdminRole } from '@/shared/lib/roles.ts'
import { cn } from '@/shared/lib/cn.ts'

export function AppTopBar({
  profileTo,
  onMenu,
}: {
  profileTo: string
  onMenu?: () => void
}) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const name = user?.name ?? 'Account'
  const email = user?.email ?? ''

  useEffect(() => {
    if (!open) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 sm:px-6 lg:px-8">
      {onMenu ? (
        <button
          type="button"
          onClick={onMenu}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-navy lg:hidden"
        >
          <MenuIcon />
          Menu
        </button>
      ) : (
        <span className="lg:hidden" />
      )}

      <div ref={menuRef} className="relative ml-auto">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex min-w-0 items-center gap-3 rounded-full py-1 pr-2 pl-1 hover:bg-ivory"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-xs tracking-wide text-gold">
            {getInitials(name)}
          </span>
          <span className="hidden min-w-0 text-left sm:block">
            <span className="block truncate text-sm font-medium text-navy">{name}</span>
            {email ? <span className="block truncate text-xs text-navy-muted">{email}</span> : null}
          </span>
          <ChevronIcon className={cn('hidden h-4 w-4 text-navy-muted sm:block', open && 'rotate-180')} />
        </button>

        {open ? (
          <div
            role="menu"
            className="absolute top-full right-0 z-40 mt-2 min-w-48 rounded-2xl border border-line bg-white py-1 shadow-lift"
          >
            <Link
              to={profileTo}
              role="menuitem"
              className="block px-4 py-2.5 text-sm text-navy hover:bg-ivory"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <button
              type="button"
              role="menuitem"
              className="block w-full px-4 py-2.5 text-left text-sm text-navy hover:bg-ivory"
              onClick={() => {
                setOpen(false)
                void logout().then(() => {
                  navigate(isAdminRole(user?.role) ? ROUTES.adminLogin : ROUTES.login)
                })
              }}
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
