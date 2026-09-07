#!/bin/sh
set -e

echo "Waiting for PostgreSQL at ${POSTGRES_HOST:-db}:${POSTGRES_PORT:-5432}..."
python - <<'PYEOF'
import os
import sys
import time

import psycopg

host = os.environ.get("POSTGRES_HOST", "db")
port = os.environ.get("POSTGRES_PORT", "5432")
user = os.environ.get("POSTGRES_USER", "postgres")
password = os.environ.get("POSTGRES_PASSWORD", "")
dbname = os.environ.get("POSTGRES_DB", "trfs")

for attempt in range(30):
    try:
        psycopg.connect(host=host, port=port, user=user, password=password, dbname=dbname).close()
        print("PostgreSQL is up.")
        sys.exit(0)
    except psycopg.OperationalError:
        time.sleep(1)

print("PostgreSQL did not become available in time.", file=sys.stderr)
sys.exit(1)
PYEOF

python manage.py migrate --noinput

# Creates YOUR OWN admin account from env vars on first boot (idempotent —
# skipped automatically if a user with that username already exists). Each
# deployer sets DJANGO_SUPERUSER_* in their own .env, so no password is ever
# hardcoded or shared in the repo.
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
    python manage.py createsuperuser --noinput || true
fi

python manage.py collectstatic --noinput

exec gunicorn config.wsgi:application --bind 0.0.0.0:8000
