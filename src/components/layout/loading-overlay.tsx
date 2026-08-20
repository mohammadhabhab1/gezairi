'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    function checkReady() {
      const images = document.querySelectorAll('img')
      const promises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true })
          img.addEventListener('error', () => resolve(), { once: true })
        })
      })

      Promise.all(promises).then(() => {
        setFadeOut(true)
        setTimeout(() => {
          setVisible(false)
          document.body.style.overflow = ''
        }, 300)
      })
    }

    if (document.readyState === 'complete') {
      checkReady()
    } else {
      window.addEventListener('load', checkReady, { once: true })
    }

    const timeout = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setVisible(false)
        document.body.style.overflow = ''
      }, 300)
    }, 3000)

    return () => {
      clearTimeout(timeout)
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#e5e7eb',
        overflow: 'hidden',
      }}
    >
      <Image
        src="/images/gezairi/logos/logo.png"
        alt="Loading..."
        width={150}
        height={150}
        priority
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(150px, 40vw)',
          height: 'auto',
          objectFit: 'contain',
        }}
        className={`transition-opacity duration-300 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}
