'use client'

import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { parseMarkdownLinks } from '@/utils/markdown'
import type { TextBlockContent } from '@/types/project'

export function TextBlock({ title, text, buttonText, url }: TextBlockContent) {
  const paragraphs = Array.isArray(text) ? text : [text]

  return (
    <>
      {title && <h2 className="text-base font-semibold mb-2">{title}</h2>}
      <div className="space-y-2">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base">
            {parseMarkdownLinks(paragraph)}
          </p>
        ))}
      </div>
      {buttonText && url && (
        <div className="mt-4">
          <Button variant="outline" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {buttonText}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      )}
    </>
  )
}