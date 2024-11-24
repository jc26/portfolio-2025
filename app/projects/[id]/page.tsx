'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { ContentRenderer } from '@/components/project/content-renderer'
import { ButtonBlock } from '@/components/project/content-blocks'
import type { Project } from '@/types/project'

export default function ProjectPage() {
  const { id } = useParams()
  const project = require(`@/data/projects/${id}.json`) as Project
  
  if (!project) return null

  return (
    <div>
      <SiteHeader />
      <motion.article
        key="detail"
        initial={{ opacity: 0, y: '10%', filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: '10%', filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative mt-14"
      >
        <div className="content-container mb-16">
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