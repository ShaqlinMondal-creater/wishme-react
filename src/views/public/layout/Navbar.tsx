import { NavLink, Link } from 'react-router-dom'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { getButtonClasses } from '@/shared/components/ui/buttonStyles.ts'
import { PageContainer } from '@/shared/components/layout/PageContainer.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import { cn } from '@/shared/lib/cn.ts'

const navItems = [
  { to: ROUTES.templates, label: 'Templates' },
  { to: ROUTES.support, label: 'Support' },
  { to: ROUTES.pricing, label: 'Pricing' },
]

export function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <PageContainer className="flex min-h-16 items-center justify-between gap-3 py-3" width="wide">
        <div className="min-[420px]:hidden">
          <Logo compact />
        </div>
        <div className="hidden min-[420px]:block">
          <Logo />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to !== ROUTES.templates}
              className={({ isActive }) =>
                cn(
                  'text-sm tracking-wide transition-colors',
                  isActive ? 'text-gold-deep' : 'text-navy-muted hover:text-navy',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="hidden sm:block">
              <Link to={ROUTES.dashboard} className={getButtonClasses({ size: 'sm' })}>
                Dashboard
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <Link to={ROUTES.login} className={getButtonClasses({ variant: 'ghost', size: 'sm' })}>
                  Sign in
                </Link>
              </div>
              <div className="hidden sm:block">
                <Link to={ROUTES.createProject} className={getButtonClasses({ size: 'sm' })}>
                  Create a wish
                </Link>
              </div>
            </>
          )}
        </div>
      </PageContainer>
    </header>
  )
}
