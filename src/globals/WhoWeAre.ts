import type { GlobalConfig } from 'payload'

export const WhoWeAre: GlobalConfig = {
  slug: 'who-we-are',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'highlightedIntro',
      type: 'text',
      localized: true,
      admin: {
        description: 'The highlighted gold text (e.g., "The 1000 miles journey")',
      },
    },
    {
      name: 'introText',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'The paragraph after the highlighted text',
      },
    },
    {
      name: 'additionalParagraphs',
      type: 'array',
      admin: {
        description: 'Additional intro paragraphs',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      admin: {
        description: 'Stats bar items',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Icon', value: 'icon' },
            { label: 'Number', value: 'number' },
          ],
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Icon image (only for icon type)',
            condition: (_, siblingData) => siblingData?.type === 'icon',
          },
        },
        {
          name: 'value',
          type: 'text',
          admin: {
            description: 'Number value (e.g., "22", "500") — only for number type',
            condition: (_, siblingData) => siblingData?.type === 'number',
          },
        },
        {
          name: 'label',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description: 'Label text next to the stat',
          },
        },
        {
          name: 'labelWidth',
          type: 'number',
          admin: {
            description: 'Label width in pixels',
          },
        },
      ],
    },
    {
      name: 'visionTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'Vision section title',
      },
    },
    {
      name: 'visionParagraphs',
      type: 'array',
      admin: {
        description: 'Vision section paragraphs',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'differentiatorsTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'Differentiators section title',
      },
    },
  ],
}
