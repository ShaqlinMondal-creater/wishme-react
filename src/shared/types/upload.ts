export type UploadKind = 'image' | 'video' | 'audio'

export type Upload = {
  id: number
  user_id: number
  template_id: number | null
  project_id: number | null
  occasion_id: number | null
  kind: UploadKind
  disk: string
  path: string
  url: string
  original_name: string
  mime: string
  size: number
  created_at?: string
  updated_at?: string
}

export type UploadPayload = {
  upload: Upload
  url: string
  path: string
}

export type UploadsPayload = {
  uploads: Upload[]
}
