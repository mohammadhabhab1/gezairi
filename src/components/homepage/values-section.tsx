import Image from 'next/image'

interface Value {
  icon: string
  title: string
  description: string
}

interface ValuesSectionProps {
  title: string
  values: Value[]
  showTitle?: boolean
}

export function ValuesSection({ title, values, showTitle = true }: ValuesSectionProps) {
  return (
    <section className="w-full max-w-[1330px] px-4 md:px-[10px] flex flex-col gap-[30px]">
      {showTitle && (
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-title leading-[42px] tracking-[0.78px] relative w-fit">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[20px] w-full">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-white rounded-[10px] w-full lg:w-[420px] h-auto min-h-[200px] lg:h-[294px] flex flex-col items-center justify-center px-[20px] py-8 lg:py-[49px]"
          >
            <div className="flex flex-col gap-[27px] items-center w-full">
              <div className="relative w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]">
                <Image
                  src={value.icon}
                  alt={value.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-[19.3px] font-semibold text-gezairi-title leading-[25px] tracking-[0.08px]">
                {value.title}
              </h3>
              <p className="text-[14.4px] font-light text-black text-center leading-[19px] tracking-[0.17px]">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
