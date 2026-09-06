import { Outlet } from 'react-router-dom'
import { Footer } from '@/views/public/layout/Footer.tsx'
import { MobileTabBar } from '@/shared/components/layout/MobileTabBar.tsx'
import { Navbar } from '@/views/public/layout/Navbar.tsx'

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
