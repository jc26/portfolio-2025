import { Button } from '@/components/ui/button'
import { parseMarkdownLinks } from '@/utils/markdown'
import Image from 'next/image'
import type { TextBlockContent, ImageBlockContent, VideoBlockContent, TwitterBlockContent, FigmaBlockContent, YouTubeBlockContent } from '@/types/project'
import { useRef, useEffect, useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { Tweet } from 'react-tweet'

export const TextBlock = ({ title, text, buttonText, url }: TextBlockContent) => {
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
    '--media-spacing': '0', // Remove default spacing
    '--media-margin': '0', // Remove margins
    'display': 'block', // Prevent inline spacing
    'lineHeight': '0', // Remove line height spacing
  } as React.CSSProperties

  if (isPortrait) {
    return (
      <div className="w-full bg-secondary rounded-lg">
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
                className="w-full rounded-lg"
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
            className="w-full rounded-lg overflow-hidden border border-secondary"
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

export const TwitterBlock = ({ tweetId, caption }: TwitterBlockContent) => {
  return (
    <>
      <div className="flex justify-center [&_.react-tweet]:bg-white [&_.react-tweet]:text-black [&_.react-tweet_p]:text-black dark:[&_.react-tweet]:bg-card dark:[&_.react-tweet]:text-foreground dark:[&_.react-tweet_p]:text-foreground">
        <Tweet id={tweetId} />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {parseMarkdownLinks(caption)}
        </p>
      )}
    </>
  )
}

export const FigmaBlock = ({ url }: FigmaBlockContent) => {
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

export const YouTubeBlock = ({ videoId, caption }: YouTubeBlockContent) => {
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