'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProjectPage } from '@/components/project/project-page'
import type { Project } from '@/types/project'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return

    const loadProject = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const { getProject } = await import('@/utils/get-projects')
        const projectData = await getProject(id as string)
        
        if (!projectData) {
          throw new Error(`Project not found: ${id}`)
        }
        
        setProject(projectData)
      } catch (err) {
        console.error('Failed to load project:', err)
        setError(err instanceof Error ? err : new Error('Failed to load project'))
        router.push('/') // Redirect to home on error
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [id, router])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!project) return null

  return <ProjectPage project={project} />
} 