import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTemplate } from '@/services/catalog.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { WishClosed, WishShell } from '@/views/wish/components/WishShell.tsx'
import { createCatalogueWish } from '@/views/wish/data/demoWishes.ts'
import { contentForTemplate } from '@/views/wish/content/mergeContent.ts'
import { templateOccasionTitle } from '@/shared/lib/occasionDisplay.ts'
import '@/views/wish/styles/wish-experience.css'

export function TemplateDemoPage() {
  const { slug = '' } = useParams()
  const templateSlug = slug.trim().toLowerCase()

  const templateQuery = useQuery({
    queryKey: [...queryKeys.templates, templateSlug],
    queryFn: () => getTemplate(templateSlug),
    enabled: templateSlug !== '',
  })

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  if (templateSlug === '') {
    return <WishClosed reason="invalid" />
  }

  if (templateQuery.isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#070f1c] text-sm tracking-wide text-gold">
        Opening the night…
      </div>
    )
  }

  const template = templateQuery.data

  if (templateQuery.isError || !template) {
    return <WishClosed reason="invalid" />
  }

  const content = contentForTemplate(template)
  const wish = createCatalogueWish(
    {
      slug: template.slug,
      name: template.name,
      occasion: templateOccasionTitle(template),
    },
    content,
  )

  return <WishShell wish={wish} content={content} rooms={template} />
}
