import { apiClient } from '@/services/http.ts'
import type { Project } from '@/shared/types/project.ts'

export type ProjectsPayload = {
  projects: Project[]
}

export type ProjectPayload = {
  project: Project
}

export type CreateProjectInput = {
  title: string
  recipient_name: string
  from_name: string
  template_id: number
  content?: Record<string, unknown>
}

export type UpdateProjectInput = {
  title?: string
  recipient_name?: string
  from_name?: string
  content?: Record<string, unknown>
}

export async function getProjects(): Promise<Project[]> {
  const payload = await apiClient<ProjectsPayload>('/projects')
  return payload.projects
}

export async function getProject(id: number): Promise<Project> {
  const payload = await apiClient<ProjectPayload>(`/projects/${id}`)
  return payload.project
}

export async function createProject(input: CreateProjectInput): Promise<ProjectPayload> {
  return apiClient<ProjectPayload>('/projects', {
    method: 'POST',
    body: input,
  })
}

export async function updateProject(id: number, input: UpdateProjectInput): Promise<ProjectPayload> {
  return apiClient<ProjectPayload>(`/projects/${id}`, {
    method: 'POST',
    body: input,
  })
}
