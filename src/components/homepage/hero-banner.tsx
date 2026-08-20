'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { CountUp } from '@/components/ui/count-up'

interface HeroBannerProps {
  line1: string
  line2: string
  line3: string
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
  imageAlt: string
}

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const wordFade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease },
  }),
}

interface StatProps {
  value: string
  label: string
}

function StatItem({ value, label }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <CountUp
        value={value}
        className="font-bold leading-none text-black"
        style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', letterSpacing: '0.01em' }}
      />
      <span
        className="font-semibold text-black"
        style={{ fontSize: 'clamp(10px, 1vw, 13px)', letterSpacing: '-0.01em' }}
      >
        {label}
      </span>
    </div>
  )
}

export function HeroBanner({
  line1,
  line2,
  line3,
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
  imageAlt,
}: HeroBannerProps) {
  return (
    <div className="relative mx-auto w-full max-w-[1212px] py-6 md:py-10">
      <div className="flex flex-col gap-8 md:grid md:grid-cols-[42%_1fr] md:items-center md:gap-4">
        {/* Left: Title */}
        <div className="flex flex-col gap-10 md:gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-1 text-black"
          >
            <motion.span
              custom={0}
              variants={wordFade}
              className="block whitespace-nowrap leading-[1.1] tracking-[0.025em]"
              style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', fontWeight: 600 }}
            >
              {line1}
            </motion.span>
            <motion.span
              custom={1}
              variants={wordFade}
              className="block whitespace-nowrap leading-[1.1] tracking-[0.04em]"
              style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: 700 }}
            >
              {line2}
            </motion.span>
            <motion.span
              custom={2}
              variants={wordFade}
              className="block whitespace-nowrap leading-[1.1] tracking-[0.04em]"
              style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: 700 }}
            >
              {line3}
            </motion.span>
          </motion.div>
        </div>

        {/* Right: Container image */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: -5.5 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative h-[260px] w-full md:h-[480px] lg:h-[560px]"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative h-full w-full"
          >
            <Image
              src="/images/gezairi/heroes/rectangle.png"
              alt={imageAlt}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Stats — full width below */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:mt-10 md:flex md:flex-wrap md:items-end md:gap-x-12 lg:gap-x-16"
      >
        <StatItem value={stat1Value} label={stat1Label} />
        <StatItem value={stat2Value} label={stat2Label} />
        <StatItem value={stat3Value} label={stat3Label} />
        <StatItem value={stat4Value} label={stat4Label} />
        <StatItem value={stat5Value} label={stat5Label} />
      </motion.div>
    </div>
  )
}
