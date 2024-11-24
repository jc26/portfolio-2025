'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Contact } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ContactDrawer } from '@/components/contact-drawer'

export function FloatingButtons() {
  const [isDark, setIsDark] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  // Initialize dark mode from localStorage and system preference
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
      return
    }

    // If no saved preference, check system preference
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

  return (
    <>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-background/80 backdrop-blur-sm rounded-full border shadow-md z-50">
        <Button variant="default" size="lg" onClick={() => setContactOpen(true)} className="flex gap-2 relative z-50 rounded-full">
          <Contact className="h-8 w-8" />
          Contact
        </Button>
        <Button variant="secondary" size="lg" onClick={toggleDark} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="relative z-50 rounded-full">
          {isDark ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
        </Button>
      </div>
      <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />
    </>
  )
} 