export const APP_NAME = 'WISHME'
export const PARENT_BRAND = 'LIWAAS'
export const APP_DOMAIN = 'wishme.liwaas.com'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.liwaas.com/api/wishme'

export const APP_URL = import.meta.env.VITE_APP_URL ?? `https://${APP_DOMAIN}`
