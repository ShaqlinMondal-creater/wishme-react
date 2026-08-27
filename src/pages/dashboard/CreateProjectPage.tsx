import { useMemo, useState } from 'react'
import { EmptyState } from '@/components/common/EmptyState.tsx'
import { LoadingState } from '@/components/common/LoadingState.tsx'
import { OccasionCard } from '@/components/common/OccasionCard.tsx'
import { TemplateCard } from '@/components/common/TemplateCard.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { Modal } from '@/components/ui/Modal.tsx'
import { useOccasions } from '@/hooks/useOccasions.ts'
import { useTemplates } from '@/hooks/useTemplates.ts'
import type { OccasionSlug } from '@/types/occasion.ts'

export function CreateProjectPage() {
  const { data: occasions, isLoading: occasionsLoading } = useOccasions()
  const { data: templates, isLoading: templatesLoading } = useTemplates()
  const [occasion, setOccasion] = useState<OccasionSlug | null>(null)
  const [templateId, setTemplateId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const matchingTemplates = useMemo(
    () => templates?.filter((template) => template.occasion === occasion) ?? [],
    [occasion, templates],
  )

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">New wish</p>
      <h1 className="mt-2 font-display text-4xl text-navy">Create a project</h1>
      <p className="mt-2 max-w-2xl text-navy-muted">
        Select an occasion and a template. The editor, media uploads and publishing tools are
        intentionally not in this phase.
      </p>

      <h2 className="mt-10 font-display text-3xl text-navy">1. Occasion</h2>
      {occasionsLoading || !occasions ? (
        <LoadingState />
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {occasions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setOccasion(item.slug)
                setTemplateId(null)
              }}
              className="text-left"
            >
              <div className={occasion === item.slug ? 'rounded-3xl ring-2 ring-gold' : undefined}>
                <OccasionCard occasion={item} />
              </div>
            </button>
          ))}
        </div>
      )}

      <h2 className="mt-12 font-display text-3xl text-navy">2. Template</h2>
      {templatesLoading ? (
        <LoadingState />
      ) : !occasion ? (
        <EmptyState
          className="mt-5"
          title="Choose an occasion first"
          description="Templates will appear once you select the celebration this wish is for."
        />
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matchingTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              className="text-left"
              onClick={() => setTemplateId(template.id)}
            >
              <div className={templateId === template.id ? 'rounded-3xl ring-2 ring-gold' : undefined}>
                <TemplateCard template={template} />
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Button disabled={!occasion || !templateId} onClick={() => setIsModalOpen(true)}>
          Continue
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editor coming later"
      >
        <p className="text-sm leading-6 text-navy-muted">
          You have selected a starting point. Personalization, media, publishing, QR codes and
          privacy controls will be built on this foundation in future phases.
        </p>
        <Button className="mt-6" onClick={() => setIsModalOpen(false)}>
          Close
        </Button>
      </Modal>
    </div>
  )
}
