import Image from 'next/image'

interface Partner {
  name: string
  logoUrl: string
  description?: string
}

interface PartnersGridProps {
  title: string
  subtitle?: string
  partners: Partner[]
}

export function PartnersGrid({ title, subtitle, partners }: PartnersGridProps) {
  return (
    <section className="w-full max-w-[1330px] px-4 md:px-[10px] flex flex-col gap-[30px]">
      <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-blue leading-tight lg:leading-[56px] capitalize">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-gezairi-dark leading-[32px]">{subtitle}</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white rounded-[10px] w-full h-[120px] md:h-[150px] lg:h-[179px] flex items-center justify-center p-[10px]"
          >
            <div className="relative w-[150px] md:w-[180px] lg:w-[200px] h-[60px] md:h-[80px] lg:h-[100px]">
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
