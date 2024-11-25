import { Project } from '@/types/project'

// List of active project IDs
const PROJECT_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export async function getProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    PROJECT_IDS.map(async (id) => {
      const project = await import(`@/data/projects/${id}.json`)
      return project.default
    })
  )
  // Sort by id ascending
  return projects.sort((a, b) => a.id - b.id)
}

export async function getProject(id: string): Promise<Project> {
  const project = await import(`@/data/projects/${id}.json`)
  return project.default
} 