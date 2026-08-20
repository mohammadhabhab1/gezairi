interface VisionSectionProps {
  title: string
  content: string
  founderName?: string
  founderTitle?: string
  founderImageUrl?: string
}

export function VisionSection({
  title,
  content,
  founderName: _founderName,
  founderTitle: _founderTitle,
  founderImageUrl: _founderImageUrl,
}: VisionSectionProps) {
  // Split content by newlines to create multiple paragraphs
  const paragraphs = content.split('\n').filter(p => p.trim())

  return (
    <section className="w-full max-w-[1330px] px-4 md:px-[10px] flex flex-col gap-[20px]">
      <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-blue leading-tight lg:leading-[56px]">
        {title}
      </h2>
      <div className="px-0 md:px-[10px]">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-gezairi-dark leading-[32px] w-full mt-0">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
