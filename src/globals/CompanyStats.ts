import type { GlobalConfig } from 'payload'

export const CompanyStats: GlobalConfig = {
  slug: 'company-stats',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'establishedYear',
      type: 'number',
      defaultValue: 1945,
      admin: {
        description: 'Year the company was established',
      },
    },
    {
      name: 'countriesCount',
      type: 'number',
      defaultValue: 10,
      admin: {
        description: 'Number of countries with presence',
      },
    },
    {
      name: 'employeesCount',
      type: 'text',
      defaultValue: '600+',
      localized: true,
      admin: {
        description: 'Number of employees (can include + sign)',
      },
    },
    {
      name: 'successfulShipments',
      type: 'text',
      defaultValue: '4.7K',
      localized: true,
      admin: {
        description: 'Number of successful shipments',
      },
    },
    {
      name: 'totalCustomers',
      type: 'number',
      defaultValue: 228,
      admin: {
        description: 'Total number of customers',
      },
    },
  ],
}
