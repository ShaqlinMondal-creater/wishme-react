import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { WishClosed, WishPlayer } from '@/features/wish/components/WishPlayer.tsx'
import { getDemoWish } from '@/features/wish/data/demoWishes.ts'
import '@/features/wish/styles/wish-experience.css'
import { isWishStillOpen, isWishTokenFormat } from '@/shared/constants/routes.ts'

export function WishExperiencePage() {
  const { token = '' } = useParams()
  const wish = getDemoWish(token)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  if (!isWishTokenFormat(token) || !wish) {
    return <WishClosed reason="invalid" />
  }

  if (!isWishStillOpen(wish.wishedAt, wish.ttlHours)) {
    return <WishClosed reason="expired" />
  }

  return <WishPlayer wish={wish} />
}
