'use client'

import { useRef, useEffect, useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { parseMarkdownLinks } from '@/utils/markdown'
import type { VideoBlockContent } from '@/types/project'

export function VideoBlock({ url, isPortrait = false, caption }: VideoBlockContent) {
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
    '--media-spacing': '0',
    '--media-margin': '0',
    'display': 'block',
    'lineHeight': '0',
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