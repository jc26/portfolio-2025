import { Button } from '@/components/ui/button'
import { parseMarkdownLinks } from '@/utils/markdown'
import Image from 'next/image'
import type { TextBlockContent, ImageBlockContent, VideoBlockContent } from '@/types/project'
import { useRef, useEffect, useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'

export const TextBlock = ({ title, text, buttonText, url }: TextBlockContent) => {
  const paragraphs = Array.isArray(text) ? text : [text]

  return (
    <>
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
    </>
  )
}

export const ImageBlock = ({ url, alt, images, aspectRatio, caption }: ImageBlockContent) => {
  if (images?.length) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div 
              key={index}
              className={images.length % 2 !== 0 && index === images.length - 1 ? 'col-span-2' : ''}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={1000}
                height={1000}
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
        className="w-full rounded-lg"
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

export const VideoBlock = ({ url, isPortrait = false, caption }: VideoBlockContent) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<MuxPlayerRefAttributes>(null)
  const [playbackId, setPlaybackId] = useState<string>('')

  useEffect(() => {
    const loadVideoData = async () => {
      try {
        const videoJson = await import(`@/public/videos/${url}.json`)
        const muxPlaybackId = videoJson?.default?.providerMetadata?.mux?.playbackId
        
        if (muxPlaybackId) {
          setPlaybackId(muxPlaybackId)
        }
      } catch (error) {
        console.error('Error loading video:', error)
      }
    }
    
    loadVideoData()
  }, [url])

  // Manual loop handling
  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    const handleEnded = () => {
      if (player) {
        player.currentTime = 0
        player.play()
      }
    }

    player.addEventListener('ended', handleEnded)
    return () => {
      player.removeEventListener('ended', handleEnded)
    }
  }, [playbackId])

  if (!url) return null

  const playerStyle = {
    '--controls': 'none',
    '--media-object-fit': 'cover',
    '--media-object-position': 'center',
    '--media-background-color': 'transparent',
  } as React.CSSProperties

  if (isPortrait) {
    return (
      <div className="w-full bg-[#efefef] rounded-xl">
        <div 
          ref={containerRef}
          className="relative w-full flex justify-center py-8"
        >
          <div className="max-w-[280px]">
            {playbackId && (
              <MuxPlayer
                ref={playerRef}
                streamType="on-demand"
                playbackId={playbackId}
                autoPlay="muted"
                muted={true}
                minResolution="720p"
                renditionOrder="desc"
                style={playerStyle}
                className="w-full rounded-md"
              />
            )}
          </div>
        </div>
        {caption && (
          <p className="mt-1 text-sm text-muted-foreground text-center">
            {parseMarkdownLinks(caption)}
          </p>
        )}
      </div>
    )
  }

  return (
    <>
      <div ref={containerRef}>
        {playbackId && (
          <MuxPlayer
            ref={playerRef}
            streamType="on-demand"
            playbackId={playbackId}
            autoPlay="muted"
            muted={true}
            minResolution="720p"
            renditionOrder="desc"
            style={playerStyle}
            className="w-full rounded-lg overflow-hidden"
          />
        )}
      </div>
      {caption && (
        <p className="mt-1 text-sm text-muted-foreground text-center">
          {parseMarkdownLinks(caption)}
        </p>
      )}
    </>
  )
} 