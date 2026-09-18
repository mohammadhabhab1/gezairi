'use client'

import { useEffect, useState } from 'react'
import { useMotionValue, animate } from 'motion/react'

interface CountUpProps {
  value: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}

function parseValue(value: string): { number: number; prefix: string; suffix: string; decimals: number; isThousands: boolean } {
  const trimmed = value.trim()
  // Detect K/M/B suffix
  const kMatch = trimmed.match(/^([+-]?)(\d+(?:\.\d+)?)(K|M|B)([+]?)$/i)
  if (kMatch) {
    const [, prefix, num, unit, plus] = kMatch
    const decimals = num.includes('.') ? num.split('.')[1].length : 0
    return {
      number: parseFloat(num),
      prefix: prefix || '',
      suffix: unit + (plus || ''),
      decimals,
      isThousands: false,
    }
  }
  // Plain number with optional + prefix/suffix
  const plainMatch = trimmed.match(/^([+-]?)(\d+(?:\.\d+)?)([+]?)$/)
  if (plainMatch) {
    const [, prefix, num, plus] = plainMatch
    const decimals = num.includes('.') ? num.split('.')[1].length : 0
    return {
      number: parseFloat(num),
      prefix: prefix || '',
      suffix: plus || '',
      decimals,
      isThousands: false,
    }
  }
  return { number: 0, prefix: '', suffix: trimmed, decimals: 0, isThousands: false }
}

export function CountUp({ value, duration = 2, className, style }: CountUpProps) {
  const motion = useMotionValue(0)
  const parsed = parseValue(value)
  const [display, setDisplay] = useState(`${parsed.prefix}0${parsed.suffix}`)

  // Animates on mount rather than waiting for the element to scroll into
  // view: on mobile the hero content stacks (headline, then globe, then
  // this stats row), so the row can start below the fold, and the
  // scroll-triggered visibility check was unreliable there — it would
  // sometimes never fire, permanently leaving the value stuck at 0.
  useEffect(() => {
    const controls = animate(motion, parsed.number, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => {
        const formatted = parsed.decimals > 0 ? v.toFixed(parsed.decimals) : Math.round(v).toString()
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`)
      },
    })
    return () => controls.stop()
  }, [parsed.number, parsed.prefix, parsed.suffix, parsed.decimals, duration, motion])

  return (
    <span className={className} style={style}>
      {display}
    </span>
  )
}
