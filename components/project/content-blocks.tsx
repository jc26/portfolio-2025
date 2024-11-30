import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { CldImage } from 'next-cloudinary';
import { TextBlockContent, ImageBlockContent, VideoBlockContent } from '@/types/project'
import { parseMarkdownLinks } from '@/utils/markdown'

export const TextBlock = ({ title, text, buttonText, url, width = 'contained' }: TextBlockContent & { width?: string }) => {
  const paragraphs = Array.isArray(text) ? text : [text]

  return (
    <div className={`${width === 'contained' ? 'content-container' : ''} mb-8 md:mb-16`}>
      {title && <h2 className="text-base font-semibold mb-3">{title}</h2>}
      <div className="space-y-3">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base">
            {parseMarkdownLinks(paragraph)}
          </p>
        ))}
      </div>
      {buttonText && url && (
        <div className="mt-6">
          <Button variant="outline" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {buttonText}
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}

export const ImageBlock = ({ 
  url, 
  alt, 
  images,
  caption, 
  width = 'contained' }: ImageBlockContent & { width?: string }) => {
  if (images?.length) {
    return (
      <div className={`${width === 'contained' ? 'content-container' : ''} mb-8 md:mb-16`}>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
        {caption && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            {parseMarkdownLinks(caption)}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={`${width === 'contained' ? 'content-container' : ''} mb-8 md:mb-16`}>
      <img
        src={url}
        alt={alt}
        className="w-full rounded-lg"
      />
      {caption && (
        <p className="mt-1 text-sm text-muted-foreground text-center md:mt-2">
          {parseMarkdownLinks(caption)}
        </p>
      )}
    </div>
  )
}

export const VideoBlock = ({ 
  url,
  width = 'wide',
  isPortrait = false,
  caption
}: VideoBlockContent & { width?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return

          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              // Autoplay might be blocked by browser
              console.log('Autoplay blocked')
            })
          } else {
            videoRef.current.pause()
          }
        })
      },
      {
        root: null,
        threshold: 0.5
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  if (isPortrait) {
    return (
      <div className="w-full bg-[#efefef] rounded-xl">
        <div 
          ref={containerRef}
          className="max-w-[1000px] mx-auto my-8 md:my-16 rounded-xl overflow-hidden"
        >
          <div className="relative w-full flex justify-center py-8">
            <div className="max-w-[280px]">
              <video 
                ref={videoRef}
                src={`/videos/${url}`}
                loop
                muted
                playsInline
                className="w-full rounded-md"
              />
            </div>
          </div>
          {caption && (
            <p className="mt-2 text-sm text-muted-foreground text-center">
              {parseMarkdownLinks(caption)}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`${width === 'contained' ? 'content-container' : 'max-w-[1000px]'} mx-auto mb-8 md:mb-16 rounded-xl overflow-hidden`}
    >
      <video 
        ref={videoRef}
        src={`/videos/${url}`}
        loop
        muted
        playsInline
        className="w-full rounded-md"
      />
      {caption && (
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {parseMarkdownLinks(caption)}
        </p>
      )}
    </div>
  )
} 