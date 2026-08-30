import { Link } from 'react-router-dom'
import { Logo } from '@/shared/components/common/Logo.tsx'
import { PageContainer } from '@/shared/layout/PageContainer.tsx'
import { APP_NAME, PARENT_BRAND } from '@/shared/constants/config.ts'
import { ROUTES } from '@/shared/constants/routes.ts'

const footerLinks = [
  { to: ROUTES.templates, label: 'Templates' },
  { to: ROUTES.support, label: 'Support' },
  { to: ROUTES.pricing, label: 'Pricing' },
  { to: ROUTES.login, label: 'Sign in' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-cream">
      <PageContainer width="wide" className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-navy-muted">
            Personalized digital wishes — a quieter, more emotional companion to {PARENT_BRAND}.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-navy-muted hover:text-navy">
              {link.label}
            </Link>
          ))}
        </div>
      </PageContainer>
      <div className="border-t border-line/80">
        <PageContainer width="wide" className="flex flex-col gap-2 py-5 text-xs tracking-wide text-navy-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. A {PARENT_BRAND} product.
          </p>
          <p>wishme.liwaas.com</p>
        </PageContainer>
      </div>
    </footer>
  )
}
