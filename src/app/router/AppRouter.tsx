import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '@/views/auth/layout/AuthLayout.tsx'
import { DashboardLayout } from '@/views/customer/layout/DashboardLayout.tsx'
import { PublicLayout } from '@/views/public/layout/PublicLayout.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { LoginPage } from '@/views/auth/pages/LoginPage.tsx'
import { RegisterPage } from '@/views/auth/pages/RegisterPage.tsx'
import { BillingPage } from '@/views/customer/pages/BillingPage.tsx'
import { CreateProjectPage } from '@/views/customer/pages/CreateProjectPage.tsx'
import { DashboardTemplatesPage } from '@/views/customer/pages/DashboardTemplatesPage.tsx'
import { OverviewPage } from '@/views/customer/pages/OverviewPage.tsx'
import { ProfilePage } from '@/views/customer/pages/ProfilePage.tsx'
import { ProjectsPage } from '@/views/customer/pages/ProjectsPage.tsx'
import { HomePage } from '@/views/public/pages/HomePage.tsx'
import { PricingPage } from '@/views/public/pages/PricingPage.tsx'
import { SupportPage } from '@/views/public/pages/SupportPage.tsx'
import { TemplateDetailPage } from '@/views/public/pages/TemplateDetailPage.tsx'
import { TemplatesPage } from '@/views/public/pages/TemplatesPage.tsx'
import { WishExperiencePage } from '@/views/wish/pages/WishExperiencePage.tsx'
import { AdminLayout } from '@/views/admin/layout/AdminLayout.tsx'
import { AdminLoginPage } from '@/views/auth/pages/AdminLoginPage.tsx'
import { AdminOverviewPage } from '@/views/admin/pages/AdminOverviewPage.tsx'
import { AdminCustomersPage } from '@/views/admin/pages/AdminCustomersPage.tsx'
import { AdminWishesPage } from '@/views/admin/pages/AdminWishesPage.tsx'
import { AdminProfilePage } from '@/views/admin/pages/AdminProfilePage.tsx'
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
