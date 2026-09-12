import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/views/customer/components/Sidebar.tsx'
import { AppTopBar } from '@/shared/components/layout/AppTopBar.tsx'
import { MobileTabBar } from '@/shared/components/layout/MobileTabBar.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useUiStore } from '@/shared/store/uiStore.ts'

export function DashboardLayout() {
  const isMobileSidebarOpen = useUiStore((state) => state.isMobileSidebarOpen)
  const toggleMobileSidebar = useUiStore((state) => state.toggleMobileSidebar)
  const closeMobileSidebar = useUiStore((state) => state.closeMobileSidebar)

  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileSidebarOpen])

  return (
    <div className="min-h-svh bg-white lg:flex">
      <div className="hidden lg:block lg:sticky lg:top-0 lg:h-svh">
        <Sidebar />
      </div>

      {isMobileSidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-navy/30"
            onClick={closeMobileSidebar}
          />
          <div className="relative h-full w-[min(18rem,85vw)] shadow-lift">
            <Sidebar />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar profileTo={ROUTES.profile} onMenu={toggleMobileSidebar} />
        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileTabBar />
    </div>
  )
}
