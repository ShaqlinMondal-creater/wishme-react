import { apiClient } from '@/services/http.ts'
import type { Occasion } from '@/shared/types/occasion.ts'
import type { Template } from '@/shared/types/template.ts'
import type { UploadPayload, UploadsPayload } from '@/shared/types/upload.ts'

export async function fetchTemplateUploads(templateId: number): Promise<UploadsPayload> {
  return apiClient<UploadsPayload>(`/admin/templates/${templateId}/uploads`)
}

export async function uploadTemplateMedia(templateId: number, body: FormData): Promise<UploadPayload> {
  return apiClient<UploadPayload>(`/admin/templates/${templateId}/media`, {
    method: 'POST',
    body,
  })
}

export async function fetchProjectUploads(projectId: number): Promise<UploadsPayload> {
  return apiClient<UploadsPayload>(`/projects/${projectId}/uploads`)
}

export async function uploadProjectMedia(projectId: number, body: FormData): Promise<UploadPayload> {
  return apiClient<UploadPayload>(`/projects/${projectId}/media`, {
    method: 'POST',
    body,
  })
}

export async function uploadOccasionMedia(
  occasionId: number,
  body: FormData,
): Promise<{ occasion: Occasion; upload: UploadPayload['upload']; url: string }> {
  return apiClient(`/admin/occasions/${occasionId}/media`, {
    method: 'POST',
    body,
  })
}

export async function uploadTemplateCover(
  templateId: number,
  body: FormData,
): Promise<{ template: Template; upload: UploadPayload['upload']; url: string }> {
  return apiClient(`/admin/templates/${templateId}/cover`, {
    method: 'POST',
    body,
  })
}
