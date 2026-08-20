import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/lib/payload'

interface YearsImageSectionProps {
  image: Media
  buttonText: string
  buttonLink: string
}

export function YearsImageSection({ image, buttonText, buttonLink }: YearsImageSectionProps) {
  const imageUrl = getMediaUrl(image)

  return (
    <section className="px-4 md:px-[20px] py-0 w-full max-w-[1348px]">
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[734px] rounded-[20px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={image.alt || 'Years Image'}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-8 left-6 md:bottom-[80px] md:left-[80px] lg:bottom-[138px] lg:left-[151px]">
          <Link
            href={buttonLink}
            className="inline-block bg-white/90 border-2 border-gezairi-title text-gezairi-title hover:bg-white rounded-full px-6 md:px-8 py-2 text-[18px] md:text-[24px] font-medium transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
