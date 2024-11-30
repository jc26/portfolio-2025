import React from 'react'

export function parseMarkdownLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = text.split(linkRegex)
  
  return parts.map((part, i) => {
    if (i % 3 === 0) {
      return part
    }
    if (i % 3 === 1) {
      const url = parts[i + 1]
      return (
        <a 
          key={i} 
          href={url}
          target="_blank" 
          rel="noopener noreferrer"
        >
          {part}
        </a>
      )
    }
    return null
  })
} 