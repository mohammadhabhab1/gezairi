import type { Block } from 'payload'

export const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      defaultValue: 'OUR SERVICES',
    },
    {
      name: 'subtitle',
      type: 'text',
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
      label: 'Use Services from Collection',
      defaultValue: true,
      admin: {
        description: 'When enabled, displays all services from the Services collection ordered by their "order" field',
      },
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      admin: {
        condition: (data) => !data.useCollectionData,
        description: 'Manually add services (only used when "Use Services from Collection" is disabled)',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            description: 'URL-friendly identifier (e.g., "air-freight")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
