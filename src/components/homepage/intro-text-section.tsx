interface IntroTextSectionProps {
  highlightedText: string
  mainText: string
  additionalParagraphs?: Array<{ text: string }>
}

export function IntroTextSection({
  highlightedText,
  mainText,
  additionalParagraphs
}: IntroTextSectionProps) {
  return (
    <section className="w-full max-w-[1330px] px-4 md:px-[10px]">
      <div className="px-0 md:px-[10px]">
        <p className="text-gezairi-dark leading-[32px]">
          <span className="text-[#9B7C4B] text-[28px] md:text-[36px] lg:text-[48px] font-bold">
            {highlightedText}
          </span>{' '}
          <span className="text-[16px] md:text-[20px] lg:text-[24px] font-light">
            {mainText}
          </span>
        </p>
        {additionalParagraphs?.map((paragraph, index) => (
          <p key={index} className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-gezairi-dark leading-[32px] mt-0">
            {paragraph.text}
          </p>
        ))}
      </div>
    </section>
  )
}
