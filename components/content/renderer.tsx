'use client'

import { TextBlock } from './text'
import { ImageBlock } from './image'
import { VideoBlock } from './video'
import { TwitterBlock } from './twitter'
import { FigmaBlock } from './figma'
import { YouTubeBlock } from './youtube'
import type { ContentBlock, TextBlockContent, ImageBlockContent, VideoBlockContent, TwitterBlockContent, FigmaBlockContent, YouTubeBlockContent } from '@/types/project'

// Type guards
function isTextContent(content: unknown): content is TextBlockContent {
  return typeof content === 'object' && content !== null && 'text' in content
}

function isImageContent(content: unknown): content is ImageBlockContent {
  return typeof content === 'object' && content !== null && ('url' in content || 'images' in content)
}

function isVideoContent(content: unknown): content is VideoBlockContent {
  return typeof content === 'object' && content !== null && 'url' in content
}

function isTwitterContent(content: unknown): content is TwitterBlockContent {
  return typeof content === 'object' && content !== null && 'tweetId' in content
}

function isFigmaContent(content: unknown): content is FigmaBlockContent {
  return typeof content === 'object' && content !== null && 'url' in content
}

function isYouTubeContent(content: unknown): content is YouTubeBlockContent {
  return typeof content === 'object' && content !== null && 'videoId' in content
}

export function ContentRenderer({ block }: { block: ContentBlock }) {
  const width = block.width || 'contained'
  
  const widthClass = width === 'contained' 
    ? 'content-container' 
    : width === 'wide' 
      ? 'max-w-[1000px] mx-auto' 
      : 'w-full'

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return isTextContent(block.content) ? <TextBlock {...block.content} /> : null
      case 'image':
        return isImageContent(block.content) ? <ImageBlock {...block.content} /> : null
      case 'video':
        return isVideoContent(block.content) ? <VideoBlock {...block.content} /> : null
      case 'twitter':
        return isTwitterContent(block.content) ? <TwitterBlock {...block.content} /> : null
      case 'figma':
        return isFigmaContent(block.content) ? <FigmaBlock {...block.content} /> : null
      case 'youtube':
        return isYouTubeContent(block.content) ? <YouTubeBlock {...block.content} /> : null
      default:
        return null
    }
  }

  return (
    <div className={`${widthClass} mb-8 md:mb-16`}>
      {renderContent()}
    </div>
  )
} 