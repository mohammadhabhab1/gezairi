# Gezairi

A modern web application for Gezairi Transport & Logistics, built with Next.js 15, Payload CMS 3.0, and shadcn/ui.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **CMS**: [Payload CMS 3.0](https://payloadcms.com/)
- **Database**: PostgreSQL (Neon)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Email**: [Resend](https://resend.com/)
- **E2E Testing**: [Playwright](https://playwright.dev/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or Neon/Supabase)
- pnpm (recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gezairi
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your values:
```env
DATABASE_URI=postgresql://user:password@host:5432/database
PAYLOAD_SECRET=your-secret-key-min-32-characters
RESEND_API_KEY=your-resend-api-key
```

5. Run database migrations:
```bash
pnpm payload migrate
```

6. Seed the CMS with initial data:
```bash
pnpm seed
```

7. Start the development server:
```bash
pnpm dev
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Panel

Access the Payload CMS admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

On first visit, you'll be prompted to create an admin user.

## CMS Architecture

### Collections

| Collection | Description |
|------------|-------------|
| `services` | 12 logistics services (Air Freight, Ocean Freight, etc.) |
| `values` | 6 company core values |
| `regional-offices` | 9 regional office locations with coordinates |
| `partners` | Partner logos by category (Arkas, Shipping Agencies, FedEx) |
| `timeline-events` | Company timeline and events |
| `privacy-sections` | Privacy policy sections |
| `media` | Uploaded images and files |
| `users` | Admin users |
| `pages` | CMS-managed pages |

### Globals

| Global | Description |
|--------|-------------|
| `site-settings` | Site name, contact info, social links |
| `company-stats` | Stats like established year, countries, employees |
| `navigation` | Main menu items and CTA button |
| `footer` | Footer columns and links |
| `differentiators` | "What makes us different" content |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Public pages
│   └── (payload)/         # Payload admin routes
├── collections/           # Payload CMS collections
├── globals/               # Payload CMS globals
├── components/
│   ├── layout/            # Layout components (header, footer)
│   ├── map/               # Map components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── payload.ts         # CMS data fetching utilities
│   └── utils.ts           # General utilities
├── seed/
│   ├── data/              # Seed data files
│   └── index.ts           # Main seed script
└── payload.config.ts      # Payload configuration
e2e/                       # Playwright tests
public/images/gezairi/     # Static images (heroes, icons, logos)
```

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Build
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format with Prettier
pnpm typecheck        # TypeScript check

# Testing
pnpm test             # Run unit tests
pnpm test:e2e         # Run Playwright tests
pnpm test:e2e:ui      # Playwright UI mode

# Payload CMS
pnpm generate:types   # Generate Payload types
pnpm payload          # Payload CLI
pnpm payload migrate  # Run database migrations
pnpm seed             # Seed CMS with initial data
```

## Data Fetching

The `src/lib/payload.ts` module provides safe data fetching utilities:

```typescript
import { getServices, getValues, getCompanyStats } from '@/lib/payload'

// In a server component
export default async function Page() {
  const [services, values, stats] = await Promise.all([
    getServices(),
    getValues(),
    getCompanyStats(),
  ])

  return <YourComponent services={services.docs} />
}
```

All functions include error handling and return fallback data if the database isn't set up.

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

## E2E Testing

```bash
# Install Playwright browsers
npx playwright install

# Run tests
pnpm test:e2e

# Run tests with UI
pnpm test:e2e:ui

# Run specific test
npx playwright test e2e/home.spec.ts
```

## AI Agent Guidelines

This project includes configuration files for AI assistants:

- `CLAUDE.md` - Comprehensive guidelines for Claude Code and other AI agents
- `.cursorrules` - Rules for Cursor IDE
- `.github/copilot-instructions.md` - Instructions for GitHub Copilot

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URI` | PostgreSQL connection string | Yes |
| `PAYLOAD_SECRET` | Secret for Payload CMS (32+ chars) | Yes |
| `RESEND_API_KEY` | Resend API key for emails | No |
| `EMAIL_FROM` | Default from email address | No |
| `S3_BUCKET` | S3 bucket for media storage | No |
| `S3_ACCESS_KEY_ID` | S3 access key | No |
| `S3_SECRET_ACCESS_KEY` | S3 secret key | No |
| `S3_REGION` | S3 region | No |

## License

MIT
