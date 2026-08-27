export const ROUTES = {
  home: '/',
  templates: '/templates',
  pricing: '/pricing',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  projects: '/projects',
  createProject: '/projects/create',
  dashboardTemplates: '/dashboard/templates',
  billing: '/dashboard/billing',
  profile: '/dashboard/profile',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
