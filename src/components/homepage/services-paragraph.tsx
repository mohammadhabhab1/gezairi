interface ServicesParagraphProps {
  text: string
}

export function ServicesParagraph({ text }: ServicesParagraphProps) {
  return (
    <div className="w-full px-4 md:px-[30px] pt-[10px]">
      <p className="text-[18px] md:text-[22px] lg:text-[28px] font-semibold text-gezairi-body leading-[23px] tracking-[-0.05px]">
        {text}
      </p>
    </div>
  )
}
