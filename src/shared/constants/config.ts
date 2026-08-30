export const APP_NAME = 'WISHME'
export const PARENT_BRAND = 'LIWAAS'
export const APP_DOMAIN = 'wishme.liwaas.com'

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? 'https://api-wishme.liwaas.com/api'
).replace(/\/$/, '')

export const APP_URL = import.meta.env.VITE_APP_URL ?? `https://${APP_DOMAIN}`

export const AUTH_STORAGE_KEY = 'wishme.auth'
export const SUPPORT_EMAIL = 'hello@liwaas.com'
