import { TextBlock, ImageBlock, VideoBlock } from './content-blocks'
import type { ContentBlock, TextBlockContent, ImageBlockContent, VideoBlockContent } from '@/types/project'

export function ContentRenderer({ block }: { block: ContentBlock }) {
  const widthClass = {
    contained: 'max-w-2xl',
    wide: 'max-w-[1000px]',
    full: 'w-full'
  }[block.width]

  return (
    <div className={`${widthClass} mx-auto`}>
      {block.type === 'text' && isTextContent(block.content) && (
        <TextBlock {...block.content} />
      )}
      {block.type === 'image' && isImageContent(block.content) && (
        <ImageBlock 
          {...block.content}
          width={block.width}
        />
      )}
      {block.type === 'video' && isVideoContent(block.content) && (
        <VideoBlock {...block.content} />
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