import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for Payload admin, API routes, Next.js internals, and static files
  matcher: [
    '/((?!admin|api|_next|_vercel|images|fonts|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
}
