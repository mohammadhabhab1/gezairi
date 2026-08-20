import type { Block } from 'payload'

export const OfficesBlock: Block = {
  slug: 'offices',
  labels: {
    singular: 'Offices Section',
    plural: 'Offices Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'GLOBAL REACH LOCAL EXPERTISE',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Map image to display above the office cards',
      },
    },
    {
      name: 'useCollectionData',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Fetch offices from the Regional Offices collection',
      },
    },
    {
      name: 'offices',
      type: 'array',
      admin: {
        condition: (data) => !data.useCollectionData,
        description: 'Manual office entries (only used if "Use Collection Data" is disabled)',
      },
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'array',
          fields: [
            {
              name: 'line',
              type: 'text',
            },
          ],
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'fax',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'website',
          type: 'text',
        },
      ],
    },
  ],
}
