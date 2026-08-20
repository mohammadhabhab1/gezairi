"use client"
import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'

interface LogoItem {
  logo: string
  width: number
  height: number
  name?: string
}

interface LogosCarouselProps {
  logos: LogoItem[]
}

function useResponsiveItemsPerSlide() {
  const [itemsPerSlide, setItemsPerSlide] = useState(2)

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      if (w >= 1024) setItemsPerSlide(5)
      else if (w >= 768) setItemsPerSlide(3)
      else setItemsPerSlide(2)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return itemsPerSlide
}

export function LogosCarousel({ logos }: LogosCarouselProps) {
  const itemsPerSlide = useResponsiveItemsPerSlide()
  const [current, setCurrent] = useState(0)
  const totalSlides = Math.ceil(logos.length / itemsPerSlide)

  useEffect(() => {
    setCurrent(0)
  }, [itemsPerSlide])

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? totalSlides - 1 : c - 1)), [totalSlides])
  const next = useCallback(() => setCurrent((c) => (c === totalSlides - 1 ? 0 : c + 1)), [totalSlides])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { prev(); e.preventDefault() }
    if (e.key === 'ArrowRight') { next(); e.preventDefault() }
  }, [prev, next])

  return (
    <div
      className="w-full flex flex-col items-center"
      role="region"
      aria-label="Partners carousel"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-4 lg:gap-[30px] items-center justify-start w-full" role="group" aria-label={`Slide ${current + 1} of ${totalSlides}`} aria-live="polite">
        {logos.slice(current * itemsPerSlide, current * itemsPerSlide + itemsPerSlide).map((logo, i) => (
          <div
            key={i}
            className="bg-white rounded-[10px] w-full lg:w-[250px] h-[120px] md:h-[150px] lg:h-[179px] flex items-center justify-center p-[10px]"
          >
            <div className="relative" style={{ width: Math.min(logo.width, 180), height: Math.min(logo.height, 80) }}>
              <Image
                src={logo.logo}
                alt={logo.name || `Partner ${current * itemsPerSlide + i + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Progress bar and arrows styled as in services carousel */}
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
  )
}
