import { Outlet } from 'react-router-dom'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { AdminSidebar } from '@/features/admin/components/AdminSidebar.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useState } from 'react'

export function AdminLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-svh bg-ivory lg:flex">
      <div className="hidden lg:block lg:sticky lg:top-0 lg:h-svh">
        <AdminSidebar />
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-navy/40" onClick={() => setOpen(false)} />
          <div className="relative h-full w-[min(18rem,85vw)]">
            <AdminSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 sm:px-6 lg:hidden">
          <Logo compact to={ROUTES.admin} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm text-navy"
          >
            Menu
          </button>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
