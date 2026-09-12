export const ROUTES = {
  home: '/',
  templates: '/templates',
  templateDetail: '/templates/:templateId',
  templateDemo: '/demo/:slug',
  wish: '/w/:token',
  support: '/support',
  pricing: '/pricing',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  projects: '/projects',
  createProject: '/projects/create',
  dashboardTemplates: '/dashboard/templates',
  billing: '/dashboard/billing',
  profile: '/dashboard/profile',
  adminLogin: '/admin/login',
  admin: '/admin',
  adminUsers: '/admin/users',
  adminCustomers: '/admin/customers',
  adminWishes: '/admin/wishes',
  adminAccounts: '/admin/accounts',
  adminCoupons: '/admin/coupons',
  adminBills: '/admin/bills',
  adminPlans: '/admin/plans',
  adminTemplates: '/admin/templates',
  adminTemplateSettings: '/admin/template-settings',
  adminTemplateContent: '/admin/templates/:id/content',
  projectContent: '/projects/:id/content',
  adminLogs: '/admin/logs',
  adminProfile: '/admin/profile',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const WISH_TOKEN_LENGTH = 22
export const WISH_TTL_HOURS = 72
export const MIDNIGHT_TOAST_DEMO_TOKEN = 'Wm7kQ2nR9xL4pY8cH3vB6t'
export const MIDNIGHT_TOAST_SLUG = 'midnight-toast'

export function templatePath(templateSlug: string) {
  return `/templates/${templateSlug}`
}

export function demoPath(slug: string) {
  return `/demo/${slug}`
}

export function wishPath(token: string) {
  return `/w/${token}`
}

export function isWishTokenFormat(token: string) {
  return /^[A-Za-z0-9]{22}$/.test(token)
}

export function isWishStillOpen(wishedAtIso: string, ttlHours = WISH_TTL_HOURS, now = Date.now()) {
  const start = new Date(wishedAtIso).getTime()
  if (Number.isNaN(start)) {
    return false
  }

  return now >= start && now < ttlHours * 60 * 60 * 1000 + start
}

export function templateOpenTarget(slug: string) {
  return { to: demoPath(slug), openInNewTab: true }
}

export function homePathForRole(role?: string | null) {
  return role === 'admin' ? ROUTES.admin : ROUTES.dashboard
}

export function adminTemplateContentPath(id: number) {
  return `/admin/templates/${id}/content`
}

export function projectContentPath(id: number) {
  return `/projects/${id}/content`
}

export function createWishPath(templateSlug?: string) {
  if (!templateSlug) {
    return ROUTES.createProject
  }

  return `${ROUTES.createProject}?template=${encodeURIComponent(templateSlug)}`
}
