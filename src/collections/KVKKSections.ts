import type { CollectionConfig } from 'payload'

export const KVKKSections: CollectionConfig = {
  slug: 'kvkk-sections',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'number',
      type: 'number',
      required: true,
      admin: {
        description: 'Section number (e.g., 1, 2, 3...)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
}
