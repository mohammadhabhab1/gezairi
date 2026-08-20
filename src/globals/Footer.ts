import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Serving global logistics solutions since 1945.',
      localized: true,
      admin: {
        description: 'Footer tagline below logo',
      },
    },
    {
      name: 'officeTitle',
      type: 'text',
      defaultValue: 'Headquarter Office',
      localized: true,
    },
    {
      name: 'city',
      type: 'text',
      defaultValue: 'Beirut, Lebanon',
      localized: true,
    },
    {
      name: 'addressLines',
      type: 'array',
      admin: {
        description: 'Address lines displayed below city',
      },
      fields: [
        {
          name: 'line',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'bold',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'phoneNumbers',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'gezairi@gezairi.com',
    },
    {
      name: 'navLinks',
      type: 'array',
      admin: {
        description: 'Footer navigation links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        description: 'Social media links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      admin: {
        description: 'Legal/Terms/Privacy links at bottom',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: 'Copyright 2025 © GEZAIRI',
      localized: true,
    },
  ],
}
