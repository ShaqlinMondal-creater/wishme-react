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
import { OccasionCard } from '@/shared/components/common/OccasionCard.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { useOccasions } from '@/shared/hooks/useOccasions.ts'
import { cn } from '@/shared/lib/cn.ts'
import { occasionDefaultImage } from '@/shared/lib/occasionDisplay.ts'
import { OCCASION_TYPES, OCCASION_TYPE_LABELS, type Occasion, type OccasionType } from '@/shared/types/occasion.ts'
import type { ApiErrorBag } from '@/services/types.ts'

export function AdminTemplateSettingsPage() {
  const queryClient = useQueryClient()
  const occasionsQuery = useOccasions()
  const occasions = occasionsQuery.data ?? []
  const [typeFilter, setTypeFilter] = useState<OccasionType | 'all'>('all')
  const [editing, setEditing] = useState<Occasion | 'new' | null>(null)
  const [removing, setRemoving] = useState<Occasion | null>(null)
  const [bulkMessage, setBulkMessage] = useState('')
  const visible =
    typeFilter === 'all' ? occasions : occasions.filter((item) => item.type === typeFilter)

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

      <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <FilterChip label="All" isActive={typeFilter === 'all'} onClick={() => setTypeFilter('all')} />
        {OCCASION_TYPES.map((type) => (
          <FilterChip
            key={type}
            label={OCCASION_TYPE_LABELS[type]}
            isActive={typeFilter === type}
            onClick={() => setTypeFilter(type)}
          />
        ))}
      </div>

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
      ) : visible.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="Nothing in this type"
          description="Switch the filter, or add an occasion for this type."
          actionLabel="Add occasion"
          onAction={() => setEditing('new')}
        />
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <OccasionCard
              key={item.id}
              occasion={item}
              actions={
                <>
                  <button
                    type="button"
                    aria-label={`Edit ${item.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy shadow-soft hover:bg-gold"
                    onClick={() => setEditing(item)}
                  >
                    <PencilIcon />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${item.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-700 shadow-soft hover:bg-red-50"
                    onClick={() => setRemoving(item)}
                  >
                    <TrashIcon />
                  </button>
                </>
              }
            />
          ))}
        </div>
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

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-4 py-2 text-sm',
        isActive ? 'bg-navy text-white' : 'bg-white text-navy-muted',
      )}
    >
      {label}
    </button>
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
      titleClassName="text-2xl"
    >
      <form
        className="space-y-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        <div className="grid gap-3 sm:grid-cols-[9.5rem_1fr] sm:items-start">
          <label className="group relative block cursor-pointer overflow-hidden rounded-2xl ring-1 ring-line">
            <img src={preview} alt="" className="h-36 w-full object-cover sm:h-40" />
            <span className="absolute inset-0 flex items-end bg-linear-to-t from-navy/75 via-navy/10 to-transparent p-2.5 text-[10px] tracking-[0.16em] text-white uppercase">
              Change photo
            </span>
            <input
              id="occasion-thumb"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
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
            />
          </label>
          <div className="space-y-2.5">
            <Input
              label="Title"
              inputSize="sm"
              value={form.title}
              error={firstFieldError(fieldErrors, 'title')}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
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
          </div>
        </div>

        <label className="flex w-full flex-col gap-1.5 text-left">
          <span className="text-xs font-medium tracking-wide text-navy">Description</span>
          <textarea
            rows={2}
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            className="w-full resize-none rounded-2xl border border-line bg-ivory px-3 py-2 text-sm text-navy outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)]"
          />
          {firstFieldError(fieldErrors, 'description') ? (
            <span className="text-sm text-red-600">{firstFieldError(fieldErrors, 'description')}</span>
          ) : null}
        </label>

        {error ? <p className="text-xs text-red-600">{error}</p> : null}

        <div className="flex items-center justify-end gap-2 border-t border-line/80 pt-3">
          <Button type="button" size="sm" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={mutation.isPending}>
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

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M4 20h4.2L19 9.2 14.8 5 4 15.8V20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m13.5 6.3 4.2 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 7h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 7V5h4v2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M7 7l1 12h8l1-12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 11v5M14 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
