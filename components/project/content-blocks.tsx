import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { CldImage } from 'next-cloudinary';
import { TextBlockContent, ImageBlockContent, VideoBlockContent, ButtonBlockContent } from '@/types/project'

export const TextBlock = ({ title, text, buttonText, url }: TextBlockContent) => {
  // Function to parse text and convert URLs to links
  const renderText = (text: string) => {
    // Match markdown-style links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = text.split(linkRegex)
    
    return parts.map((part, i) => {
      // Every third part is a URL (based on regex capture groups)
      if (i % 3 === 0) {
        return part
      }
      // Link text
      if (i % 3 === 1) {
        const url = parts[i + 1]
        return (
          <a 
            key={i} 
            href={url}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {part}
          </a>
        )
      }
      // Skip URLs as they're handled with their text
      return null
    })
  }

  return (
    <div className="max-w-2xl mx-auto mb-8 md:mb-8">
      {title && <h2 className="text-base font-semibold mb-2">{title}</h2>}
      {Array.isArray(text) ? (
        text.map((paragraph, i) => (
          <p key={i} className="text-base mb-2 last:mb-0">
            {renderText(paragraph)}
          </p>
        ))
      ) : (
        <p className="text-base">{renderText(text)}</p>
      )}
      {buttonText && url && (
        <div className="mt-4">
          <ButtonBlock text={buttonText} url={url} />
        </div>
      )}
    </div>
  )
}

export const ImageBlock = ({ 
  url, 
  alt, 
  width,
  images
}: ImageBlockContent & { width: string }) => {
  // If multiple images are provided
  if (images && images.length > 0) {
    const gridWidth = width === 'wide' ? 'max-w-[1000px]' : 'max-w-2xl'
    const isOddCount = images.length % 2 !== 0
    const lastImageIndex = images.length - 1

    return (
      <div className={`${gridWidth} mx-auto w-full my-8 md:my-16`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div 
              key={image.url}
              className={`
                ${isOddCount && index === lastImageIndex ? 'md:col-span-2' : ''}
              `}
            >
              <CldImage 
                src={image.url}
                alt={image.alt}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Single image
  const containerWidth = width === 'wide' ? 'max-w-[1000px]' : 'max-w-2xl'
  
  return (
    <div className={`${containerWidth} mx-auto w-full my-8 md:my-16`}>
      <CldImage 
        src={url!}
        alt={alt!}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
      />
    </div>
  )
}

export const VideoBlock = ({ 
  url,
  width = 'wide',
  isPortrait = false
}: VideoBlockContent & { width?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const maxWidth = width === 'wide' ? '280px' : '240px'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return

          if (entry.isIntersecting) {
            videoRef.current.play()
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

    return () => observer.disconnect()
  }, [])

  if (isPortrait) {
    return (
      <div className="w-full bg-[#efefef] rounded-xl">
        <div 
          ref={containerRef}
          className="max-w-[1000px] mx-auto my-8 md:my-16 rounded-xl overflow-hidden"
        >
          <div className="relative w-full flex justify-center py-8">
            <div style={{ maxWidth }} className="[&_.next-video-container]:!aspect-auto">
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
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`${width === 'wide' ? 'max-w-[1000px]' : 'max-w-2xl'} mx-auto my-8 md:my-16 rounded-xl overflow-hidden border border-gray-100`}
    >
      <div className="[&_.next-video-container]:!aspect-auto [&_video]:!h-auto">
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
  )
}

export const ButtonBlock = ({ text, url }: ButtonBlockContent) => (
  <div>
    <Button variant="outline" asChild>
      <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
    </Button>
  </div>
) 