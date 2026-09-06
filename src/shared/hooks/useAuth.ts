import { getProfile, login as loginRequest, logout as logoutRequest, register as registerRequest } from '@/services/auth.service.ts'
import { useAuthStore } from '@/shared/store/authStore.ts'

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  const login = async (email: string, password: string, role: 'customer' | 'admin' = 'customer') => {
    const payload = await loginRequest(email, password, role)
    setSession(payload.user, payload.token)
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    const payload = await registerRequest(name, email, password, passwordConfirmation)
    setSession(payload.user, payload.token)
  }

  const logout = async () => {
    try {
      await logoutRequest()
    } catch {
      // Local session is cleared even if the API is unreachable.
    } finally {
      clearSession()
    }
  }

  const refreshProfile = async () => {
    const payload = await getProfile()
    if (token) {
      setSession(payload.user, token)
    }
    return payload
  }

  return { user, token, isAuthenticated, login, register, logout, refreshProfile }
}
