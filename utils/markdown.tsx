import React from 'react'

export function parseMarkdownLinks(text: string): React.ReactNode[] {
  const linkRegex = /(\[[^\]]+\]\([^)]+\))/g // Capture the whole link markdown
  const parts = text.split(linkRegex)

  const processedParts = parts.flatMap((part, i) => {
    // Check if it's a captured link markdown e.g., "[text](url)" 
    if (part && part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)) { 
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        const linkText = linkMatch[1]
        const url = linkMatch[2]
        return (
          <a 
            key={`link-${i}`} 
            href={url}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {linkText} 
          </a>
        )
      }
    }

    // Process remaining text parts for bold
    if (typeof part === 'string') {
      const boldRegex = /(\*\*[^\*]+\*\*)/g // Capture **bold text**
      const subParts = part.split(boldRegex)

      return subParts.map((subPart, j) => {
        if (subPart && subPart.startsWith('**') && subPart.endsWith('**')) {
           return <span key={`bold-${i}-${j}`} className="font-semibold">{subPart.slice(2, -2)}</span>
        }
        return subPart // Return plain text part
      });
    }
    
    return part // Should not happen if split works correctly, but return part just in case
  })

  return processedParts.filter(part => part !== null && part !== ''); // Filter out nulls/empty strings
} 