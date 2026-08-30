import { useAuthStore } from '@/features/auth/store/authStore.ts'
import { fetchProfile, loginRequest, logoutRequest, registerRequest } from '@/features/auth/api/auth.ts'

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  const login = async (email: string, password: string) => {
    const payload = await loginRequest(email, password)
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
      if (token) {
        await logoutRequest()
      }
    } catch {
      // Local session is cleared even if the API is unreachable.
    } finally {
      clearSession()
    }
  }

  const refreshProfile = async () => {
    const payload = await fetchProfile()
    if (token) {
      setSession(payload.user, token)
    }
  }

  return { user, token, isAuthenticated, login, register, logout, refreshProfile }
}
