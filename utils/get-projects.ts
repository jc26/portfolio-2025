import fs from 'fs'
import path from 'path'
import type { Project } from '@/types/project'

export async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), 'data/projects')
  const filenames = await fs.promises.readdir(projectsDirectory)
  
  const projects = await Promise.all(
    filenames
      .filter(filename => filename.endsWith('.json'))
      .map(async filename => {
        const filePath = path.join(projectsDirectory, filename)
        const fileContents = await fs.promises.readFile(filePath, 'utf8')
        return JSON.parse(fileContents) as Project
      })
  )

  // Filter out invisible projects and sort by id
  return projects
    .filter(project => project.isVisible !== false)
    .sort((a, b) => a.id - b.id)
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'data/projects')
    const filenames = await fs.promises.readdir(projectsDirectory)
    
    for (const filename of filenames) {
      if (filename.endsWith('.json')) {
        const filePath = path.join(projectsDirectory, filename)
        const fileContents = await fs.promises.readFile(filePath, 'utf8')
        const project = JSON.parse(fileContents) as Project
        
        // Return null for invisible projects
        if (project.slug === slug && project.isVisible !== false) {
          return project
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
} 