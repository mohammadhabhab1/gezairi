'use client'

import { useState, useEffect, useCallback } from 'react'
import { Link } from '@/i18n/navigation'
import { Menu, X } from 'lucide-react'

interface NavItem {
  label: string
  href: string
}

interface MobileNavProps {
  navItems: NavItem[]
  pathname: string
}

export function MobileNav({ navItems, pathname }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-black focus-visible:ring-2 focus-visible:ring-gezairi-blue focus-visible:ring-offset-2 rounded-sm"
        aria-label="Open menu"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Slide-in drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-gezairi-light z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button
            type="button"
            onClick={close}
            className="p-2 text-black focus-visible:ring-2 focus-visible:ring-gezairi-blue focus-visible:ring-offset-2 rounded-sm"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4">
          {navItems.map((item) =>
            item.href.startsWith('#') ? (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="block py-3 text-[18px] leading-[20px] border-b border-gray-200 transition-colors text-gezairi-gray hover:text-gezairi-blue"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href as '/'}
                onClick={close}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={`block py-3 text-[18px] leading-[20px] border-b border-gray-200 transition-colors ${
                  pathname === item.href
                    ? 'text-gezairi-blue font-medium'
                    : 'text-gezairi-gray hover:text-gezairi-blue'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  )
}
