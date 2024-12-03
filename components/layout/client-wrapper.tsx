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
      <AnimatePresence mode="wait" initial={false} onExitComplete={resetScroll}>
        <motion.div
          key={pathname}
          initial={{ 
            opacity: 0, 
            y: -70,
            filter: 'blur(10px)'
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            y: 70,
            filter: 'blur(10px)'
          }}
          transition={{
            duration: 0.8,
            ease: [0.32, 0, 0.15, 1]
          }}
          className="transform-gpu"
        >
          <FrozenRouter>
            <SiteHeader />
            <div className="mb-8 md:mb-16">
              {children}
            </div>
            <SiteFooter />
          </FrozenRouter>
        </motion.div>
      </AnimatePresence>
      <NavIsland pathname={pathname} />
      <Toaster />
    </>
  )
} 