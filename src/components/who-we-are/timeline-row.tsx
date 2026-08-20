'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

export function TimelineRow({
  children,
  fromLeft,
  className,
}: {
  children: ReactNode
  fromLeft: boolean
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
