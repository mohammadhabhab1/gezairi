import React from 'react'
import Image from 'next/image'

interface CardData {
  logo: string
  logoWidth: number
  logoHeight: number
  points: string[]
}

interface DrivingValueTogetherProps {
  title: string
  leftCard: CardData
  rightCard: CardData
}

export function DrivingValueTogether({ title, leftCard, rightCard }: DrivingValueTogetherProps) {
  return (
    <section className="w-full max-w-[1330px] px-4 md:px-0 flex flex-col gap-[15px]">
      <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-blue leading-tight lg:leading-[56px] capitalize">
        {title}
      </h2>
      <div className="border-t border-b border-gezairi-gold min-h-[300px] lg:h-[416px] flex items-center justify-center px-0 md:px-[10px] py-6 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 lg:gap-0">
          {/* Left Card */}
          <div className="w-full lg:w-[600px] min-h-[200px] lg:h-[304px] rounded-[20px] flex flex-col gap-[30px] items-start justify-center px-4 md:px-[36px]">
            <div className="relative" style={{ width: Math.min(leftCard.logoWidth, 300), height: leftCard.logoHeight }}>
              <Image
                src={leftCard.logo}
                alt="Partner Logo"
                fill
                className="object-contain"
              />
            </div>
            <ul className="text-[16px] md:text-[20px] lg:text-[24px] font-semibold text-gezairi-blue leading-[32px] list-disc pl-[36px]">
              {leftCard.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[20px] h-[298px] relative">
            <Image
              src="/images/gezairi/icons/divider.svg"
              alt="Divider"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <hr className="lg:hidden w-full border-gezairi-gold" />

          {/* Right Card */}
          <div className="w-full lg:w-[600px] min-h-[200px] lg:h-[304px] rounded-[20px] flex flex-col gap-[36px] items-start justify-center px-4 md:px-[27px]">
            <div className="relative" style={{ width: Math.min(rightCard.logoWidth, 250), height: rightCard.logoHeight }}>
              <Image
                src={rightCard.logo}
                alt="Partner Logo"
                fill
                className="object-contain"
              />
            </div>
            <ul className="text-[16px] md:text-[20px] lg:text-[24px] font-semibold text-gezairi-title leading-[32px] list-disc pl-[36px] w-full lg:w-[528px]">
              {rightCard.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
