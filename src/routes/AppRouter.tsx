import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout.tsx'
import { DashboardLayout } from '@/components/layout/DashboardLayout.tsx'
import { PublicLayout } from '@/components/layout/PublicLayout.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { LoginPage } from '@/pages/auth/LoginPage.tsx'
import { RegisterPage } from '@/pages/auth/RegisterPage.tsx'
import { BillingPage } from '@/pages/dashboard/BillingPage.tsx'
import { CreateProjectPage } from '@/pages/dashboard/CreateProjectPage.tsx'
import { DashboardTemplatesPage } from '@/pages/dashboard/DashboardTemplatesPage.tsx'
import { OverviewPage } from '@/pages/dashboard/OverviewPage.tsx'
import { ProfilePage } from '@/pages/dashboard/ProfilePage.tsx'
import { ProjectsPage } from '@/pages/dashboard/ProjectsPage.tsx'
import { HomePage } from '@/pages/public/HomePage.tsx'
import { PricingPage } from '@/pages/public/PricingPage.tsx'
import { TemplatesPage } from '@/pages/public/TemplatesPage.tsx'
import { ProtectedRoute } from '@/routes/ProtectedRoute.tsx'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.templates} element={<TemplatesPage />} />
          <Route path={ROUTES.pricing} element={<PricingPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.dashboard} element={<OverviewPage />} />
            <Route path={ROUTES.projects} element={<ProjectsPage />} />
            <Route path={ROUTES.createProject} element={<CreateProjectPage />} />
            <Route path={ROUTES.dashboardTemplates} element={<DashboardTemplatesPage />} />
            <Route path={ROUTES.billing} element={<BillingPage />} />
            <Route path={ROUTES.profile} element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
