'use client'

import { motion } from 'framer-motion'

export default function ExperimentsPage() {
  return (
    <div className="content-container">
      <motion.div
        key="experiments"
        initial={{ opacity: 0, y: '10%', filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: '10%', filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <section className="mb-16">
          <h1 className="text-base font-semibold mb-6">Experiments</h1>
          <p className="text-base">Coming soon...</p>
        </section>
      </motion.div>
    </div>
  )
} 