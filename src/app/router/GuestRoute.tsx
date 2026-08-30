import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/features/auth/hooks/useAuth.ts'

export function GuestRoute() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  return <Outlet />
}
