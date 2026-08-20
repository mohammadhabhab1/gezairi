import Image from 'next/image'

interface HeroGlobeProps {
  seaLabel?: string
  airLabel?: string
  landLabel?: string
}

export function HeroGlobe({ seaLabel = 'Sea', airLabel = 'Air', landLabel = 'Land' }: HeroGlobeProps) {
  return (
    <div className="hero-globe-wrap relative mx-auto h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] md:h-[480px] md:w-[480px] lg:h-[560px] lg:w-[560px]">
      {/* Ambient brand glow */}
      <div
        className="pointer-events-none absolute -inset-[10%] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(44,50,120,0.32) 0%, rgba(44,50,120,0.10) 45%, transparent 75%)',
        }}
      />

      {/* Outer dashed orbit */}
      <div className="hero-orbit absolute inset-[2%] rounded-full border border-dashed border-gezairi-blue/25" />

      {/* Inner solid orbit */}
      <div className="absolute inset-[6%] rounded-full border border-gezairi-blue/10" />

      {/* Globe sphere */}
      <div className="hero-globe-float absolute inset-[10%] overflow-hidden rounded-full shadow-[0_40px_90px_-20px_rgba(44,50,120,0.55)] ring-1 ring-gezairi-blue/15">
        {/* Deep sphere base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, hsl(231 64% 48%) 0%, hsl(231 60% 32%) 38%, hsl(231 65% 16%) 80%, hsl(231 70% 10%) 100%)',
          }}
        />

        {/* Continents — masked world map for real geography */}
        <div className="hero-globe-rotate absolute inset-0 mix-blend-screen opacity-[0.55]">
          <Image
            src="/images/gezairi/maps/world-map.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 768px) 380px, 560px"
            className="object-cover"
            priority
          />
        </div>

        {/* Latitude/Longitude wireframe */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full text-white/15"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="sphereMask" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="none" stroke="currentColor" strokeWidth="0.4">
            {/* Latitudes */}
            <ellipse cx="100" cy="100" rx="98" ry="20" />
            <ellipse cx="100" cy="100" rx="98" ry="45" />
            <ellipse cx="100" cy="100" rx="98" ry="70" />
            <ellipse cx="100" cy="100" rx="98" ry="90" />
            {/* Longitudes */}
            <ellipse cx="100" cy="100" rx="20" ry="98" />
            <ellipse cx="100" cy="100" rx="45" ry="98" />
            <ellipse cx="100" cy="100" rx="70" ry="98" />
            <ellipse cx="100" cy="100" rx="90" ry="98" />
            {/* Equator */}
            <line x1="2" y1="100" x2="198" y2="100" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
          </g>
        </svg>

        {/* Glowing logistics hubs + arcs */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="1" />
              <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0" />
              <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Connection arcs between major hubs */}
          <g fill="none" stroke="url(#arcGrad)" strokeWidth="0.8" strokeLinecap="round">
            <path d="M 60 80 Q 100 30 140 70" className="hero-arc-pulse" />
            <path d="M 50 110 Q 90 150 150 120" className="hero-arc-pulse hero-arc-pulse--delay-1" />
            <path d="M 130 60 Q 140 100 110 140" className="hero-arc-pulse hero-arc-pulse--delay-2" />
            <path d="M 70 130 Q 110 95 160 100" className="hero-arc-pulse hero-arc-pulse--delay-3" />
          </g>

          {/* Hub points */}
          <g>
            {[
              { cx: 60, cy: 80 },
              { cx: 140, cy: 70 },
              { cx: 50, cy: 110 },
              { cx: 150, cy: 120 },
              { cx: 130, cy: 60 },
              { cx: 110, cy: 140 },
              { cx: 70, cy: 130 },
              { cx: 160, cy: 100 },
            ].map((p, i) => (
              <g key={i} className="hero-hub-pulse" style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${p.cx}px ${p.cy}px` }}>
                <circle cx={p.cx} cy={p.cy} r="4" fill="url(#hubGlow)" />
                <circle cx={p.cx} cy={p.cy} r="1.2" fill="#E0F2FE" />
              </g>
            ))}
          </g>
        </svg>

        {/* Top-left specular highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent" />
        {/* Bottom shadow vignette */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-black/40" />
        {/* Atmospheric rim */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: 'inset 0 0 40px rgba(125, 211, 252, 0.25), inset 0 0 80px rgba(44, 50, 120, 0.4)',
          }}
        />
      </div>

      {/* Sea badge */}
      <div className="hero-badge-pulse absolute left-[-4%] top-[14%] flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 shadow-[0_12px_28px_rgba(44,50,120,0.18)] ring-1 ring-gezairi-blue/10 backdrop-blur sm:left-[-2%] sm:px-4 sm:py-2.5">
        <div className="relative h-[22px] w-[22px] md:h-[26px] md:w-[26px]">
          <Image src="/images/gezairi/services/ocean-freight.png" alt="" aria-hidden="true" fill className="object-contain" unoptimized />
        </div>
        <span className="text-[12px] font-semibold tracking-wide text-gezairi-blue md:text-[14px]">{seaLabel}</span>
      </div>

      {/* Air badge */}
      <div className="hero-badge-pulse hero-badge-pulse--delay-2 absolute right-[-3%] top-[2%] flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 shadow-[0_12px_28px_rgba(44,50,120,0.18)] ring-1 ring-gezairi-blue/10 backdrop-blur sm:right-[-1%] sm:px-4 sm:py-2.5">
        <div className="relative h-[22px] w-[22px] md:h-[26px] md:w-[26px]">
          <Image src="/images/gezairi/services/air-freight.png" alt="" aria-hidden="true" fill className="object-contain" unoptimized />
        </div>
        <span className="text-[12px] font-semibold tracking-wide text-gezairi-blue md:text-[14px]">{airLabel}</span>
      </div>

      {/* Land badge */}
      <div className="hero-badge-pulse hero-badge-pulse--delay-4 absolute bottom-[12%] right-[-4%] flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 shadow-[0_12px_28px_rgba(44,50,120,0.18)] ring-1 ring-gezairi-blue/10 backdrop-blur sm:right-[-2%] sm:px-4 sm:py-2.5">
        <div className="relative h-[22px] w-[22px] md:h-[26px] md:w-[26px]">
          <Image src="/images/gezairi/services/land-freight.png" alt="" aria-hidden="true" fill className="object-contain" unoptimized />
        </div>
        <span className="text-[12px] font-semibold tracking-wide text-gezairi-blue md:text-[14px]">{landLabel}</span>
      </div>
    </div>
  )
}
