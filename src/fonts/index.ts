import localFont from 'next/font/local'

export const avenir = localFont({
  src: [
    {
      path: './AvenirLTStd-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './AvenirLTStd-Roman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './AvenirLTStd-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './AvenirLTStd-Medium.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './AvenirLTStd-Heavy.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-avenir',
  display: 'swap',
})
