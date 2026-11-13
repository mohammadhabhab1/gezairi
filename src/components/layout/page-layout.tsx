'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { MobileNav } from './mobile-nav'
import { LanguagePicker } from './language-picker'
import type { Footer } from '@/payload-types'

interface NavItem {
  label: string
  href: string
}

interface PageLayoutProps {
  children: React.ReactNode
  navItems?: NavItem[]
  footerData?: Footer | null
}

export function PageLayout({ children, navItems: navItemsProp, footerData }: PageLayoutProps) {
  const pathname = usePathname()
  const t = useTranslations()
  const locale = useLocale()

  const defaultNavItems: NavItem[] = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.whoWeAre'), href: '/who-we-are' },
    { label: t('nav.regionalOffices'), href: '/regional-offices' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.contactUs'), href: '#footer' },
    ...(locale === 'tr' ? [{ label: t('nav.kvkk'), href: '/kvkk' }] : []),
  ]

  const defaultFooter = {
    tagline: t('footer.tagline'),
    officeTitle: t('footer.officeTitle'),
    city: 'Beirut, Lebanon',
    addressLines: [
      { line: 'Port Office', bold: true },
      { line: 'Boulos Fayyad Building', bold: false },
      { line: '4th Floor', bold: false },
      { line: 'Chafic Wazan Avenue', bold: false },
      { line: 'P.O.Box: 11/1402', bold: false },
      { line: 'Riad el soloh 1107 2080', bold: false },
    ],
    phoneNumbers: [
      { number: '+961 1 783783' },
      { number: '+961 1 784784' },
    ],
    email: 'gezairi@gezairi.com',
    navLinks: [
      { label: t('footer.navLinks.home'), url: '/' },
      { label: t('footer.navLinks.whoWeAre'), url: '/who-we-are' },
      { label: t('footer.navLinks.regionalOffices'), url: '/regional-offices' },
      { label: t('footer.navLinks.services'), url: '/services' },
      ...(locale === 'tr' ? [{ label: t('footer.navLinks.kvkk'), url: '/kvkk' }] : []),
    ],
    socialLinks: [
      { label: 'Instagram', url: 'http://www.instagram.com/gezairigroup' },
      { label: 'Facebook', url: 'http://www.facebook.com/gezairigroup' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/gezairigroup' },
    ],
    legalLinks: [
      { label: t('footer.legalLinks.legal'), url: '/legal' },
      { label: t('footer.legalLinks.terms'), url: '/terms' },
      { label: t('footer.legalLinks.privacy'), url: '/privacy-policy' },
    ],
    copyrightText: t('footer.copyright'),
  }

  const navItems = navItemsProp && navItemsProp.length > 0 ? navItemsProp : defaultNavItems

  const footer = {
    tagline: footerData?.tagline || defaultFooter.tagline,
    officeTitle: footerData?.officeTitle || defaultFooter.officeTitle,
    city: footerData?.city || defaultFooter.city,
    addressLines: footerData?.addressLines && footerData.addressLines.length > 0
      ? footerData.addressLines
      : defaultFooter.addressLines,
    phoneNumbers: footerData?.phoneNumbers && footerData.phoneNumbers.length > 0
      ? footerData.phoneNumbers
      : defaultFooter.phoneNumbers,
    email: footerData?.email || defaultFooter.email,
    navLinks: footerData?.navLinks && footerData.navLinks.length > 0
      ? footerData.navLinks
      : defaultFooter.navLinks,
    socialLinks: footerData?.socialLinks && footerData.socialLinks.length > 0
      ? footerData.socialLinks
      : defaultFooter.socialLinks,
    legalLinks: footerData?.legalLinks && footerData.legalLinks.length > 0
      ? footerData.legalLinks
      : defaultFooter.legalLinks,
    copyrightText: footerData?.copyrightText || defaultFooter.copyrightText,
  }

  return (
    <>
    <main className="min-h-screen overflow-x-clip bg-gezairi-page-bg px-0 md:px-5 pt-[20px] md:pt-5 pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:text-gezairi-blue focus:rounded-md focus:shadow-lg"
      >
        {t('common.skipToContent')}
      </a>
      <div className="bg-gezairi-light rounded-t-[20px] max-w-[1380px] mx-auto pb-0 md:pb-5 px-[5px] md:px-0">
        {/* Navigation */}
        <nav className="flex items-center justify-between gap-4 lg:gap-6 xl:gap-[68px] px-[10px] md:px-5 py-[5px] md:py-2.5">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/gezairi/logos/logo.png"
              alt="Gezairi Logo"
              width={169}
              height={80}
              className="h-[47px] md:h-[65px] lg:h-[80px] object-contain"
              style={{ width: 'auto' }}
            />
          </Link>

          <div className="hidden lg:flex items-center flex-1 min-w-0 max-w-[872px]">
            <ul className="flex flex-wrap items-center justify-center w-full">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      className="block px-[10px] xl:px-[15px] py-[15px] text-[16px] xl:text-[18px] leading-[20px] whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-gezairi-blue focus-visible:ring-offset-2 rounded-sm text-gezairi-gray hover:text-gezairi-blue"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href as '/'}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className={`block px-[10px] xl:px-[15px] py-[15px] text-[16px] xl:text-[18px] leading-[20px] whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-gezairi-blue focus-visible:ring-offset-2 rounded-sm ${
                        pathname === item.href
                          ? 'text-gezairi-blue'
                          : 'text-gezairi-gray hover:text-gezairi-blue'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <LanguagePicker />
            <MobileNav navItems={navItems} pathname={pathname} />
          </div>
        </nav>

        {/* Page Content */}
        <div id="main-content" className="flex flex-col gap-[35px] md:gap-8 lg:gap-[60px] items-center w-full mt-[10px] md:mt-3 lg:mt-4">
          {children}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center w-full mt-[35px] md:mt-8 lg:mt-[80px] px-0">
          <footer id="footer" className="w-full max-w-none md:max-w-[1348px] md:min-h-[400px] lg:h-[561px] relative mx-auto rounded-none md:rounded-[15px] overflow-hidden">
            <Image
              src="/images/gezairi/heroes/footer-bg.jpg"

              alt="Footer background"
              fill
              className="object-cover object-[70%_50%] md:object-[85%_25%]"
            />

            {/* Darkening layer so text stays readable over the container photo on phones */}
            <div className="absolute inset-0 bg-gezairi-blue/60 md:hidden" aria-hidden="true" />

            {/* Phones: one left edge, one icon column, clear groups */}
            <div className="relative z-10 flex flex-col px-6 pb-6 pt-7 text-white md:hidden">
              <div className="relative h-[56px] w-[150px]">
                <Image
                  src="/images/gezairi/logos/logo-white.png"
                  alt="Gezairi Logo"
                  fill
                  sizes="150px"
                  className="object-contain object-left"
                />
              </div>
              <p className="mt-3 text-[15px] leading-[22px] text-white/90">{footer.tagline}</p>

              <div className="mt-6 border-t border-white/15 pt-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gezairi-gold">
                  {footer.officeTitle}
                </h2>
                <a
                  href="https://www.google.com/maps/place/Gezairi/data=!4m2!3m1!1s0x0:0x9f30f914b61c9192?sa=X&ved=1t:2428&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${footer.officeTitle} — ${footer.city}, opens Google Maps`}
                  className="mt-3 block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gezairi-gold"
                >
                  <span className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="text-[15px] font-semibold leading-[22px]">{footer.city}</span>
                  </span>
                  <span className="mt-1 block ps-7 text-[13px] leading-[20px] text-white/80">
                    {footer.addressLines.map((line, i) => (
                      <span key={i} className={`block ${line.bold ? 'font-semibold text-white' : ''}`}>
                        {line.line}
                      </span>
                    ))}
                  </span>
                </a>
                <ul className="mt-4 space-y-1">
                  {[
                    { icon: 'phone-icon-blue', text: footer.phoneNumbers[0]?.number, scheme: 'tel' },
                    { icon: 'fax-icon-blue', text: footer.phoneNumbers[1]?.number, scheme: 'tel' },
                    { icon: 'mail-icon-white', text: footer.email, scheme: 'mailto' },
                  ]
                    .filter((row) => row.text)
                    .map((row) => (
                      <li key={row.icon}>
                        <a
                          href={`${row.scheme}:${row.scheme === 'tel' ? row.text!.replace(/\s/g, '') : row.text}`}
                          className="flex items-center gap-3 py-1 text-[15px] leading-[22px]"
                        >
                          <span className="relative h-4 w-4 shrink-0">
                            <Image
                              src={`/images/gezairi/icons/${row.icon}.svg`}
                              alt=""
                              aria-hidden="true"
                              fill
                              className={`object-contain ${row.icon.endsWith('blue') ? 'brightness-0 invert' : ''}`}
                              unoptimized
                            />
                          </span>
                          <span dir="ltr">{row.text}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-6 border-t border-white/15 pt-5">
                <ul>
                  {footer.navLinks.map((link, i) => (
                    <li key={i}>
                      <Link href={link.url as '/'} className="block py-1.5 text-[15px] leading-[22px] hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul>
                  {footer.socialLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-1.5 text-[15px] leading-[22px] hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-semibold leading-[22px]">
                  {footer.legalLinks.map((link, i) => (
                    <Link key={i} href={link.url as '/'} className="py-1 hover:underline">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label={t('footer.scrollToTop')}
                  title={t('footer.scrollToTop')}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                >
                  <Image
                    src="/images/gezairi/icons/arrow-up-footer.svg"
                    alt=""
                    width={40}
                    height={25}
                    className="h-[14px] w-[22px]"
                    unoptimized
                  />
                </button>
              </div>
            </div>

            <div className="relative z-10 h-full hidden md:flex flex-col justify-between px-[29px] py-5 md:px-[34px] md:py-[20px]">
              {/* Top section */}
              <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
                {/* Left: Logo, tagline, address + contact side by side */}
                <div>
                  <div className="relative w-[180px] h-[75px] md:w-[220px] md:h-[110px] lg:w-[255px] lg:h-[130px]">
                    <Image
                      src="/images/gezairi/logos/logo-white.png"
                      alt="Gezairi Logo"
                      fill
                      sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 255px"
                      className="object-contain object-left"
                    />
                  </div>
                  <p className="text-gezairi-light text-[14px] md:text-[16px] -mt-2 ml-[13px] md:ml-[28px] lg:ml-[36px] leading-[18px] tracking-[-0.03px]">
                    {footer.tagline}
                  </p>

                  <div className="mt-4 md:mt-6 ml-[13px] md:ml-[28px] lg:ml-[36px]">
                    <h2 className="text-gezairi-light text-[13px] md:text-[14.2px] mb-3 md:mb-4 leading-[18px] tracking-[-0.28px] md:tracking-[-0.33px]">
                      {footer.officeTitle}
                    </h2>

                    {/* Address + Contact side by side */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-[30px] md:gap-[40px] lg:gap-[60px]">
                      {/* Address — hover/click to open Google Maps */}
                      <a
                        href="https://www.google.com/maps/place/Gezairi/data=!4m2!3m1!1s0x0:0x9f30f914b61c9192?sa=X&ved=1t:2428&ictx=111"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${footer.officeTitle} — ${footer.city}, opens Google Maps`}
                        className="group block rounded-md transition-colors duration-200 hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-gezairi-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent -mx-1 px-1 py-1"
                      >
                        <div className="flex items-start gap-2 text-white">
                          <MapPin className="w-[9px] h-[12px] mt-[2px] shrink-0 transition-transform duration-200 group-hover:-translate-y-[1px] group-hover:text-gezairi-gold" />
                          <p className="text-[14px] md:text-[13px] leading-[17px] md:leading-[15px] font-semibold transition-colors duration-200 group-hover:text-gezairi-gold group-hover:underline underline-offset-2">
                            {footer.city}
                          </p>
                        </div>
                        <div className="ml-[17px] mt-3 md:mt-4 text-white text-[12px] md:text-[11px] space-y-1 leading-[16px] md:leading-[13px] transition-opacity duration-200 group-hover:opacity-95">
                          {footer.addressLines.map((line, i) => (
                            <p key={i} className={line.bold ? 'font-semibold' : ''}>
                              {line.line}
                            </p>
                          ))}
                        </div>
                      </a>

                      {/* Contact rows: each icon sits beside its own line */}
                      <div className="flex flex-col gap-[10px] md:gap-[8px] sm:mt-[27px] md:mt-[31px] text-white text-[13px] md:text-[10px]">
                        {[
                          { icon: 'phone-icon-blue', text: footer.phoneNumbers[0]?.number, kind: 'tel' },
                          { icon: 'fax-icon-blue', text: footer.phoneNumbers[1]?.number, kind: 'tel' },
                          { icon: 'mail-icon-white', text: footer.email, kind: 'mail' },
                        ]
                          .filter((row) => row.text)
                          .map((row) => (
                            <div key={row.icon} className="flex items-center gap-[10px]">
                              <div className="w-[13px] h-[13px] relative shrink-0">
                                <Image
                                  src={`/images/gezairi/icons/${row.icon}.svg`}
                                  alt=""
                                  aria-hidden="true"
                                  fill
                                  className={`object-contain ${row.icon.endsWith('blue') ? 'brightness-0 invert' : ''}`}
                                  unoptimized
                                />
                              </div>
                              {row.kind === 'tel' ? (
                                <>
                                  <a href={`tel:${row.text!.replace(/\s/g, '')}`} className="no-underline leading-[15px] md:hidden">{row.text}</a>
                                  <span className="hidden md:inline leading-[15px]">{row.text}</span>
                                </>
                              ) : (
                                <a href={`mailto:${row.text}`} className="no-underline leading-[15px]">{row.text}</a>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column: Navigation + Social */}
                <div className="flex flex-row gap-12 lg:gap-[80px] xl:gap-[120px] ml-[13px] md:ml-0 lg:pt-[30px]">
                  <div className="space-y-0">
                    {footer.navLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.url as '/'}
                        className="block text-white text-[15px] md:text-[17.3px] hover:underline leading-[32px] md:leading-[31px]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-0">
                    {footer.socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white text-[15px] md:text-[17.3px] hover:underline leading-[32px] md:leading-[31px]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom section: Legal links + scroll to top */}
              <div className="flex items-end justify-between mt-6 lg:mt-0">
                <div className="flex flex-col gap-1 md:flex-row md:gap-0 text-white text-[14px] md:text-[17.3px] font-semibold leading-[28px] md:leading-[23px] ml-[13px] md:ml-0">
                  {footer.legalLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url as '/'}
                      className={`hover:underline ${i > 0 ? 'md:ml-[80px] lg:ml-[163px]' : ''}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label={t('footer.scrollToTop')}
                  title={t('footer.scrollToTop')}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  className="shrink-0 p-2 -m-2"
                >
                  <Image
                    src="/images/gezairi/icons/arrow-up-footer.svg"
                    alt=""
                    width={40}
                    height={25}
                    className="w-[40px] h-[25px]"
                    unoptimized
                  />
                </button>
              </div>
            </div>
          </footer>
        </div>

      </div>

    </main>

    {/* Copyright */}
    <div className="w-full bg-[#bbbdbf] py-5">
      <p
        className="text-center text-[#3f444b] text-[17.3px] leading-[23px] tracking-[0.07px]"
        suppressHydrationWarning
      >
        {footer.copyrightText.replace(/\d{4}/, String(new Date().getFullYear()))}
      </p>
    </div>
    </>
  )
}
