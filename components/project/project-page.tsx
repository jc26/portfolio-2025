'use client'

import { ContentRenderer } from '@/components/project/content-renderer'
import { ButtonBlock } from '@/components/project/content-blocks'
import type { Project } from '@/types/project'

export function ProjectPage({ project }: { project: Project }) {
  if (!project) return null

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