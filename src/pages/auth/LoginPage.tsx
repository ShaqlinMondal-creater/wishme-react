import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button.tsx'
import { Card } from '@/components/ui/Card.tsx'
import { Input } from '@/components/ui/Input.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { useAuth } from '@/hooks/useAuth.ts'

function getRedirectPath(state: unknown): string {
  if (
    state !== null &&
    typeof state === 'object' &&
    'from' in state &&
    typeof state.from === 'string' &&
    state.from.startsWith('/')
  ) {
    return state.from
  }

  return ROUTES.dashboard
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Enter an email and password to continue this preview.')
      return
    }

    login({
      id: 'user-preview',
      name: email.split('@')[0] || 'Guest',
      email: email.trim(),
    })
    navigate(getRedirectPath(location.state), { replace: true })
  }

  return (
    <Card className="w-full max-w-md" padding="lg">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Welcome back</p>
      <h1 className="mt-2 font-display text-4xl text-navy">Sign in</h1>
      <p className="mt-2 text-sm text-navy-muted">
        Authentication is a placeholder. Any email and password will open the dashboard.
      </p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" fullWidth>
          Continue
        </Button>
      </form>
      <p className="mt-6 text-sm text-navy-muted">
        New here?{' '}
        <Link to={ROUTES.register} className="text-gold-deep hover:text-navy">
          Create an account
        </Link>
      </p>
    </Card>
  )
}
