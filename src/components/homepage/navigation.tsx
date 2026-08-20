'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/', active: true },
  { label: 'Who We Are', href: '/who-we-are', active: false },
{ label: 'Regional Offices', href: '/regional-offices', active: false },
  { label: 'Services', href: '/services', active: false },
  { label: 'Contact Us', href: '/contact', active: false },
  { label: 'KVKK', href: '/kvkk', active: false },
]

interface NavigationProps {
  logoUrl: string
}

export function Navigation({ logoUrl }: NavigationProps) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 px-5 py-2.5 w-full !font-serif">
      <Link href="/" className="shrink-0">
        <Image
          src={logoUrl}
          alt="Gezairi Logo"
          width={169}
          height={80}
          className="h-20 w-auto object-contain"
        />
      </Link>

      <div className="flex items-center">
        <ul className="flex flex-wrap items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block px-4 py-3 text-lg transition-colors',
                  item.active
                    ? 'text-gezairi-blue font-medium'
                    : 'text-gezairi-gray hover:text-gezairi-blue'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-1.5 bg-white px-1.5 shrink-0">
        <span className="text-base text-black">EN</span>
        <ChevronDown className="h-4 w-4 text-black" />
      </div>
    </nav>
  )
}
