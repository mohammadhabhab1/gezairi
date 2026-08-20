'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Service {
  icon: string
  title: string
  description: string
}

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Group services into slides of 4 items each
  const itemsPerSlide = 4
  const totalSlides = Math.ceil(services.length / itemsPerSlide)

  const getSlideServices = (slideIndex: number) => {
    const start = slideIndex * itemsPerSlide
    return services.slice(start, start + itemsPerSlide)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  return (
    <section className="w-full px-4">
      <div className="max-w-[1340px] mx-auto">
        {/* Section title */}
        <div className="mb-5">
          <h2 className="text-4xl font-bold text-gezairi-blue tracking-wide">
            Our Services
          </h2>
          <div className="w-full h-0.5 bg-gradient-to-r from-gezairi-blue to-transparent mt-2" />
        </div>

        {/* Subtitle */}
        <p className="text-base text-gezairi-gold mb-8">
          GEZAIRI offers a broad range of end-to-end, customized logistics
          solutions worldwide.
        </p>

        {/* Carousel container */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden lg:flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gezairi-blue" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden lg:flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gezairi-blue" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {getSlideServices(slideIndex).map((service, index) => (
                      <Card
                        key={index}
                        className="bg-white rounded-[10px] border-0 shadow-sm h-[294px]"
                      >
                        <CardContent className="flex flex-col items-center justify-center h-full p-5 gap-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={service.icon}
                              alt={service.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <h3 className="text-xl font-semibold text-gezairi-blue">
                            {service.title}
                          </h3>
                          <div className="w-16 h-0.5 bg-gezairi-blue" />
                          <p className="text-base text-center text-gezairi-dark">
                            {service.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                currentSlide === index
                  ? 'bg-gezairi-blue w-8'
                  : 'bg-gezairi-gray/30 hover:bg-gezairi-gray/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
