import { Navigate, Outlet } from 'react-router-dom'
import { homePathForRole, ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'

export function GuestRoute() {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={homePathForRole(user?.role) ?? ROUTES.dashboard} replace />
  }

  return <Outlet />
}
