'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ContentRenderer } from '@/components/project/content-renderer'
import { ButtonBlock } from '@/components/project/content-blocks'
import type { Project } from '@/types/project'

export default function ProjectPage() {
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

  return (
    <article className="relative mt-14">
      <div className="content-container mb-8 md:mb-16">
        <h1 className="text-base font-semibold mb-2">{project.heading}</h1>
        <p className="mb-4">{project.description}</p>
        {project.action && (
          <ButtonBlock text={project.action.text} url={project.action.url} />
        )}
      </div>

      {project.content?.map((block) => (
        <ContentRenderer key={block.id} block={block} />
      ))}
    </article>
  )
} 