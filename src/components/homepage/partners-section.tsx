'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Partner {
  name: string
  logoUrl: string
  description?: string
}

interface PartnersSectionProps {
  title: string
  subtitle?: string
  partners: Partner[]
}

export function PartnersSection({
  title,
  subtitle,
  partners,
}: PartnersSectionProps) {
  const [current, setCurrent] = useState(0)
  const itemsPerSlide = 5
  const totalSlides = Math.ceil(partners.length / itemsPerSlide)

  const _goTo = (idx: number) => setCurrent(idx)
  const prev = () => setCurrent((c) => (c === 0 ? totalSlides - 1 : c - 1))
  const next = () => setCurrent((c) => (c === totalSlides - 1 ? 0 : c + 1))

  return (
    <section className="w-full max-w-[1310px] px-4 md:px-0 flex flex-col gap-[30px]">
      <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-title leading-[42px] tracking-[0.78px]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-gezairi-dark leading-[32px]">{subtitle}</p>
      )}
      <div className="flex flex-col gap-[30px] items-center w-full">
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-4 lg:gap-[30px] items-center justify-start w-full">
            {partners.slice(current * itemsPerSlide, current * itemsPerSlide + itemsPerSlide).map((partner, i) => (
              <div
                key={i}
                className="bg-white rounded-[10px] w-full lg:w-[250px] h-[120px] md:h-[150px] lg:h-[179px] flex items-center justify-center p-[10px]"
              >
                <div className="relative w-[150px] md:w-[180px] lg:w-[200px] h-[60px] md:h-[80px] lg:h-[100px]">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Progress bar and arrows */}
          <div className="w-full max-w-[700px] flex flex-col items-center mt-8">
            <div className="flex items-center w-full">
              <div className="flex-1 h-[4px] bg-[#e5e5e5] relative">
                <div
                  className="h-[4px] bg-gezairi-title absolute left-0 top-0 transition-all"
                  style={{ width: `${((current + 1) / totalSlides) * 100}%` }}
                />
              </div>
              <div className="flex items-center ml-4 gap-1">
                <button
                  onClick={prev}
                  className="w-6 h-6 flex items-center justify-center text-gezairi-title disabled:opacity-40 bg-transparent"
                  aria-label="Previous"
                  style={{ padding: 0, background: 'none', border: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <polygon points="12,3 6,9 12,15" fill={current === 0 ? '#8B8FB2' : '#2c3278'} />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-6 h-6 flex items-center justify-center text-gezairi-title disabled:opacity-40 bg-transparent"
                  aria-label="Next"
                  style={{ padding: 0, background: 'none', border: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <polygon points="6,3 12,9 6,15" fill={current === totalSlides - 1 ? '#8B8FB2' : '#2c3278'} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
