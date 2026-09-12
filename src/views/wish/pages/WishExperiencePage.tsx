import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { WishClosed, WishShell } from '@/views/wish/components/WishShell.tsx'
import { getDemoWish } from '@/views/wish/data/demoWishes.ts'
import '@/views/wish/styles/wish-experience.css'
import {
  demoPath,
  isWishStillOpen,
  isWishTokenFormat,
  MIDNIGHT_TOAST_DEMO_TOKEN,
  MIDNIGHT_TOAST_SLUG,
} from '@/shared/constants/routes.ts'

export function WishExperiencePage() {
  const { token = '' } = useParams()

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  if (token === MIDNIGHT_TOAST_DEMO_TOKEN) {
    return <Navigate to={demoPath(MIDNIGHT_TOAST_SLUG)} replace />
  }

  const wish = getDemoWish(token)

  if (!isWishTokenFormat(token) || !wish) {
    return <WishClosed reason="invalid" />
  }

  if (!isWishStillOpen(wish.wishedAt, wish.ttlHours)) {
    return <WishClosed reason="expired" />
  }

  return <WishShell wish={wish} />
}
