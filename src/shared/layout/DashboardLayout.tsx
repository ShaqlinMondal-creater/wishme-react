import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { Sidebar } from '@/features/dashboard/components/Sidebar.tsx'
import { MobileTabBar } from '@/shared/layout/MobileTabBar.tsx'
import { useUiStore } from '@/shared/store/uiStore.ts'
import { cn } from '@/shared/lib/cn.ts'

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
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6 lg:hidden">
          <Logo compact />
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className={cn(
              'inline-flex h-10 items-center rounded-full border border-line px-4 text-sm text-navy',
            )}
          >
            Menu
          </button>
        </header>
        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileTabBar />
    </div>
  )
}
