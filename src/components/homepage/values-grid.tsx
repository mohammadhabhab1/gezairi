'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

interface ValueCardData {
  icon: string
  title: string
  description: string
}

function ValueCard({
  value,
  index,
  sweepColor,
}: {
  value: ValueCardData
  index: number
  sweepColor?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}
      className="value-card group relative flex h-[294px] w-full cursor-default flex-col items-center justify-center overflow-hidden rounded-[10px] bg-white px-[20px] py-[49px] lg:w-[420px]"
    >
      {/* Sweep overlay — slides up from bottom */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-0 transition-all duration-500 ease-out group-hover:h-full ${
          sweepColor ? '' : 'bg-gezairi-blue'
        }`}
        style={sweepColor ? { backgroundColor: sweepColor } : undefined}
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-[27px]">
        <motion.div
          className="relative h-[100px] w-[100px]"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Image
            src={value.icon}
            alt={value.title}
            fill
            className="value-icon object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert"
            unoptimized
          />
        </motion.div>
        <p className="text-[19.3px] font-semibold leading-[25px] tracking-[0.08px] text-gezairi-title transition-colors duration-300 group-hover:text-white">
          {value.title}
        </p>
        <p className="max-w-[350px] text-center text-[14.4px] font-light leading-[19px] tracking-[0.17px] text-black transition-colors duration-300 group-hover:text-white">
          {value.description}
        </p>
      </div>
    </motion.div>
  )
}

export function ValuesGrid({
  values,
  sweepColor,
}: {
  values: ValueCardData[]
  sweepColor?: string
}) {
  return (
    <div className="flex w-full flex-col gap-[10px] md:flex-row md:flex-wrap md:justify-between md:gap-4 md:gap-y-[20px]">
      {values.map((value, index) => (
        <ValueCard key={index} value={value} index={index} sweepColor={sweepColor} />
      ))}
    </div>
  )
}
