'use client'

import { ContentRenderer } from '@/components/content'
import type { ContentBlock } from '@/types/project'

interface ProjectContentProps {
  content: ContentBlock[]
}

export function ProjectContent({ content }: ProjectContentProps) {
  return (
    <>
      {content?.map((block) => (
        <ContentRenderer key={block.id} block={block} />
      ))}
    </>
  )
} 