FROM node:24-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# ---

FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Set empty DATABASE_URI during build so Payload skips DB connections
# (generateStaticParams has try/catch that returns [] when DB is unavailable)
RUN corepack enable pnpm && pnpm payload generate:types && DATABASE_URI="" pnpm run build

# ---

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Payload migration support — need full node_modules for payload.config.ts imports
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/src/payload.config.ts ./src/payload.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src/collections ./src/collections
COPY --from=builder /app/src/globals ./src/globals
COPY --from=builder /app/src/migrations ./src/migrations
COPY --from=builder /app/src/lib ./src/lib
COPY --from=builder /app/src/blocks ./src/blocks
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN mkdir -p /app/.payload && chown -R nextjs:nodejs /app/.payload
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media

RUN npm install -g tsx

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["sh", "scripts/docker-entrypoint.sh"]
