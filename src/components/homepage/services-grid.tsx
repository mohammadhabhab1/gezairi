import Image from 'next/image'
import Link from 'next/link'

interface Service {
  slug: string
  title: string
  description: string
  iconUrl?: string
}

interface ServicesGridProps {
  title: string
  subtitle?: string
  services: Service[]
  showTitle?: boolean
}

export function ServicesGrid({ title, subtitle, services, showTitle = true }: ServicesGridProps) {
  return (
    <section className="w-full px-4 md:px-[30px] py-[10px] flex flex-col gap-[40px]">
      {/* Title */}
      {showTitle && (
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-title leading-[42px] tracking-[0.78px] relative w-fit">
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[18px] md:text-[22px] lg:text-[28px] font-semibold text-gezairi-body leading-[23px] tracking-[-0.05px]">
          {subtitle}
        </p>
      )}

      {/* Services Grid - responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-[30px] w-full">
        {services.map((service, index) => (
          <Link
            key={index}
            href={`/services/${service.slug}`}
            className="bg-white w-full min-h-[180px] lg:min-h-[216px] flex flex-col items-start justify-end px-[18px] py-[20px] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-gezairi-gold"
          >
            <div className="flex flex-col gap-[20px] items-start w-full">
              <div className="flex flex-col gap-[7px] items-start w-full">
                {service.iconUrl ? (
                  <div className="relative w-[65px] h-[65px]">
                    <Image
                      src={service.iconUrl}
                      alt={service.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-[65px] h-[65px] bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gezairi-title">
                      {service.title.charAt(0)}
                    </span>
                  </div>
                )}
                <p className="text-[20px] font-semibold text-gezairi-dark leading-[25px] tracking-[0.31px]">
                  {service.title}
                </p>
              </div>
              <p className="text-[16px] font-light text-gezairi-body leading-[25px] tracking-[0.25px]">
                {service.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
