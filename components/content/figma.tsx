'use client'

import type { FigmaBlockContent } from '@/types/project'

export function FigmaBlock({ url }: FigmaBlockContent) {
  return (
    <div className="aspect-[16/9] w-full">
      <iframe 
        className="w-full h-full rounded-lg border border-secondary"
        src={`${url}?embed-host=share`}
        allowFullScreen
      />
    </div>
  )
} 