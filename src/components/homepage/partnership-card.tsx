import Image from 'next/image'

interface PartnershipCardProps {
  titleLine1: string
  titleLine2: string
  descriptionLine1: string
  descriptionLine2?: string
  partnerLogoUrl: string
}

export function PartnershipCard({
  titleLine1,
  titleLine2,
  descriptionLine1,
  descriptionLine2,
  partnerLogoUrl,
}: PartnershipCardProps) {
  return (
    <section className="w-full max-w-[1310px] border border-gezairi-gold rounded-[20px] min-h-[200px] lg:h-[235px] flex flex-col md:flex-row items-center md:items-end justify-between px-4 md:px-[20px] py-4 md:py-[10px] gap-4">
      <div className="flex flex-col gap-[10px] w-full md:flex-1">
        <div className="flex flex-col">
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-blue leading-tight lg:leading-[56px] capitalize">
            {titleLine1}
          </h2>
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-blue leading-tight lg:leading-[56px] capitalize">
            {titleLine2}
          </h2>
        </div>
        <div className="py-[10px]">
          <p className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-gezairi-dark leading-[32px]">
            {descriptionLine1}
          </p>
          {descriptionLine2 && (
            <p className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-gezairi-dark leading-[32px]">
              {descriptionLine2}
            </p>
          )}
        </div>
      </div>
      <div className="relative w-[200px] h-[106px] md:w-[289px] md:h-[153px] shrink-0">
        <Image
          src={partnerLogoUrl}
          alt={`${titleLine1} ${titleLine2}`}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </section>
  )
}
