import { type FormEvent, useEffect, useState } from 'react'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { uploadProjectMedia, uploadTemplateMedia } from '@/services/uploads.service.ts'
import { ApiError, getApiErrorMessage } from '@/services/http.ts'
import type { Upload } from '@/shared/types/upload.ts'
import type { ContentFieldKind } from '@/views/wish/content/WishEditorContext.tsx'
import { isAudioSrc, isVideoSrc, resolveMedia } from '@/views/wish/content/builtinMedia.ts'

export type MediaOwner = {
  type: 'template' | 'project'
  id: number
}

export type ContentEditTarget = {
  path: string
  label: string
  kind: ContentFieldKind
  value: string | string[]
}

export function ContentEditModal({
  owner,
  target,
  onClose,
  onSave,
}: {
  owner: MediaOwner
  target: ContentEditTarget | null
  onClose: () => void
  onSave: (path: string, value: string | string[], upload?: Upload) => void
}) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!target) {
      return
    }

    setText(Array.isArray(target.value) ? target.value.join('\n\n') : target.value)
    setError('')
  }, [target])

  const saveText = (event: FormEvent) => {
    event.preventDefault()
    if (!target) {
      return
    }

    if (target.kind === 'lines') {
      onSave(
        target.path,
        text
          .split(/\n\s*\n/)
          .map((line) => line.trim())
          .filter(Boolean),
      )
      return
    }

    onSave(target.path, text)
  }

  const upload = async (file: File) => {
    if (!target) {
      return
    }

    setUploading(true)
    setError('')

    try {
      const form = new FormData()
      form.append('file', file)
      const payload =
        owner.type === 'project'
          ? await uploadProjectMedia(owner.id, form)
          : await uploadTemplateMedia(owner.id, form)
      const url = payload.upload?.url ?? payload.url

      if (!url) {
        throw new Error('The file was stored, but no URL came back.')
      }

      onSave(target.path, url, payload.upload)
    } catch (caught) {
      setError(getApiErrorMessage(caught))
      if (caught instanceof ApiError && caught.errors) {
        setError(caught.message)
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <Modal isOpen={target !== null} onClose={onClose} title={target ? `Edit ${target.label}` : 'Edit'}>
      {target?.kind === 'media' ? (
        <div className="space-y-3">
          {text ? (
            <div className="overflow-hidden rounded-2xl bg-ivory">
              {isAudioSrc(text) ? (
                <audio src={resolveMedia(text)} className="w-full p-3" controls />
              ) : isVideoSrc(text) ? (
                <video src={resolveMedia(text)} className="h-40 w-full object-cover" muted />
              ) : (
                <img src={resolveMedia(text)} alt="" className="h-40 w-full object-cover" />
              )}
            </div>
          ) : null}
          <Input
            label="Image, video, or audio file"
            hint="Saved in the uploads table, then this page uses that file."
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,audio/mpeg,audio/wav,audio/ogg,audio/mp4,audio/aac"
            inputSize="sm"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) {
                void upload(file)
              }
            }}
          />
          {uploading ? <p className="text-xs text-navy-muted">Uploading to uploads table…</p> : null}
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
          <div className="flex justify-end">
            <Button type="button" variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form className="space-y-3" onSubmit={saveText}>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-medium tracking-wide text-navy">{target?.label}</span>
            <textarea
              value={text}
              rows={target?.kind === 'text' ? 2 : 7}
              className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-sm text-navy outline-none focus:border-gold"
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          {target?.kind === 'lines' ? (
            <p className="text-xs text-navy-muted">Separate paragraphs with a blank line.</p>
          ) : null}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
