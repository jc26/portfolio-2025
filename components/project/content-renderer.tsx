import { TextBlock, ImageBlock, VideoBlock, TwitterBlock } from './content-blocks'
import type { ContentBlock, TextBlockContent, ImageBlockContent, VideoBlockContent, TwitterBlockContent } from '@/types/project'

export function ContentRenderer({ block }: { block: ContentBlock }) {
  const width = block.width || 'contained'
  
  const widthClass = width === 'contained' 
    ? 'content-container' 
    : width === 'wide' 
      ? 'max-w-[1000px] mx-auto' 
      : 'w-full'

  return (
    <div className={`${widthClass} mb-8 md:mb-16`}>
      {block.type === 'text' && isTextContent(block.content) && (
        <TextBlock {...block.content} />
      )}
      {block.type === 'image' && isImageContent(block.content) && (
        <ImageBlock {...block.content} />
      )}
      {block.type === 'video' && isVideoContent(block.content) && (
        <VideoBlock {...block.content} />
      )}
      {block.type === 'twitter' && isTwitterContent(block.content) && (
        <TwitterBlock {...block.content} />
      )}
    </div>
  )
}

// Type guards to ensure content type safety
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