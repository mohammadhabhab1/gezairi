import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      admin: {
        description: 'Main navigation menu items',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'URL path (e.g., "/who-we-are")',
          },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      admin: {
        description: 'Call-to-action button in navigation',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'GET A QUOTE',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
  ],
}
