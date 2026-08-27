import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/common/Logo.tsx'

export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-cream">
      <div className="px-6 py-6">
        <Logo />
      </div>
      <main className="flex flex-1 items-center justify-center px-5 pb-16">
        <Outlet />
      </main>
    </div>
  )
}
