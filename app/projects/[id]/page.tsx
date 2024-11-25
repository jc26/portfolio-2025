'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ContentRenderer } from '@/components/project/content-renderer'
import { ButtonBlock } from '@/components/project/content-blocks'
import type { Project } from '@/types/project'

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const loadProject = async () => {
      const { getProject } = await import('@/utils/get-projects')
      const projectData = await getProject(id as string)
      setProject(projectData)
    }
    loadProject()
  }, [id])

  if (!project) return null

  return (
    <div>
      <motion.article
        key="detail"
        initial={{ opacity: 0, y: '4%', filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: '4%', filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="relative mt-14"
      >
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
      </motion.article>
    </div>
  )
} 