import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
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
            <div key={index} className={images.length % 2 !== 0 && index === images.length - 1 ? 'col-span-2' : ''}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full rounded-xl"
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
        className="w-full rounded-xl"
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
  videos,
  width = 'wide',
  isPortrait = false,
  caption
}: VideoBlockContent & { width?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Add some debugging
  useEffect(() => {
    console.log('Videos prop:', videos)
    console.log('Single URL prop:', url)
  }, [videos, url])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videos = entry.target.querySelectorAll('video')
          
          videos.forEach(video => {
            if (entry.isIntersecting) {
              video.play().catch(() => {
                console.log('Autoplay blocked')
              })
            } else {
              video.pause()
            }
          })
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

  // Handle multiple videos
  if (Array.isArray(videos) && videos.length > 0) {
    return (
      <div 
        ref={containerRef}
        className={`${width === 'contained' ? 'content-container' : ''} mb-8 md:mb-16`}
      >
        <div className="grid grid-cols-2 gap-4">
          {videos.map((video, index) => {
            if (!video?.url) return null // Skip invalid videos
            
            return (
              <div 
                key={index} 
                className={videos.length % 2 !== 0 && index === videos.length - 1 ? 'col-span-2' : ''}
              >
                {video.isPortrait ? (
                  <div className="w-full bg-[#efefef] rounded-xl">
                    <div className="relative w-full flex justify-center py-8">
                      <div className="max-w-[280px]">
                        <video 
                          ref={(el) => { videoRefs.current[index] = el }}
                          src={`/videos/${video.url}`}
                          loop
                          muted
                          playsInline
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <video 
                    ref={(el) => { videoRefs.current[index] = el }}
                    src={`/videos/${video.url}`}
                    loop
                    muted
                    playsInline
                    className="w-full rounded-xl"
                  />
                )}
              </div>
            )
          })}
        </div>
        {caption && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            {parseMarkdownLinks(caption)}
          </p>
        )}
      </div>
    )
  }

  // Single video fallback
  if (!url) return null // Return null if no valid video source

  // Single video
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
                ref={(el) => { videoRefs.current[0] = el }}
                src={`/videos/${url}`}
                loop
                muted
                playsInline
                className="w-full"
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
      className={`${width === 'contained' ? 'content-container' : 'max-w-[1000px]'} mx-auto mb-8 md:mb-16 overflow-hidden`}
    >
      <video 
        ref={(el) => { videoRefs.current[0] = el }}
        src={`/videos/${url}`}
        loop
        muted
        playsInline
        className="w-full rounded-xl"
      />
      {caption && (
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {parseMarkdownLinks(caption)}
        </p>
      )}
    </div>
  )
} 