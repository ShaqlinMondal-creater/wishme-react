import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/Button.tsx'
import type { TemplateContent } from '@/shared/types/templateContent.ts'
import type { Upload } from '@/shared/types/upload.ts'
import type { TemplateRoomFlags } from '@/shared/lib/templateDisplay.ts'
import { ContentEditModal, type ContentEditTarget, type MediaOwner } from '@/views/admin/components/ContentEditModal.tsx'
import { WishShell } from '@/views/wish/components/WishShell.tsx'
import { createCatalogueWish } from '@/views/wish/data/demoWishes.ts'
import { getByPath } from '@/views/wish/content/mergeContent.ts'
import type { ContentFieldKind } from '@/views/wish/content/WishEditorContext.tsx'
import { isAudioSrc, isVideoSrc, resolveMedia } from '@/views/wish/content/builtinMedia.ts'
import '@/views/wish/styles/wish-experience.css'

export function WishContentStudio({
  backTo,
  backLabel,
  heading,
  owner,
  templateName,
  rooms,
  content,
  uploads,
  target,
  savedMessage,
  saveError,
  isSaving,
  onSaveAll,
  onEditClose,
  onPersist,
  onEdit,
}: {
  backTo: string
  backLabel: string
  heading: string
  owner: MediaOwner
  templateName: string
  rooms?: Partial<TemplateRoomFlags> | null
  content: TemplateContent
  uploads: Upload[]
  target: ContentEditTarget | null
  savedMessage: string
  saveError?: string
  isSaving: boolean
  onSaveAll: () => void
  onEditClose: () => void
  onPersist: (path: string, value: string | string[], upload?: Upload) => void
  onEdit: (target: ContentEditTarget) => void
}) {
  const wish = createCatalogueWish({ slug: owner.type, name: templateName }, content)

  return (
    <div className="relative min-h-svh bg-[#070f1c]">
      <div className="absolute inset-x-0 top-0 z-40 bg-black/45 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link to={backTo} className="rounded-full border border-gold/40 px-3 py-1.5 text-xs text-gold">
            {backLabel}
          </Link>
          <p className="min-w-0 truncate text-sm text-white">
            {heading} · {uploads.length} file{uploads.length === 1 ? '' : 's'} in uploads
          </p>
          <Button size="sm" isLoading={isSaving} onClick={onSaveAll}>
            Save content
          </Button>
        </div>
        {uploads.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto px-4 pb-3">
            {uploads.map((file) => (
              <div
                key={file.id}
                className="flex shrink-0 items-center gap-2 rounded-full border border-gold/30 bg-black/40 py-1 pr-3 pl-1 text-[10px] text-gold-soft"
              >
                <UploadThumb file={file} />
                <span>
                  #{file.id} {file.kind}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {savedMessage || saveError ? (
        <p className="absolute top-14 right-4 z-40 text-xs text-gold">{saveError || savedMessage}</p>
      ) : null}
      <div className={uploads.length > 0 ? 'pt-28' : 'pt-14'}>
        <WishShell
          wish={{
            ...wish,
            templateName,
            recipient: content.gate.recipient,
            from: content.gate.from,
          }}
          content={content}
          rooms={rooms}
          editor={{
            enabled: true,
            onEdit: (path, label, kind: ContentFieldKind) => {
              const value = getByPath(content, path)
              onEdit({
                path,
                label,
                kind,
                value: Array.isArray(value) ? value.filter((item) => typeof item === 'string') : String(value ?? ''),
              })
            },
          }}
        />
      </div>
      <ContentEditModal owner={owner} target={target} onClose={onEditClose} onSave={onPersist} />
    </div>
  )
}

function UploadThumb({ file }: { file: Upload }) {
  if (file.kind === 'audio' || isAudioSrc(file.url)) {
    return <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-[9px] text-navy">♪</span>
  }

  if (file.kind === 'video' || isVideoSrc(file.url)) {
    return <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-[9px] text-navy">▶</span>
  }

  return <img src={resolveMedia(file.url)} alt="" className="h-7 w-7 rounded-full object-cover" />
}
