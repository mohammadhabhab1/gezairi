'use client'

import { motion } from 'motion/react'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`text-[24px] font-bold leading-[32px] tracking-[0.55px] text-gezairi-blue md:text-[28px] md:leading-[32px] md:tracking-[0.78px] lg:text-[32px] ${className || ''}`}
    >
      {children}
    </motion.h2>
  )
}
