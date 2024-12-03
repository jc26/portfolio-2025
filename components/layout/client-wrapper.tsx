'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { NavIsland } from './nav'
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from 'react'
import { FrozenRouter } from '@/components/frozen-router'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resetScroll = () => {
    const scrollContainer = document.querySelector('.overflow-y-auto')
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
  }

  if (!mounted) return null

  return (
    <>
      <div key={pathname} className="page-transition">
        <FrozenRouter>
          <SiteHeader />
          <div className="mb-8 md:mb-16">
            {children}
          </div>
          <SiteFooter />
        </FrozenRouter>
      </div>
      <NavIsland pathname={pathname} />
      <Toaster />
    </>
  )
} 