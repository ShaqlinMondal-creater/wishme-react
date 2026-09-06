import { AUTH_STORAGE_KEY } from '@/shared/constants/config.ts'
import type { User } from '@/shared/types/user.ts'
import { create } from 'zustand'

type StoredAuth = {
  user: User
  token: string
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setSession: (user: User, token: string) => void
  clearSession: () => void
}

function readStoredAuth(): StoredAuth | null {
  if (typeof localStorage === 'undefined') {
    return null
  }

  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as Partial<StoredAuth>
    if (!parsed.token || !parsed.user || typeof parsed.user.id !== 'number') {
      return null
    }

    return { user: parsed.user, token: parsed.token }
  } catch {
    return null
  }
}

function writeStoredAuth(session: StoredAuth | null): void {
  if (typeof localStorage === 'undefined') {
    return
  }

  if (session === null) {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

const stored = readStoredAuth()

export const useAuthStore = create<AuthState>((set) => ({
  user: stored?.user ?? null,
  token: stored?.token ?? null,
  isAuthenticated: stored !== null,
  setSession: (user, token) => {
    writeStoredAuth({ user, token })
    set({ user, token, isAuthenticated: true })
  },
  clearSession: () => {
    writeStoredAuth(null)
    set({ user: null, token: null, isAuthenticated: false })
  },
}))
