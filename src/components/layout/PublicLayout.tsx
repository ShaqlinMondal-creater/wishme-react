import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer.tsx'
import { Navbar } from '@/components/layout/Navbar.tsx'

export function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
