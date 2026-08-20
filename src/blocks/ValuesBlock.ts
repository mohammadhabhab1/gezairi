import type { Block } from 'payload'

export const ValuesBlock: Block = {
  slug: 'values',
  labels: {
    singular: 'Values Section',
    plural: 'Values Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'OUR VALUES',
    },
    {
      name: 'showTitle',
      type: 'checkbox',
      label: 'Show Title',
      defaultValue: true,
      admin: {
        description: 'Display the section title',
      },
    },
    {
      name: 'showTitleUnderline',
      type: 'checkbox',
      label: 'Show Gold Line Under Title',
      defaultValue: false,
      admin: {
        description: 'Display a gold line under the section title',
      },
    },
    {
      name: 'useCollectionData',
      type: 'checkbox',
      label: 'Use Values from Collection',
      defaultValue: true,
      admin: {
        description: 'When enabled, displays all values from the Values collection ordered by their "order" field',
      },
    },
    {
      name: 'values',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      admin: {
        condition: (data) => !data.useCollectionData,
        description: 'Manually add values (only used when "Use Values from Collection" is disabled)',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
