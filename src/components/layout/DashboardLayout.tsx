import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar.tsx'
import { useUiStore } from '@/store/uiStore.ts'
import { cn } from '@/utils/cn.ts'

export function DashboardLayout() {
  const isMobileSidebarOpen = useUiStore((state) => state.isMobileSidebarOpen)
  const toggleMobileSidebar = useUiStore((state) => state.toggleMobileSidebar)
  const closeMobileSidebar = useUiStore((state) => state.closeMobileSidebar)

  return (
    <div className="min-h-svh bg-white lg:flex">
      <div className="hidden lg:block lg:h-svh lg:sticky lg:top-0">
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
          <div className="relative h-full w-72 max-w-[85vw]">
            <Sidebar />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line px-5 py-4 lg:hidden">
          <p className="font-display text-2xl tracking-[0.18em] text-navy">WISHME</p>
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className={cn('rounded-full border border-line px-4 py-2 text-sm text-navy')}
          >
            Menu
          </button>
        </header>
        <main className="flex-1 px-5 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
