import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/views/admin/components/AdminSidebar.tsx'
import { AppTopBar } from '@/shared/components/layout/AppTopBar.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'

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
        <AppTopBar profileTo={ROUTES.adminProfile} onMenu={() => setOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
