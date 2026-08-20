'use client'

import dynamic from 'next/dynamic'

const OfficesMap = dynamic(() => import('./OfficesMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[1146/665] bg-[#f0f0f0] flex items-center justify-center">
      <p className="text-gezairi-gray">Loading map...</p>
    </div>
  ),
})

export default function OfficesMapWrapper() {
  return <OfficesMap />
}
