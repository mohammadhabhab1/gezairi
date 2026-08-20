'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

interface ServiceCardData {
  icon: string
  iconWidth: number
  iconHeight: number
  title: string
  description: string
  slug: string
}

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

export function ServiceCard({
  service,
  locale,
  index,
}: {
  service: ServiceCardData
  locale: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease }}
      whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
    >
      <Link
        href={`/${locale}/services/${service.slug}`}
        className="group flex h-[216px] w-full cursor-pointer flex-col items-start justify-start overflow-hidden bg-white px-[18px] py-[20px] transition-shadow focus:outline-none focus:ring-2 focus:ring-[#9B7C4B] lg:h-[216.36px]"
      >
        <div className="flex w-full flex-col items-start gap-[20px]">
          <div className="flex w-full flex-col items-start gap-[7px]">
            <div className="relative h-[65px] w-[65px] transition-transform duration-300 group-hover:scale-110">
              <Image src={service.icon} alt={service.title} fill className="object-contain" />
            </div>
            <p className="text-[20px] font-semibold leading-[25px] tracking-[0.31px] text-gezairi-dark transition-colors group-hover:text-[#9B7C4B]">
              {service.title}
            </p>
          </div>
          <p className="text-[16px] font-light leading-[25px] tracking-[0.25px] text-gezairi-body">
            {service.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
