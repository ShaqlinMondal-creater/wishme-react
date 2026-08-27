import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button.tsx'
import { Card } from '@/components/ui/Card.tsx'
import { Input } from '@/components/ui/Input.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { useAuth } from '@/hooks/useAuth.ts'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Account</p>
      <h1 className="mt-2 font-display text-4xl text-navy">Profile</h1>
      <Card className="mt-8 space-y-4">
        <Input label="Name" value={user?.name ?? ''} readOnly />
        <Input label="Email" value={user?.email ?? ''} readOnly />
        <p className="text-sm text-navy-muted">
          Profile editing and Laravel authentication will connect here later.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            logout()
            navigate(ROUTES.home)
          }}
        >
          Sign out
        </Button>
      </Card>
    </div>
  )
}
