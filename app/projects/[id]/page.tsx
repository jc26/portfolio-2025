'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProjectPage } from '@/components/project/project-page'
import type { Project } from '@/types/project'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true)
      try {
        const { getProject } = await import('@/utils/get-projects')
        const projectData = await getProject(id as string)
        setProject(projectData)
      } catch (error) {
        console.error('Failed to load project:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProject()
  }, [id])

  if (isLoading || !project) return null

  return <ProjectPage project={project} />
} 