'use client'

import Image from 'next/image'
import { parseMarkdownLinks } from '@/utils/markdown'
import type { ImageBlockContent } from '@/types/project'

export function ImageBlock({ url, alt, images, aspectRatio, caption }: ImageBlockContent) {
  if (images?.length) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div 
              key={index}
              className={image.fullWidth ? 'md:col-span-2' : ''}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={1000}
                height={1000}
                className="w-full rounded-lg border border-secondary"
              />
            </div>
          ))}
        </div>
        {caption && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            {parseMarkdownLinks(caption)}
          </p>
        )}
      </>
    )
  }

  if (!url) return null

  return (
    <>
      <Image
        src={url}
        alt={alt || ''}
        width={1000}
        height={1000}
        className="w-full rounded-lg border border-secondary"
        style={aspectRatio ? { aspectRatio } : undefined}
      />
      {caption && (
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {parseMarkdownLinks(caption)}
        </p>
      )}
    </>
  )
} 