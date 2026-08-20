'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  /** When true, animates on mount instead of waiting for the element to enter the viewport. Use for above-the-fold content. */
  onMount?: boolean
}

const directions = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  direction = 'up',
  distance,
  once = true,
  onMount = false,
}: FadeInProps) {
  const offset = directions[direction]
  const initial = {
    opacity: 0,
    x: distance !== undefined && offset.x !== 0 ? Math.sign(offset.x) * distance : offset.x,
    y: distance !== undefined && offset.y !== 0 ? Math.sign(offset.y) * distance : offset.y,
  }

  const animationProps = onMount
    ? { animate: { opacity: 1, x: 0, y: 0 } }
    : { whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once, margin: '-80px' } }

  return (
    <motion.div
      className={className}
      initial={initial}
      {...animationProps}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function Stagger({ children, className, staggerDelay = 0.1, once = true }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
