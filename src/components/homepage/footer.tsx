'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUp, MapPin, Phone, Mail } from 'lucide-react'

interface FooterProps {
  backgroundImageUrl: string
  logoUrl: string
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Who We Are', href: '/who-we-are' },
{ label: 'Services', href: '/services' },
  { label: 'KVKK', href: '/kvkk' },
]

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export function Footer({ backgroundImageUrl, logoUrl }: FooterProps) {
  return (
    <>
      {/* Main footer with background */}
      <footer className="w-full">
        <div className="relative w-full max-w-[1348px] mx-auto rounded-[15px] overflow-hidden h-[561px]">
        {/* Background image */}
        <Image
          src={backgroundImageUrl}
          alt="Footer background"
          fill
          className="object-cover"
        />

        {/* Content overlay */}
        <div className="relative z-10 h-full p-8">
          <div className="flex flex-col h-full">
            {/* Logo and tagline */}
            <div className="mb-8">
              <div className="relative w-[255px] h-[130px]">
                <Image
                  src={logoUrl}
                  alt="Gezairi Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-base mt-2 ml-8">
                Serving global logistics solutions since 1945.
              </p>
            </div>

            {/* Contact info */}
            <div className="mb-8">
              <h4 className="text-white/80 text-sm mb-4">Contact Office</h4>
              <div className="flex items-start gap-2 text-white">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Beirut, Lebanon</p>
                </div>
              </div>
              <div className="ml-6 mt-2 text-white text-xs space-y-1">
                <p className="font-medium">Port Office</p>
                <p>Boulos Fayyad Building</p>
                <p>4th Floor</p>
                <p>Chafic Wazan Avenue</p>
                <p>P.O.Box: 11/1402</p>
                <p>Riad el soloh 1107 2080</p>
              </div>

              {/* Contact details */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-white text-xs">
                  <Phone className="w-3 h-3" />
                  <a href="tel:+9611783783" className="no-underline md:hidden">+961 1 783783</a>
                  <span className="hidden md:inline">+961 1 783783</span>
                </div>
                <div className="flex items-center gap-2 text-white text-xs">
                  <Phone className="w-3 h-3" />
                  <a href="tel:+9611784784" className="no-underline md:hidden">+961 1 784784</a>
                  <span className="hidden md:inline">+961 1 784784</span>
                </div>
                <div className="flex items-center gap-2 text-white text-xs">
                  <Mail className="w-3 h-3" />
                  <a href="mailto:gezairi@gezairi.com" className="no-underline">gezairi@gezairi.com</a>
                </div>
                <div className="flex items-center gap-2 text-white text-xs">
                  <Mail className="w-3 h-3" />
                  <a href="mailto:hr@gezairi.com" className="no-underline">hr@gezairi.com</a>
                </div>
              </div>
            </div>

            {/* Navigation and social - positioned to the right */}
            <div className="absolute right-8 top-10">
              <div className="flex gap-40">
                {/* Nav links */}
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white text-base hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Social links */}
                <div className="space-y-2">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-white text-base hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll to top button */}
            <button
              type="button"
              aria-label="Scroll to top"
              title="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="absolute right-8 bottom-8 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ArrowUp className="w-6 h-6 text-white" />
            </button>

            {/* Legal links */}
            <div className="absolute bottom-8 left-8 flex gap-20 text-white text-base">
              <Link href="/legal" className="hover:underline">
                Legal
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms of Use
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        </div>
      </footer>

      {/* Copyright bar */}
      <div className="w-full bg-gezairi-page-bg py-5">
        <p className="text-center text-gezairi-muted text-base">
          Copyright 2025 © GEZAIRI
        </p>
      </div>
    </>
  )
}
