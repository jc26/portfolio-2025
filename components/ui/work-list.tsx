import { cn } from '@/utils/cn'
import Link from 'next/link'
import { ReactNode } from 'react'

interface WorkListProps {
  items: Array<{
    id: string | number
    href: string
    external?: boolean
    children: ReactNode
  }>
}

export function WorkList({ items }: WorkListProps) {
  return (
    <div className="[&>*:hover+*]:border-t-transparent [&>*:has(+*:hover)]:border-b-transparent">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "block relative py-4 rounded-none border-y border-secondary -mt-[1px]",
            "transition-all duration-200 ease-out",
            "hover:px-4 hover:rounded-md hover:bg-secondary/50",
            "hover:border-y-transparent",
            "hover:relative hover:z-10",
            "active:scale-[0.99] active:bg-secondary",
          )}
          {...(item.external && {
            target: "_blank",
            rel: "noopener noreferrer"
          })}
        >
          {item.children}
        </Link>
      ))}
    </div>
  )
} 