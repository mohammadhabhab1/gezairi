'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PageHeroProps {
  title: string
  subtitle?: string
  imageUrl?: string
  overlayColor?: 'blue' | 'dark'
}

export function PageHero({
  title,
  subtitle,
  imageUrl,
  overlayColor: _overlayColor = 'blue',
}: PageHeroProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = imageUrl && !imgError

  return (
    <section className="w-full px-4 md:px-5 pt-0">
      <div className="relative w-full max-w-[1348px] h-[250px] md:h-[350px] lg:h-[486px] rounded-[20px] overflow-hidden">
        {showImage ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gezairi-blue" />
        )}
        <h1 className="absolute left-4 lg:left-[17px] bottom-6 md:bottom-8 lg:bottom-auto lg:top-[399px] lg:translate-y-[-50%] text-[32px] md:text-[52px] lg:text-[80px] font-bold text-white leading-tight lg:leading-[105px]">
          {title}
        </h1>
        {subtitle && (
          <p className="absolute left-4 lg:left-[17px] bottom-2 md:bottom-3 lg:bottom-auto lg:top-[460px] text-[16px] md:text-[20px] lg:text-[24px] text-white/90 max-w-[800px]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
