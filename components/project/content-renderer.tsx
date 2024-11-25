import { TextBlock, ImageBlock, VideoBlock, ButtonBlock } from './content-blocks'
import type { ContentBlock, TextBlockContent, ImageBlockContent, VideoBlockContent, ButtonBlockContent } from '@/types/project'

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
      {block.type === 'button' && isButtonContent(block.content) && (
        <ButtonBlock {...block.content} />
      )}
    </div>
  )
}

// Type guards to ensure content type safety
function isTextContent(content: any): content is TextBlockContent {
  return 'text' in content
}

function isImageContent(content: any): content is ImageBlockContent {
  return 'url' in content || 'images' in content
}

function isVideoContent(content: any): content is VideoBlockContent {
  return 'url' in content
}

function isButtonContent(content: any): content is ButtonBlockContent {
  return 'text' in content && 'url' in content
} 