# GitHub Copilot Instructions for Gezairi

## Project Context

This is a Next.js 15 application using:
- Payload CMS 3.0 for content management
- MongoDB as the database
- shadcn/ui for UI components
- Tailwind CSS for styling
- Resend for email
- Playwright for e2e testing

## Code Generation Guidelines

### TypeScript

Always generate TypeScript code with:
- Strict typing (no `any`)
- Interfaces for object shapes
- Proper return types
- Absolute imports using `@/`

### React Components

- Generate Server Components by default
- Add `'use client'` only when needed
- Use functional components with hooks
- Follow shadcn/ui component patterns

### Imports

Prefer these import patterns:
```typescript
// UI Components
import { Button } from '@/components/ui/button'

// Utilities
import { cn } from '@/lib/utils'

// Payload
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
```

### Styling

Use Tailwind CSS classes with the `cn()` utility:
```typescript
className={cn('base-class', condition && 'conditional-class')}
```

### Testing

Generate Playwright tests following this pattern:
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Text')).toBeVisible()
  })
})
```

### API Routes

```typescript
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ data })
}
```

### Payload Collections

```typescript
import type { CollectionConfig } from 'payload'

export const Collection: CollectionConfig = {
  slug: 'collection-name',
  fields: [
    { name: 'field', type: 'text', required: true }
  ]
}
```

## Avoid Generating

- Plain JavaScript files
- Class components
- Inline styles (except emails)
- `var` declarations
- `any` types
- Relative imports
