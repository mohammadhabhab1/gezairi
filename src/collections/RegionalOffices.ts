import type { CollectionConfig } from 'payload'

export const RegionalOffices: CollectionConfig = {
  slug: 'regional-offices',
  admin: {
    useAsTitle: 'country',
    defaultColumns: ['country', 'cities', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'country',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'cities',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Comma-separated list of cities (e.g., "Dubai, Abu Dhabi")',
      },
    },
    {
      name: 'phone1',
      type: 'text',
      admin: {
        description: 'Primary phone number',
      },
    },
    {
      name: 'phone2',
      type: 'text',
      admin: {
        description: 'Secondary phone number',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        description: 'Map latitude coordinate',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        description: 'Map longitude coordinate',
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
