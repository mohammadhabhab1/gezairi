import Image from 'next/image'
import { TrendingUp } from 'lucide-react'

interface HeroSectionProps {
  containerImageUrl: string
}

export function HeroSection({ containerImageUrl }: HeroSectionProps) {
  return (
    <section className="relative w-full px-4">
      <div className="relative max-w-[1200px] mx-auto">
        {/* Main content grid */}
        <div className="relative">
          {/* Title */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider text-black">
              LEADING THE
            </h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-black mt-2">
              TRANSPORT AND
              <br />
              LOGISTICS
            </h1>
          </div>

          {/* Container image */}
          <div className="relative mt-[-60px] ml-auto w-full max-w-[1000px]">
            <div className="relative aspect-[1.4/1] w-full">
              <Image
                src={containerImageUrl}
                alt="Shipping container"
                fill
                className="object-contain rotate-[-5deg]"
                priority
              />
            </div>

            {/* Stat bubbles positioned around the container */}
            {/* Established 1945 - left side */}
            <div className="absolute left-0 top-[40%] bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-lg font-medium text-black">
                Established in
              </p>
              <p className="text-2xl font-bold text-black">1945</p>
            </div>

            {/* 10 Countries - center bottom */}
            <div className="absolute left-[45%] bottom-[10%] bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-lg font-medium text-black">Exists in</p>
              <p className="text-black">
                <span className="text-2xl font-bold">10</span>{' '}
                <span className="text-lg font-medium">Countries</span>
              </p>
            </div>

            {/* 600+ Employees - right side */}
            <div className="absolute right-0 top-[30%] bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-black">
                <span className="text-2xl font-bold">600</span>
                <span className="text-lg font-medium"> + </span>
              </p>
              <p className="text-lg font-medium text-black">Employees</p>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="flex gap-16 mt-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-medium text-black">4.7K</span>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <span className="text-base text-black">Successful Shipments</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-medium text-black">228</span>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <span className="text-base text-black">Total Customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
