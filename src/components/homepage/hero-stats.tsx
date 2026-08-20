'use client'

import { motion } from 'motion/react'
import { CountUp } from '@/components/ui/count-up'

interface HeroStatsProps {
  stat1Value: string
  stat1Label: string
  stat2Value: string
  stat2Label: string
  stat3Value: string
  stat3Label: string
  stat4Value: string
  stat4Label: string
  stat5Value: string
  stat5Label: string
}

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

function StatItem({
  value,
  label,
  delay,
}: {
  value: string
  label: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
      className="group relative flex flex-col items-start gap-2 px-4 py-2 sm:px-5 md:px-6 lg:px-7"
    >
      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <CountUp
          value={value}
          className="font-bold leading-none text-gezairi-title"
          style={{
            fontSize: 'clamp(28px, 4.4vw, 54px)',
            letterSpacing: '-0.015em',
          }}
        />
      </div>

      {/* Label with gold underline accent */}
      <div className="relative">
        <span
          className="block font-medium text-gezairi-muted/85"
          style={{
            fontSize: 'clamp(11px, 1.05vw, 14px)',
            letterSpacing: '0.025em',
            lineHeight: 1.35,
          }}
        >
          {label}
        </span>
        <span className="absolute -bottom-1 left-0 h-[2px] w-6 bg-gezairi-gold transition-all duration-500 group-hover:w-12" />
      </div>
    </motion.div>
  )
}

export function HeroStats({
  stat1Value,
  stat1Label,
  stat2Value,
  stat2Label,
  stat3Value,
  stat3Label,
  stat4Value,
  stat4Label,
  stat5Value,
  stat5Label,
}: HeroStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.6 }}
      className="relative w-full"
    >
      <div className="relative bg-transparent px-2 py-4 md:px-4 md:py-6">
        <div className="relative grid grid-cols-2 gap-y-7 sm:grid-cols-3 md:grid-cols-5 md:gap-y-0">
          <StatItem value={stat1Value} label={stat1Label} delay={0.85} />
          <StatItem value={stat2Value} label={stat2Label} delay={0.93} />
          <StatItem value={stat3Value} label={stat3Label} delay={1.01} />
          <StatItem value={stat4Value} label={stat4Label} delay={1.09} />
          <StatItem value={stat5Value} label={stat5Label} delay={1.17} />
        </div>
      </div>
    </motion.div>
  )
}
