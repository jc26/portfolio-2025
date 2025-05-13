'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { parseMarkdownLinks } from '@/utils/markdown'
import type { ImageBlockContent } from '@/types/project'

export function ImageBlock({ url, alt, images, aspectRatio, caption }: ImageBlockContent) {
  let imageContent = null;

  if (images?.length) {
    // --- Multiple Images Grid --- 
    imageContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => {
          const gridItemClassName = image.fullWidth ? 'md:col-span-2' : ''
          
          if (image.url) {
            // Render Image with Dialog
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div 
                    className={`${gridItemClassName} cursor-zoom-in overflow-hidden rounded-lg transition-transform duration-200 ease-in-out hover:scale-[1.02]`}
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
                <DialogContent className="border-none max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] p-2">
                   <div className="max-h-[85vh] overflow-y-auto">
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
                   </div>
                </DialogContent>
              </Dialog>
            );
          } else if (image.alt) {
            // Render Placeholder
            return (
              <div
                key={index}
                className={`${gridItemClassName} flex items-center justify-center p-8 bg-secondary text-muted-foreground rounded-lg text-center min-h-[400px]`}
              >
                <p>{image.alt}</p>
              </div>
            );
          }
          // Return null if neither url nor alt is present for a grid item
          return null;
        })}
      </div>
    );
  } else if (url) {
    // --- Single Image --- 
    imageContent = (
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
        <DialogContent className="border-none max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] p-2">
          <div className="max-h-[85vh] overflow-y-auto">
            <Image
              src={url}
              alt={alt || 'Project image'}
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg object-contain"
            />
            <VisuallyHidden>
              <DialogTitle>{alt || 'Project image'}</DialogTitle>
            </VisuallyHidden>
          </div>
        </DialogContent>
      </Dialog>
    );
  } else if (alt) {
    // --- Placeholder --- 
    imageContent = (
      <div className="flex items-center justify-center p-8 bg-secondary text-muted-foreground rounded-lg text-center min-h-[400px]">
        <p>{alt}</p>
      </div>
    );
  }

  // --- Render Block --- 
  if (imageContent || caption) {
    return (
      <>
        {imageContent}
        {caption && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            {parseMarkdownLinks(caption)}
          </p>
        )}
      </>
    );
  }

  // If nothing to render (no images, no url, no alt, no caption)
  return null;
} 