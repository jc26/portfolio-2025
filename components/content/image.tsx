'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { parseMarkdownLinks } from '@/utils/markdown'
import type { ImageBlockContent } from '@/types/project'

export function ImageBlock({ url, alt, images, aspectRatio, caption }: ImageBlockContent) {
  if (images?.length) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div 
                  className={`${image.fullWidth ? 'md:col-span-2' : ''} cursor-zoom-in overflow-hidden rounded-lg transition-transform duration-200 ease-in-out hover:scale-[1.02]`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={1000}
                    height={1000}
                    className="w-full rounded-lg border border-secondary"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="p-0 border-none max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw]">
                 <Image
                    src={image.url}
                    alt={image.alt}
                    width={1920}
                    height={1080}
                    className="w-full h-auto rounded-lg object-contain"
                  />
                  <VisuallyHidden>
                    <DialogTitle>{image.alt}</DialogTitle>
                  </VisuallyHidden>
              </DialogContent>
            </Dialog>
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
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-zoom-in overflow-hidden rounded-lg transition-transform duration-200 ease-in-out hover:scale-[1.02]">
            <Image
              src={url}
              alt={alt || ''}
              width={1000}
              height={1000}
              className="w-full rounded-lg border border-secondary"
              style={aspectRatio ? { aspectRatio } : undefined}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 border-none max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw]">
          <Image
            src={url}
            alt={alt || ''}
            width={1920}
            height={1080}
            className="w-full h-auto rounded-lg object-contain"
          />
          <VisuallyHidden>
            <DialogTitle>{alt || 'Project image'}</DialogTitle>
          </VisuallyHidden>
        </DialogContent>
      </Dialog>
      {caption && (
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {parseMarkdownLinks(caption)}
        </p>
      )}
    </>
  )
} 