import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAdminRole } from '@/shared/data/demoAccounts.ts'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'

export function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  if (isAdminRole(user?.role)) {
    return <Navigate to={ROUTES.admin} replace />
  }

  return <Outlet />
}
