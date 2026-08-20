import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline Section',
    plural: 'Timeline Sections',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'useCollectionData',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            readOnly: true,
            description: '✓ Automatically displays all events from Timeline Events collection',
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'OUR EVENTS',
      admin: {
        description: 'Optional section title (defaults to "OUR EVENTS")',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional hero image for the timeline section',
      },
    },
  ],
}
