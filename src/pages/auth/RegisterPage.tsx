import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button.tsx'
import { Card } from '@/components/ui/Card.tsx'
import { Input } from '@/components/ui/Input.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { useAuth } from '@/hooks/useAuth.ts'

export function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Fill in your name, email and password to continue this preview.')
      return
    }

    login({
      id: 'user-preview',
      name: name.trim(),
      email: email.trim(),
    })
    navigate(ROUTES.dashboard, { replace: true })
  }

  return (
    <Card className="w-full max-w-md" padding="lg">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Begin</p>
      <h1 className="mt-2 font-display text-4xl text-navy">Create account</h1>
      <p className="mt-2 text-sm text-navy-muted">
        This is a local preview only. No account is stored on a server yet.
      </p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <Input label="Name" value={name} onChange={(event) => setName(event.target.value)} />
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
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" fullWidth>
          Create account
        </Button>
      </form>
      <p className="mt-6 text-sm text-navy-muted">
        Already have an account?{' '}
        <Link to={ROUTES.login} className="text-gold-deep hover:text-navy">
          Sign in
        </Link>
      </p>
    </Card>
  )
}
