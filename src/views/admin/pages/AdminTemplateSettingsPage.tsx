import { type FormEvent, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  bulkCreateAdminOccasions,
  createAdminOccasion,
  deleteAdminOccasion,
  updateAdminOccasion,
  type OccasionInput,
} from '@/services/admin.service.ts'
import { uploadOccasionMedia } from '@/services/uploads.service.ts'
import { ApiError, firstFieldError, getApiErrorMessage } from '@/services/http.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { useOccasions } from '@/shared/hooks/useOccasions.ts'
import { occasionDefaultImage, occasionImageSrc, occasionTypeLabel } from '@/shared/lib/occasionDisplay.ts'
import { OCCASION_TYPES, OCCASION_TYPE_LABELS, type Occasion, type OccasionType } from '@/shared/types/occasion.ts'
import type { ApiErrorBag } from '@/services/types.ts'

export function AdminTemplateSettingsPage() {
  const queryClient = useQueryClient()
  const occasionsQuery = useOccasions()
  const occasions = occasionsQuery.data ?? []
  const [editing, setEditing] = useState<Occasion | 'new' | null>(null)
  const [removing, setRemoving] = useState<Occasion | null>(null)
  const [bulkMessage, setBulkMessage] = useState('')

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.occasions })
    void queryClient.invalidateQueries({ queryKey: queryKeys.templates })
    void queryClient.invalidateQueries({ queryKey: queryKeys.adminTemplates })
  }

  const bulkMutation = useMutation({
    mutationFn: bulkCreateAdminOccasions,
    onSuccess: (payload) => {
      refresh()
      setBulkMessage(
        `Created ${payload.created_count}, skipped ${payload.skipped_count}, linked ${payload.templates_linked} templates.`,
      )
    },
    onError: (caught) => {
      setBulkMessage(getApiErrorMessage(caught))
    },
  })

  return (
    <div className="mx-auto max-w-[90rem]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Catalogue</p>
          <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Occasions</h1>
          <p className="mt-2 text-navy-muted">
            Admin creates these. Templates pick an occasion by id. Thumbnail is an uploads row.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            isLoading={bulkMutation.isPending}
            onClick={() => bulkMutation.mutate()}
          >
            Create from JSON
          </Button>
          <Button onClick={() => setEditing('new')}>Add occasion</Button>
        </div>
      </div>

      {bulkMessage ? <p className="mt-4 text-sm text-navy-muted">{bulkMessage}</p> : null}

      {occasionsQuery.isLoading ? (
        <LoadingState label="Loading occasions…" />
      ) : occasionsQuery.isError ? (
        <EmptyState
          className="mt-8"
          title="Could not load occasions"
          description={getApiErrorMessage(occasionsQuery.error)}
          actionLabel="Try again"
          onAction={() => void occasionsQuery.refetch()}
        />
      ) : occasions.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No occasions yet"
          description="Hit Create from JSON to load Birthday, Anniversary, Bhai Phota, Raksha Bandhan, Proposal, and Dating from occasions.json. Or add one by one."
          actionLabel="Create from JSON"
          onAction={() => bulkMutation.mutate()}
        />
      ) : (
        <Card className="mt-8" padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-[48rem] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line/80 bg-ivory/70 text-xs tracking-[0.12em] text-navy-muted uppercase">
                  <th className="px-5 py-3 font-medium">Occasion</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                  <th className="px-5 py-3 font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {occasions.map((item) => (
                  <tr key={item.id} className="border-b border-line/60 last:border-0">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={occasionImageSrc(item)} alt="" className="h-12 w-16 rounded-xl object-cover" />
                        <p className="font-medium whitespace-nowrap text-navy">{item.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-navy-muted">{occasionTypeLabel(item.type)}</td>
                    <td className="px-5 py-3 text-navy-muted">{item.description}</td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        className="text-sm text-navy hover:text-gold-deep"
                        onClick={() => setEditing(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ml-4 text-sm text-red-700 hover:text-red-800"
                        onClick={() => setRemoving(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <OccasionFormModal
        occasion={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          refresh()
          setEditing(null)
        }}
      />
      <DeleteOccasionModal
        occasion={removing}
        onClose={() => setRemoving(null)}
        onDeleted={() => {
          refresh()
          setRemoving(null)
        }}
      />
    </div>
  )
}

function emptyForm(): OccasionInput {
  return {
    title: '',
    description: '',
    type: 'birthday',
  }
}

function OccasionFormModal({
  occasion,
  onClose,
  onSaved,
}: {
  occasion: Occasion | 'new' | null
  onClose: () => void
  onSaved: () => void
}) {
  const isNew = occasion === 'new'
  const [form, setForm] = useState<OccasionInput>(emptyForm)
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<ApiErrorBag>()

  useEffect(() => {
    if (occasion === null) {
      return
    }

    setForm(
      occasion === 'new'
        ? emptyForm()
        : { title: occasion.title, description: occasion.description, type: occasion.type },
    )
    setFile(null)
    setFilePreview(null)
    setError('')
    setFieldErrors(undefined)
  }, [occasion])

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview)
      }
    }
  }, [filePreview])

  const savedPreview =
    occasion && occasion !== 'new' && occasion.type === form.type ? occasion.thumbnail_url : null
  const preview = filePreview ?? savedPreview ?? occasionDefaultImage(form.type)

  const mutation = useMutation({
    mutationFn: async () => {
      if (occasion === null) {
        throw new Error('No occasion selected.')
      }

      const saved =
        occasion === 'new' ? await createAdminOccasion(form) : await updateAdminOccasion(occasion.id, form)

      if (file) {
        const body = new FormData()
        body.append('file', file)
        await uploadOccasionMedia(saved.occasion.id, body)
      }

      return saved
    },
    onSuccess: onSaved,
    onError: (caught) => {
      setError(getApiErrorMessage(caught))
      setFieldErrors(caught instanceof ApiError ? caught.errors : undefined)
    },
  })

  return (
    <Modal
      isOpen={occasion !== null}
      onClose={onClose}
      title={isNew ? 'Add occasion' : 'Edit occasion'}
      className="max-w-xl"
    >
      <form
        className="space-y-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        <Input
          label="Title"
          inputSize="sm"
          value={form.title}
          error={firstFieldError(fieldErrors, 'title')}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
        />
        <Input
          label="Description"
          inputSize="sm"
          value={form.description}
          error={firstFieldError(fieldErrors, 'description')}
          onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
        />
        <div className="flex w-full flex-col gap-1.5 text-left">
          <label htmlFor="occasion-type" className="text-xs font-medium tracking-wide text-navy">
            Type
          </label>
          <select
            id="occasion-type"
            value={form.type}
            onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as OccasionType }))}
            className="h-11 rounded-2xl border border-line bg-ivory px-3 text-sm text-navy outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)] sm:h-10"
          >
            {OCCASION_TYPES.map((type) => (
              <option key={type} value={type}>
                {OCCASION_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          {firstFieldError(fieldErrors, 'type') ? (
            <span className="text-sm text-red-600">{firstFieldError(fieldErrors, 'type')}</span>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-1.5 text-left">
          <label htmlFor="occasion-thumb" className="text-xs font-medium tracking-wide text-navy">
            Thumbnail
          </label>
          <img src={preview} alt="" className="h-36 w-full rounded-2xl object-cover" />
          <input
            id="occasion-thumb"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => {
              const next = event.target.files?.[0] ?? null
              setFile(next)
              setFilePreview((current) => {
                if (current) {
                  URL.revokeObjectURL(current)
                }
                return next ? URL.createObjectURL(next) : null
              })
            }}
            className="text-sm text-navy"
          />
          <p className="text-xs text-navy-muted">
            Default image for this type shows until you choose a file. JPG, PNG, WEBP, or GIF.
          </p>
        </div>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={mutation.isPending}>
            {isNew ? 'Create' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function DeleteOccasionModal({
  occasion,
  onClose,
  onDeleted,
}: {
  occasion: Occasion | null
  onClose: () => void
  onDeleted: () => void
}) {
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [occasion])

  const mutation = useMutation({
    mutationFn: () => {
      if (!occasion) {
        throw new Error('No occasion selected.')
      }
      return deleteAdminOccasion(occasion.id)
    },
    onSuccess: onDeleted,
    onError: (caught) => setError(getApiErrorMessage(caught)),
  })

  return (
    <Modal isOpen={occasion !== null} onClose={onClose} title="Delete occasion">
      <p className="text-sm leading-6 text-navy-muted">
        Remove {occasion?.title}? This only works if no template uses it.
      </p>
      {error ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}
      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" isLoading={mutation.isPending} onClick={() => mutation.mutate()}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
