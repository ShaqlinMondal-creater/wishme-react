import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/features/auth/hooks/useAuth.ts'
import { DEMO_ADMIN } from '@/features/auth/data/demoAccounts.ts'

export function AdminProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const profile = user ?? DEMO_ADMIN.user

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Staff</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Profile</h1>
      <Card className="mt-8 space-y-4">
        <Input label="Name" value={profile.name} readOnly />
        <Input label="Email" value={profile.email} readOnly />
        <Input label="Mobile" value={profile.mobile_no ?? '—'} readOnly />
        <Input label="Role" value="Admin" readOnly />
        <p className="text-sm text-navy-muted">Demo staff account. Editing and invitations come later.</p>
        <Button
          variant="secondary"
          onClick={() => {
            void logout().then(() => navigate(ROUTES.adminLogin))
          }}
        >
          Sign out
        </Button>
      </Card>
    </div>
  )
}
