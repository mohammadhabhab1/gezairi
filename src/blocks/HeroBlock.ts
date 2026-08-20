import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'overlayColor',
      type: 'select',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Dark', value: 'dark' },
      ],
      defaultValue: 'blue',
    },
  ],
}
