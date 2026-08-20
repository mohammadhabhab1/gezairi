import Image from 'next/image'

interface Stat {
  icon?: string
  value?: string
  label: string
  labelWidth?: number
}

interface StatsBarProps {
  stats: Stat[]
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="w-full max-w-[1380px] min-h-[165px] bg-gezairi-blue grid grid-cols-2 md:grid-cols-4 lg:flex items-center justify-between px-4 md:px-[20px] py-4 lg:py-0 gap-4 lg:gap-[50px]">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-[13px]">
          {/* Icon or Value */}
          {stat.icon ? (
            <div className="w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] relative shrink-0">
              <Image
                src={stat.icon}
                alt={stat.label}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ) : stat.value ? (
            <span className="text-[36px] md:text-[48px] lg:text-[64px] font-semibold text-[#9B7C4B] leading-[72px]">
              {stat.value}
            </span>
          ) : null}

          {/* Label */}
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-white leading-[23px]">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  )
}
