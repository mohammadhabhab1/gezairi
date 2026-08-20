#!/bin/sh
set -e

echo "=== Gezairi Docker Entrypoint ==="

# Parse host and port from DATABASE_URI
DB_HOST=$(echo "$DATABASE_URI" | sed -n 's|.*@\([^:/]*\).*|\1|p')
DB_PORT=$(echo "$DATABASE_URI" | sed -n 's|.*:\([0-9]*\)/.*|\1|p')
DB_PORT=${DB_PORT:-5432}

echo "Checking database connectivity to $DB_HOST:$DB_PORT..."
MAX_RETRIES=10
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if node -e "
    const net = require('net');
    const s = new net.Socket();
    s.setTimeout(3000);
    s.on('connect', () => { s.destroy(); process.exit(0); });
    s.on('error', () => process.exit(1));
    s.on('timeout', () => { s.destroy(); process.exit(1); });
    s.connect(${DB_PORT}, '${DB_HOST}');
  " 2>/dev/null; then
    echo "Database is reachable."
    break
  else
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
      echo "Database not reachable yet (attempt $RETRY_COUNT/$MAX_RETRIES). Retrying in 2s..."
      sleep 2
    else
      echo "WARNING: Database not reachable after $MAX_RETRIES attempts."
      echo "Starting server anyway..."
    fi
  fi
done

# Start the Next.js server (Payload will auto-push schema if PAYLOAD_DB_PUSH=true)
echo "Starting Next.js server..."
exec node server.js
