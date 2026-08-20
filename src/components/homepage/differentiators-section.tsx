import Image from 'next/image'

interface Differentiator {
  text: string
}

interface DifferentiatorsSectionProps {
  title: string
  leftColumn: Differentiator[]
  rightColumn: Differentiator[]
}

export function DifferentiatorsSection({
  title,
  leftColumn,
  rightColumn,
}: DifferentiatorsSectionProps) {
  return (
    <section className="w-full max-w-[1330px] px-4 md:px-[10px] flex flex-col gap-[30px]">
      <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-blue leading-tight lg:leading-[56px] capitalize">
        {title}
      </h2>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-[50px] px-0 md:px-[10px] w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-[15px]">
          {leftColumn.map((item, index) => (
            <div key={index} className="flex items-center gap-[10px]">
              <div className="w-[30px] h-[30px] relative shrink-0">
                <Image
                  src="/images/gezairi/icons/check-icon.svg"
                  alt="Check"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-gezairi-dark leading-[32px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-[15px]">
          {rightColumn.map((item, index) => (
            <div key={index} className="flex items-center gap-[10px]">
              <div className="w-[30px] h-[30px] relative shrink-0">
                <Image
                  src="/images/gezairi/icons/check-icon.svg"
                  alt="Check"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-gezairi-dark leading-[32px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
