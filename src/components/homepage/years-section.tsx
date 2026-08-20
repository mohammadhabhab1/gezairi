import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface YearsSectionProps {
  backgroundImageUrl: string
}

export function YearsSection({ backgroundImageUrl }: YearsSectionProps) {
  return (
    <section className="relative w-full px-5">
      <div className="relative w-full max-w-[1348px] mx-auto rounded-[20px] overflow-hidden h-[734px]">
        {/* Background image */}
        <Image
          src={backgroundImageUrl}
          alt="80 Years of Excellence"
          fill
          className="object-cover"
        />

        {/* Learn More button - positioned at bottom left */}
        <div className="absolute bottom-24 left-36">
          <Button
            asChild
            variant="outline"
            className="bg-white/90 border-2 border-gezairi-blue text-gezairi-blue hover:bg-white hover:text-gezairi-blue rounded-full px-8 py-6 text-xl font-medium"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
