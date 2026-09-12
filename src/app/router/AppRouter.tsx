import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '@/views/auth/layout/AuthLayout.tsx'
import { DashboardLayout } from '@/views/customer/layout/DashboardLayout.tsx'
import { PublicLayout } from '@/views/public/layout/PublicLayout.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { LoginPage } from '@/views/auth/pages/LoginPage.tsx'
import { RegisterPage } from '@/views/auth/pages/RegisterPage.tsx'
import { BillingPage } from '@/views/customer/pages/BillingPage.tsx'
import { CreateProjectPage } from '@/views/customer/pages/CreateProjectPage.tsx'
import { CustomerProjectContentPage } from '@/views/customer/pages/CustomerProjectContentPage.tsx'
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
import { TemplateDemoPage } from '@/views/wish/pages/TemplateDemoPage.tsx'
import { AdminLayout } from '@/views/admin/layout/AdminLayout.tsx'
import { AdminLoginPage } from '@/views/auth/pages/AdminLoginPage.tsx'
import { AdminOverviewPage } from '@/views/admin/pages/AdminOverviewPage.tsx'
import { AdminUsersPage } from '@/views/admin/pages/AdminUsersPage.tsx'
import { AdminWishesPage } from '@/views/admin/pages/AdminWishesPage.tsx'
import { AdminAccountsPage } from '@/views/admin/pages/AdminAccountsPage.tsx'
import { AdminCouponsPage } from '@/views/admin/pages/AdminCouponsPage.tsx'
import { AdminBillsPage } from '@/views/admin/pages/AdminBillsPage.tsx'
import { AdminPlansPage } from '@/views/admin/pages/AdminPlansPage.tsx'
import { AdminTemplatesPage } from '@/views/admin/pages/AdminTemplatesPage.tsx'
import { AdminTemplateSettingsPage } from '@/views/admin/pages/AdminTemplateSettingsPage.tsx'
import { AdminTemplateContentPage } from '@/views/admin/pages/AdminTemplateContentPage.tsx'
import { AdminLogsPage } from '@/views/admin/pages/AdminLogsPage.tsx'
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

        <Route path={ROUTES.templateDemo} element={<TemplateDemoPage />} />
        <Route path={ROUTES.wish} element={<WishExperiencePage />} />

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.register} element={<RegisterPage />} />
            <Route path={ROUTES.adminLogin} element={<AdminLoginPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.projectContent} element={<CustomerProjectContentPage />} />
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
          <Route path={ROUTES.adminTemplateContent} element={<AdminTemplateContentPage />} />
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.admin} element={<AdminOverviewPage />} />
            <Route path={ROUTES.adminUsers} element={<AdminUsersPage />} />
            <Route path={ROUTES.adminCustomers} element={<Navigate to={ROUTES.adminUsers} replace />} />
            <Route path={ROUTES.adminWishes} element={<AdminWishesPage />} />
            <Route path={ROUTES.adminAccounts} element={<AdminAccountsPage />} />
            <Route path={ROUTES.adminCoupons} element={<AdminCouponsPage />} />
            <Route path={ROUTES.adminBills} element={<AdminBillsPage />} />
            <Route path={ROUTES.adminPlans} element={<AdminPlansPage />} />
            <Route path={ROUTES.adminTemplates} element={<AdminTemplatesPage />} />
            <Route path={ROUTES.adminTemplateSettings} element={<AdminTemplateSettingsPage />} />
            <Route path={ROUTES.adminLogs} element={<AdminLogsPage />} />
            <Route path={ROUTES.adminProfile} element={<AdminProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
