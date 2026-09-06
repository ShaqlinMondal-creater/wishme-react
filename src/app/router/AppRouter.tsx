import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '@/shared/layout/AuthLayout.tsx'
import { DashboardLayout } from '@/shared/layout/DashboardLayout.tsx'
import { PublicLayout } from '@/shared/layout/PublicLayout.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { LoginPage } from '@/features/auth/pages/LoginPage.tsx'
import { RegisterPage } from '@/features/auth/pages/RegisterPage.tsx'
import { BillingPage } from '@/features/dashboard/pages/BillingPage.tsx'
import { CreateProjectPage } from '@/features/dashboard/pages/CreateProjectPage.tsx'
import { DashboardTemplatesPage } from '@/features/dashboard/pages/DashboardTemplatesPage.tsx'
import { OverviewPage } from '@/features/dashboard/pages/OverviewPage.tsx'
import { ProfilePage } from '@/features/dashboard/pages/ProfilePage.tsx'
import { ProjectsPage } from '@/features/dashboard/pages/ProjectsPage.tsx'
import { HomePage } from '@/features/marketing/pages/HomePage.tsx'
import { PricingPage } from '@/features/marketing/pages/PricingPage.tsx'
import { SupportPage } from '@/features/marketing/pages/SupportPage.tsx'
import { TemplateDetailPage } from '@/features/marketing/pages/TemplateDetailPage.tsx'
import { TemplatesPage } from '@/features/marketing/pages/TemplatesPage.tsx'
import { WishExperiencePage } from '@/features/wish/pages/WishExperiencePage.tsx'
import { AdminLayout } from '@/features/admin/layout/AdminLayout.tsx'
import { AdminLoginPage } from '@/features/admin/pages/AdminLoginPage.tsx'
import { AdminOverviewPage } from '@/features/admin/pages/AdminOverviewPage.tsx'
import { AdminCustomersPage } from '@/features/admin/pages/AdminCustomersPage.tsx'
import { AdminWishesPage } from '@/features/admin/pages/AdminWishesPage.tsx'
import { AdminProfilePage } from '@/features/admin/pages/AdminProfilePage.tsx'
import { GuestRoute } from '@/app/router/GuestRoute.tsx'
import { ProtectedRoute } from '@/app/router/ProtectedRoute.tsx'
import { AdminRoute } from '@/app/router/AdminRoute.tsx'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.templates} element={<TemplatesPage />} />
          <Route path={ROUTES.templateDetail} element={<TemplateDetailPage />} />
          <Route path={ROUTES.support} element={<SupportPage />} />
          <Route path={ROUTES.pricing} element={<PricingPage />} />
        </Route>

        <Route path={ROUTES.wish} element={<WishExperiencePage />} />

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.register} element={<RegisterPage />} />
            <Route path={ROUTES.adminLogin} element={<AdminLoginPage />} />
          </Route>
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

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.admin} element={<AdminOverviewPage />} />
            <Route path={ROUTES.adminCustomers} element={<AdminCustomersPage />} />
            <Route path={ROUTES.adminWishes} element={<AdminWishesPage />} />
            <Route path={ROUTES.adminProfile} element={<AdminProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
