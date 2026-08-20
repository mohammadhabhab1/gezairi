'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Link } from '@/i18n/navigation'

interface ServiceCardData {
  icon?: string
  iconUrl?: string
  iconWidth?: number
  iconHeight?: number
  title: string
  description: string
  slug: string
}

interface ServicesCarouselProps {
  title?: string
  subtitle?: string
  services: ServiceCardData[]
  showTitle?: boolean
}

function useResponsiveItemsPerSlide() {
  const [itemsPerSlide, setItemsPerSlide] = useState(1)

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      if (w >= 1024) setItemsPerSlide(4)
      else if (w >= 768) setItemsPerSlide(2)
      else setItemsPerSlide(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return itemsPerSlide
}

export function ServicesCarousel({
  title,
  subtitle,
  services,
  showTitle = true,
}: ServicesCarouselProps) {
  const itemsPerSlide = useResponsiveItemsPerSlide()
  const [current, setCurrent] = useState(0)
  const totalSlides = Math.ceil(services.length / itemsPerSlide)

  // Reset current when itemsPerSlide changes to avoid out-of-bounds
  useEffect(() => {
    setCurrent(0)
  }, [itemsPerSlide])

  const prev = () => setCurrent((c) => (c === 0 ? totalSlides - 1 : c - 1))
  const next = () => setCurrent((c) => (c === totalSlides - 1 ? 0 : c + 1))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prev()
      e.preventDefault()
    }
    if (e.key === 'ArrowRight') {
      next()
      e.preventDefault()
    }
  }

  return (
    <section
      className="flex w-full flex-col gap-[30px]"
      role="region"
      aria-label={title || 'Services carousel'}
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      {/* Title */}
      {showTitle && title && (
        <h2 className="relative w-fit text-[24px] font-bold leading-[42px] tracking-[0.78px] text-gezairi-title md:text-[32px] lg:text-[40px]">
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[18px] font-semibold leading-[23px] tracking-[-0.05px] text-gezairi-body md:text-[22px] lg:text-[28px]">
          {subtitle}
        </p>
      )}

      <div className="flex w-full flex-col items-center" aria-live="polite">
        <div
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-[30px]"
          role="group"
          aria-label={`Slide ${current + 1} of ${totalSlides}`}
        >
          {services
            .slice(current * itemsPerSlide, current * itemsPerSlide + itemsPerSlide)
            .map((service, i) => {
              // Use iconUrl from Payload or icon from manual data
              const iconSrc = service.iconUrl || service.icon

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-[216px] w-full cursor-pointer flex-col items-start justify-start overflow-hidden bg-white px-[18px] py-[20px] transition-shadow focus:outline-none focus:ring-2 focus:ring-gezairi-gold"
                  >
                    <div className="flex w-full flex-col items-start gap-[20px]">
                      <div className="flex w-full flex-col items-start gap-[7px]">
                        {iconSrc ? (
                          <div className="relative h-[65px] w-[65px] transition-transform duration-300 group-hover:scale-110">
                            <Image
                              src={iconSrc}
                              alt={service.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex h-[65px] w-[65px] items-center justify-center bg-gray-100">
                            <span className="text-2xl font-bold text-gezairi-title">
                              {service.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        <p className="text-[20px] font-semibold leading-[25px] tracking-[0.31px] text-gezairi-dark transition-colors group-hover:text-gezairi-gold">
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
            })}
        </div>
        {/* Progress bar and arrows styled as screenshot */}
        <div className="mt-[30px] flex w-full max-w-[700px] flex-col items-center md:mt-8">
          {/* Progress bar and arrows only */}
          <div className="flex w-full items-center">
            <div className="relative h-[4px] flex-1 bg-[#e5e5e5]">
              <div
                className="absolute left-0 top-0 h-[4px] bg-gezairi-title transition-all"
                style={{ width: `${((current + 1) / totalSlides) * 100}%` }}
              />
            </div>
            <div className="ml-4 flex items-center gap-1">
              <button
                onClick={prev}
                className="flex h-6 w-6 items-center justify-center bg-transparent text-gezairi-title disabled:opacity-40"
                aria-label="Previous"
                style={{ padding: 0, background: 'none', border: 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polygon points="12,3 6,9 12,15" fill={current === 0 ? '#8B8FB2' : '#2c3278'} />
                </svg>
              </button>
              <button
                onClick={next}
                className="flex h-6 w-6 items-center justify-center bg-transparent text-gezairi-title disabled:opacity-40"
                aria-label="Next"
                style={{ padding: 0, background: 'none', border: 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polygon
                    points="6,3 12,9 6,15"
                    fill={current === totalSlides - 1 ? '#8B8FB2' : '#2c3278'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
