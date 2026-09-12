import { createContext, useContext, type ReactNode } from 'react'
import type { TemplateContent, WishRoomId } from '@/shared/types/templateContent.ts'

export type ContentFieldKind = 'text' | 'textarea' | 'media' | 'lines'

export type WishEditorValue = {
  enabled: boolean
  content: TemplateContent
  enabledRooms: WishRoomId[]
  onEdit: (path: string, label: string, kind: ContentFieldKind) => void
}

const WishEditorContext = createContext<WishEditorValue | null>(null)

export function WishEditorProvider({
  value,
  children,
}: {
  value: WishEditorValue
  children: ReactNode
}) {
  return <WishEditorContext.Provider value={value}>{children}</WishEditorContext.Provider>
}

export function useWishEditor() {
  return useContext(WishEditorContext)
}
