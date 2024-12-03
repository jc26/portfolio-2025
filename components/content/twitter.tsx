'use client'

import { Tweet } from 'react-tweet'
import { parseMarkdownLinks } from '@/utils/markdown'
import type { TwitterBlockContent } from '@/types/project'

export function TwitterBlock({ tweetId, caption }: TwitterBlockContent) {
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