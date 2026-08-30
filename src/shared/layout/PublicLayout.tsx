import { Outlet } from 'react-router-dom'
import { Footer } from '@/shared/layout/Footer.tsx'
import { MobileTabBar } from '@/shared/layout/MobileTabBar.tsx'
import { Navbar } from '@/shared/layout/Navbar.tsx'

export function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileTabBar />
    </div>
  )
}
