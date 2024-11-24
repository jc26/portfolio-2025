import { TextBlock, ImageBlock, VideoBlock, ButtonBlock } from './content-blocks'
import type { ContentBlock } from '@/types/project'

export function ContentRenderer({ block }: { block: ContentBlock }) {
  const widthClass = {
    contained: 'max-w-2xl',
    wide: 'max-w-[1000px]',
    full: 'w-full'
  }[block.width]

  return (
    <div className={`${widthClass} mx-auto`}>
      {block.type === 'text' && block.content.text && (
        <TextBlock 
          title={block.content.title} 
          text={block.content.text} 
        />
      )}
      {block.type === 'image' && block.content.mediaUrl && (
        <ImageBlock 
          url={block.content.mediaUrl} 
          alt={block.content.mediaAlt || ''} 
          aspectRatio={block.content.aspectRatio}
        />
      )}
      {block.type === 'video' && block.content.mediaUrl && (
        <VideoBlock 
          url={block.content.mediaUrl} 
        />
      )}
      {block.type === 'button' && block.content.buttonText && block.content.url && (
        <ButtonBlock 
          text={block.content.buttonText} 
          url={block.content.url}
        />
      )}
    </div>
  )
} 