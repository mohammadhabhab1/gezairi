# Gezairi - AI Agent Guidelines

This document provides comprehensive guidelines for AI agents (Claude Code, Cursor, GitHub Copilot, etc.) working with this codebase.

## Project Overview

Gezairi is a modern web application built with:
- **Next.js 15** - React framework with App Router
- **Payload CMS 3.0** - Headless CMS for content management
- **PostgreSQL** - Database
- **shadcn/ui** - Component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Resend** - Email service
- **Playwright** - End-to-end testing
- **TypeScript** - Type safety

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Public-facing pages
│   ├── (payload)/         # Payload CMS admin routes
│   └── globals.css        # Global styles with Tailwind
├── collections/           # Payload CMS collection configs
├── components/
│   └── ui/               # shadcn/ui components
├── email/
│   └── templates/        # Email templates for Resend
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── payload/              # Payload-specific utilities
└── payload.config.ts     # Payload CMS configuration
e2e/                      # Playwright end-to-end tests
```

## Code Style Guidelines

### TypeScript

1. **Always use TypeScript** - No plain JavaScript files
2. **Prefer interfaces over types** for object shapes that may be extended
3. **Use strict mode** - `strict: true` in tsconfig.json
4. **Avoid `any`** - Use `unknown` and type guards instead
5. **Use descriptive names** - Variables, functions, and types should be self-documenting

```typescript
// Good
interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
}

// Avoid
type User = any
```

### React Components

1. **Use functional components** with hooks
2. **Prefer server components** by default (Next.js 15)
3. **Add 'use client'** only when necessary (client-side interactivity)
4. **Use forwardRef** for components that need to pass refs
5. **Export named components** for better debugging

```typescript
// Server Component (default)
export function UserCard({ user }: { user: UserProfile }) {
  return <div>{user.firstName}</div>
}

// Client Component (when needed)
'use client'

import { useState } from 'react'

export function InteractiveForm() {
  const [value, setValue] = useState('')
  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
```

### Styling with Tailwind CSS

1. **Use the `cn()` utility** for conditional classes
2. **Follow shadcn/ui patterns** for component styling
3. **Use CSS variables** for theming (defined in globals.css)
4. **Prefer Tailwind utilities** over custom CSS

```typescript
import { cn } from '@/lib/utils'

function Button({ className, variant }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md px-4 py-2',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        className
      )}
    />
  )
}
```

### Payload CMS Collections

1. **Define collections in `src/collections/`**
2. **Use TypeScript interfaces** for field types
3. **Add proper access controls** for security
4. **Use hooks** for business logic

```typescript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // ... more fields
  ],
}
```

### Email Templates (Resend)

1. **Use React components** for email templates
2. **Place templates in `src/email/templates/`**
3. **Use inline styles** (email client compatibility)
4. **Test with Resend's preview** feature

```typescript
import * as React from 'react'

interface EmailProps {
  name: string
}

export const WelcomeEmail: React.FC<EmailProps> = ({ name }) => (
  <div style={{ fontFamily: 'Arial, sans-serif' }}>
    <h1>Welcome, {name}!</h1>
  </div>
)
```

## Testing Guidelines

### End-to-End Tests (Playwright)

1. **Place tests in `e2e/` directory**
2. **Name files with `.spec.ts` suffix**
3. **Use descriptive test names**
4. **Follow AAA pattern** (Arrange, Act, Assert)
5. **Use page objects** for complex pages

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should perform expected action', async ({ page }) => {
    // Arrange
    await page.goto('/path')

    // Act
    await page.getByRole('button', { name: 'Submit' }).click()

    // Assert
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

### Running Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e/home.spec.ts
```

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database (PostgreSQL)
DATABASE_URI=postgresql://username:password@localhost:5432/gezairi

# Payload
PAYLOAD_SECRET=your-secret-key

# Email (Resend)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com

# S3 Storage (optional)
S3_BUCKET=your-bucket
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=us-east-1
```

## Common Patterns

### Fetching Data in Server Components

```typescript
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export default async function Page() {
  const payload = await getPayloadHMR({ config })
  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
  })

  return <PostList posts={posts.docs} />
}
```

### API Routes

```typescript
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Process request
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

### Using shadcn/ui Components

```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Sign In</Button>
      </CardContent>
    </Card>
  )
}
```

## Security Guidelines

1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Use Zod for schema validation
3. **Implement proper access controls** in Payload collections
4. **Sanitize user content** before rendering
5. **Use HTTPS** in production
6. **Rate limit API endpoints** for public routes

## Performance Best Practices

1. **Use server components** by default
2. **Implement proper caching** strategies
3. **Optimize images** with Next.js Image component
4. **Lazy load** non-critical components
5. **Use database indexes** for frequently queried fields

## Git Workflow

1. **Use conventional commits**:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation
   - `style:` formatting
   - `refactor:` code restructuring
   - `test:` adding tests
   - `chore:` maintenance

2. **Create feature branches** from main
3. **Write meaningful commit messages**
4. **Keep PRs focused** and reviewable

## Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run typecheck    # Run TypeScript checks

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run Playwright tests

# Payload
npm run generate:types  # Generate Payload types
npm run payload         # Run Payload CLI
```

## Troubleshooting

### Common Issues

1. **PostgreSQL connection errors**: Ensure PostgreSQL is running and `DATABASE_URI` is correct
2. **Payload admin not loading**: Check `payload.config.ts` and ensure all collections are valid
3. **Type errors**: Run `npm run generate:types` to regenerate Payload types
4. **E2E tests failing**: Ensure the dev server is running or use `webServer` config in Playwright

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Resend Documentation](https://resend.com/docs)
