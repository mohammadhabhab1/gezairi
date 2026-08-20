import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'GEZAIRI',
    },
    {
      name: 'fontScale',
      type: 'select',
      defaultValue: '100',
      admin: {
        description: 'Scale the font size across the entire frontend website',
      },
      options: [
        { label: 'Small (85%)', value: '85' },
        { label: 'Default (100%)', value: '100' },
        { label: 'Large (115%)', value: '115' },
        { label: 'Extra Large (130%)', value: '130' },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        description: 'Site tagline or slogan',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          admin: { description: 'LinkedIn URL' },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: { description: 'Twitter/X URL' },
        },
        {
          name: 'facebook',
          type: 'text',
          admin: { description: 'Facebook URL' },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: { description: 'Instagram URL' },
        },
      ],
    },
  ],
}
