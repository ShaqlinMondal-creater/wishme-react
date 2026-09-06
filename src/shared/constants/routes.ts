export const ROUTES = {
  home: '/',
  templates: '/templates',
  templateDetail: '/templates/:templateId',
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
  adminCustomers: '/admin/customers',
  adminWishes: '/admin/wishes',
  adminProfile: '/admin/profile',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const WISH_TOKEN_LENGTH = 22
export const WISH_TTL_HOURS = 72
export const MIDNIGHT_TOAST_DEMO_TOKEN = 'Wm7kQ2nR9xL4pY8cH3vB6t'

export function templatePath(templateId: string) {
  return `/templates/${templateId}`
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

  return now >= start && now < start + ttlHours * 60 * 60 * 1000
}

export function templateOpenTarget(templateId: string) {
  if (templateId === 'tpl-midnight-toast') {
    return { to: wishPath(MIDNIGHT_TOAST_DEMO_TOKEN), openInNewTab: true }
  }

  return { to: templatePath(templateId), openInNewTab: false }
}

export function homePathForRole(role?: string | null) {
  return role === 'admin' ? ROUTES.admin : ROUTES.dashboard
}

export function createWishPath(templateId?: string) {
  if (!templateId) {
    return ROUTES.createProject
  }

  return `${ROUTES.createProject}?template=${encodeURIComponent(templateId)}`
}
