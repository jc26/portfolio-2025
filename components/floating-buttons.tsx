'use client'

import { useState, useEffect, useRef } from 'react'
import { Briefcase, ChevronRight } from 'lucide-react'
import { MoonIcon as Moon, SunIcon as Sun, EnvelopeIcon as Envelope } from '@heroicons/react/24/solid'
import { BeakerIcon } from '@heroicons/react/24/solid'
import { SocialIcon } from 'react-social-icons'
import { Button } from "@/components/ui/button"
import { ContactDrawer } from '@/components/contact-drawer'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const springConfig = {
  type: "spring",
  mass: 1,
  damping: 16,
  stiffness: 80,
  duration: 0.25
}

export function FloatingButtons() {
  const [isDark, setIsDark] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [mainButtonsWidth, setMainButtonsWidth] = useState(0)
  const [socialButtonsWidth, setSocialButtonsWidth] = useState(0)
  const [chevronWidth, setChevronWidth] = useState(0)
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const mainButtonsRef = useRef<HTMLDivElement>(null)
  const socialButtonsRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mainButtonsRef.current) {
      setMainButtonsWidth(mainButtonsRef.current.getBoundingClientRect().width)
    }
    if (socialButtonsRef.current) {
      setSocialButtonsWidth(socialButtonsRef.current.getBoundingClientRect().width)
    }
    if (chevronRef.current) {
      setChevronWidth(chevronRef.current.getBoundingClientRect().width)
    }
  }, [pathname]) // Recalculate when pathname changes since button widths may change

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
      return
    }

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(systemPrefersDark)
    document.documentElement.classList.toggle('dark', systemPrefersDark)
  }, [])

  const toggleDark = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    document.documentElement.classList.toggle('dark', newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
  }

  const mainButtons = (
    <motion.div 
      ref={mainButtonsRef} 
      className="flex gap-1"
      animate={{
        x: isExpanded ? -(mainButtonsWidth - chevronWidth) : 0
      }}
      transition={springConfig}
    >
      <Button 
        variant={pathname === '/' ? "default" : "ghost"} 
        size="lg" 
        className="flex gap-2 relative z-50 rounded-full transition-all duration-300"
        asChild
      >
        <a href="/">
          <Briefcase className="h-8 w-8" />
          {pathname === '/' && <span>Work</span>}
        </a>
      </Button>
      <Button 
        variant={pathname === '/experiments' ? "default" : "ghost"} 
        size="lg" 
        className="flex gap-2 relative z-50 rounded-full transition-all duration-300"
        asChild
      >
        <a href="/experiments">
          <BeakerIcon className="h-8 w-8" />
          {pathname === '/experiments' && <span>Experiments</span>}
        </a>
      </Button>
      <Button 
        variant="ghost" 
        size="lg" 
        onClick={() => setContactOpen(true)} 
        className="flex gap-2 relative z-50 rounded-full"
      >
        <Envelope className="h-8 w-8" />
      </Button>
      <Button 
        variant="ghost" 
        size="lg" 
        onClick={toggleDark} 
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} 
        className="relative z-50 rounded-full"
      >
        {isDark ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
      </Button>
      <Button
        ref={chevronRef}
        variant="secondary"
        size="lg"
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative z-50 rounded-full"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={springConfig}
        >
          <ChevronRight className="h-8 w-8" />
        </motion.div>
      </Button>
    </motion.div>
  )

  const socialButtons = (
    <motion.div
      ref={socialButtonsRef}
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: 1, 
        x: isExpanded ? -(mainButtonsWidth - chevronWidth) : 0 
      }}
      exit={{ opacity: 1 }}
      transition={springConfig}
      className="flex gap-1"
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative z-50 rounded-full" 
        onClick={(e) => {
          e.preventDefault();
          window.open('https://github.com', '_blank');
        }}
      >
        <SocialIcon 
          url="https://github.com"
          className="!h-8 !w-8"
          bgColor="transparent"
          fgColor="currentColor"
        />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative z-50 rounded-full"
        onClick={(e) => {
          e.preventDefault();
          window.open('https://twitter.com', '_blank');
        }}
      >
        <SocialIcon
          url="https://twitter.com"
          className="!h-8 !w-8"
          bgColor="transparent" 
          fgColor="currentColor"
        />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative z-50 rounded-full"
        onClick={(e) => {
          e.preventDefault();
          window.open('https://linkedin.com', '_blank');
        }}
      >
        <SocialIcon
          url="https://linkedin.com"
          className="!h-8 !w-8"
          bgColor="transparent"
          fgColor="currentColor"
        />
      </Button>
    </motion.div>
  )

  return (
    <>
      <motion.div 
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 p-2 bg-background/80 backdrop-blur-sm rounded-full border shadow-md z-50 overflow-hidden"
        animate={{
          width: isExpanded 
            ? chevronWidth + socialButtonsWidth + 24 // 16px for padding
            : mainButtonsWidth + 16,
        }}
        transition={springConfig}
      >
        <div ref={containerRef} className="relative flex gap-1">
          {mainButtons}
          {socialButtons}
        </div>
      </motion.div>
      <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />
    </>
  )
} 