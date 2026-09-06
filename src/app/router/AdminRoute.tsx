import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAdminRole } from '@/features/auth/data/demoAccounts.ts'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/features/auth/hooks/useAuth.ts'

export function AdminRoute() {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.adminLogin}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  if (!isAdminRole(user?.role)) {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  return <Outlet />
}
