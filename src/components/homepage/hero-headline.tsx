'use client'

import { motion } from 'motion/react'

interface HeroHeadlineProps {
  eyebrow: string
  line1: string
  line2: string
  line3: string
  subtitle: string
}

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const eyebrowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
}

const lineVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease },
  },
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const ruleVariants = {
  hidden: { scaleX: 0, transformOrigin: 'left' },
  visible: {
    scaleX: 1,
    transformOrigin: 'left',
    transition: { duration: 0.5, ease },
  },
}

export function HeroHeadline({ eyebrow, line1, line2, line3, subtitle }: HeroHeadlineProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={container} className="relative max-w-[640px]">
      {/* Eyebrow accent */}
      <motion.div variants={eyebrowVariants} className="mb-5 flex items-center gap-3">
        <motion.span variants={ruleVariants} className="h-px w-10 bg-gezairi-gold" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gezairi-gold">
          {eyebrow}
        </span>
      </motion.div>

      <h1 className="leading-[0.98] text-gezairi-title">
        <motion.span
          variants={lineVariants}
          className="block font-light text-gezairi-muted"
          style={{
            fontSize: 'clamp(32px, 4.6vw, 58px)',
            letterSpacing: '0.005em',
          }}
        >
          {line1}
        </motion.span>
        <motion.span
          variants={lineVariants}
          className="mt-1 block"
          style={{
            fontSize: 'clamp(46px, 7.4vw, 96px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          {line2}
        </motion.span>
        <motion.span
          variants={lineVariants}
          className="block bg-gradient-to-r from-gezairi-blue to-gezairi-title bg-clip-text text-transparent"
          style={{
            fontSize: 'clamp(46px, 7.4vw, 96px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          {line3}
        </motion.span>
      </h1>

      <motion.p
        variants={subtitleVariants}
        className="mt-6 max-w-[480px] text-[15px] leading-relaxed text-gezairi-muted/85 md:text-[16px]"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  )
}
