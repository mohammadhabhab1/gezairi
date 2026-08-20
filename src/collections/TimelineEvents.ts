import type { CollectionConfig } from 'payload'

export const TimelineEvents: CollectionConfig = {
  slug: 'timeline-events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'status', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Display date (e.g., "June 15, 2025")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    {
      name: 'position',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Position on the timeline (left or right)',
      },
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
