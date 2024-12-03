'use client'

import { parseMarkdownLinks } from '@/utils/markdown'
import type { YouTubeBlockContent } from '@/types/project'

export function YouTubeBlock({ videoId, caption }: YouTubeBlockContent) {
  return (
    <>
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full rounded-lg border border-secondary"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {parseMarkdownLinks(caption)}
        </p>
      )}
    </>
  )
} 