'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { ChevronDown } from 'lucide-react'
import type { Locale } from '@/i18n/routing'

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
  ar: 'AR',
}

export function LanguagePicker() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[7px] bg-white px-[5px] cursor-pointer hover:bg-gray-50 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-[16px] text-black leading-[20px]">{localeLabels[locale]}</span>
        <ChevronDown className={`h-[18px] w-[18px] text-black transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 rtl:right-auto rtl:left-0 bg-white shadow-lg border border-gray-100 overflow-hidden z-50 min-w-[70px]">
          {(Object.entries(localeLabels) as [Locale, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => switchLocale(key)}
              className={`block w-full px-[10px] py-[8px] text-[16px] leading-[20px] text-left rtl:text-right transition-colors ${
                key === locale
                  ? 'text-gezairi-blue font-medium bg-gray-50'
                  : 'text-black hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
