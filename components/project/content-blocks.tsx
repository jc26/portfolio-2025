import { Button } from '@/components/ui/button'
import { CldImage } from 'next-cloudinary';
import Video from 'next-video';
import { TextBlockContent, ImageBlockContent, VideoBlockContent, ButtonBlockContent } from '@/types/project'

export const TextBlock = ({ title, text, buttonText, url }: TextBlockContent) => (
  <div className="max-w-2xl mx-auto mb-8 md:mb-16">
    {title && <h2 className="text-base font-semibold mb-2">{title}</h2>}
    {Array.isArray(text) ? (
      text.map((paragraph, i) => (
        <p key={i} className="text-base mb-2 last:mb-0">{paragraph}</p>
      ))
    ) : (
      <p className="text-base">{text}</p>
    )}
    {buttonText && url && (
      <div className="mt-4">
        <ButtonBlock text={buttonText} url={url} />
      </div>
    )}
  </div>
)

export const ImageBlock = ({ 
  mediaUrl, 
  mediaAlt, 
  aspectRatio = 'auto', 
  width,
  images
}: ImageBlockContent & { width: string }) => {
  const imageWidth = width === 'wide' ? 1000 : 672
  const imageHeight = aspectRatio !== 'auto' ? 
    imageWidth * (1 / Number(aspectRatio.split('/')[1]) * Number(aspectRatio.split('/')[0])) : 
    imageWidth * 0.5625 // default 16:9
  console.log('images', images)
  // If multiple images are provided
  if (images && images.length > 0) {
    const gridWidth = width === 'wide' ? 'max-w-[1000px]' : 'max-w-2xl'
    const isOddCount = images.length % 2 !== 0
    const lastImageIndex = images.length - 1
    console.log('more than 1 image', images)

    return (
      <div className={`${gridWidth} mx-auto w-full mb-8 md:mb-16`}>
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
                width={isOddCount && index === lastImageIndex ? imageWidth : imageWidth / 2}
                height={Math.round(imageHeight)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Single image fallback
  return width === 'wide' ? (
    <div className="max-w-[1000px] mx-auto w-full mb-8 md:mb-16">
      <CldImage 
        src={mediaUrl!}
        alt={mediaAlt!}
        width={imageWidth}
        height={Math.round(imageHeight)}
      />
    </div>
  ) : (
    <div className="max-w-2xl mx-auto w-full mb-8 md:mb-16">
      <CldImage 
        src={mediaUrl!}
        alt={mediaAlt!}
        width={imageWidth}
        height={Math.round(imageHeight)}
      />
    </div>
  )
}

export const VideoBlock = ({ mediaUrl }: VideoBlockContent) => {
  // Dynamically import video based on url path
  const video = require(`@/videos/${mediaUrl}`)

  return (
    <div className="max-w-[1000px] mx-auto mb-8 md:mb-16 rounded-lg overflow-hidden">
      <Video 
        src={video}
        controls={false}
        autoPlay
        loop
        playsInline
        muted
      />
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