import { NavLink, Link } from 'react-router-dom'
import { Logo } from '@/components/common/Logo.tsx'
import { getButtonClasses } from '@/components/ui/buttonStyles.ts'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { useAuth } from '@/hooks/useAuth.ts'
import { cn } from '@/utils/cn.ts'

const navItems = [
  { to: ROUTES.templates, label: 'Templates' },
  { to: ROUTES.pricing, label: 'Pricing' },
]

export function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <PageContainer className="flex min-h-16 items-center justify-between gap-4 py-3" width="wide">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
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
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <Link to={ROUTES.dashboard} className={getButtonClasses({ size: 'sm' })}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to={ROUTES.login}
                className={getButtonClasses({ variant: 'ghost', size: 'sm', className: 'hidden sm:inline-flex' })}
              >
                Sign in
              </Link>
              <Link to={ROUTES.createProject} className={getButtonClasses({ size: 'sm' })}>
                Create a wish
              </Link>
            </>
          )}
        </div>
      </PageContainer>
    </header>
  )
}
