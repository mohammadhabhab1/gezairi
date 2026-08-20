import Image from 'next/image'
import { Check } from 'lucide-react'

interface ServiceFeature {
  text: string
}

interface ServiceDetailProps {
  title: string
  subtitle?: string
  description: string
  features: ServiceFeature[]
  heroImageUrl?: string
  sideImageUrl?: string
}

export function ServiceDetail({
  title,
  subtitle,
  description,
  features,
  heroImageUrl,
  sideImageUrl,
}: ServiceDetailProps) {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] mb-12">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gezairi-blue" />
        )}
        <div className="absolute inset-0 bg-gezairi-blue/70 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wider">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/80 mt-4">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Description and Features */}
          <div>
            <p className="text-lg text-gezairi-dark leading-relaxed mb-8">
              {description}
            </p>

            <h3 className="text-2xl font-bold text-gezairi-blue mb-6">
              Key Features
            </h3>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gezairi-gold/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-gezairi-blue" />
                  </div>
                  <p className="text-lg text-gezairi-dark leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          {sideImageUrl && (
            <div className="relative h-[500px] rounded-[20px] overflow-hidden shadow-xl">
              <Image
                src={sideImageUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
