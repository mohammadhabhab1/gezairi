interface PrivacySection {
  number: string
  title: string
  content: string
}

interface PrivacySectionProps {
  title: string
  lastUpdated?: string
  introduction?: string
  sections: PrivacySection[]
}

export function PrivacyContent({
  title,
  lastUpdated,
  introduction,
  sections,
}: PrivacySectionProps) {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[900px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gezairi-blue tracking-wide mb-4">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-gezairi-gray">
              Last Updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Introduction */}
        {introduction && (
          <div className="mb-12">
            <p className="text-lg text-gezairi-dark leading-relaxed">
              {introduction}
            </p>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, index) => (
            <div key={index} className="border-b border-gray-100 pb-10 last:border-0">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl font-bold text-gezairi-gold">
                  {section.number}
                </span>
                <h2 className="text-2xl font-semibold text-gezairi-blue mt-1">
                  {section.title}
                </h2>
                 
              </div>
              <div className="pl-14">
                <p className="text-base text-gezairi-dark leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
